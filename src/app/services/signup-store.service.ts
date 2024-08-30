import { computed, inject, Injectable, signal } from "@angular/core";
import { map, of, take, tap } from "rxjs";
import { findPrice } from "../helpers/price.helper";
import type { Addon, Addons, APIAddons } from "../models/addon.model";
import { BillingFrequencyUnit } from "../models/billing-frequency-unit.model";
import { APIPlans, Plan, type Plans } from "../models/plan.model";
import type { Signup } from "../models/signup.model";
import { SignupApiService } from "./signup-api.service";
import { StepperService } from "./stepper.service";

@Injectable({ providedIn: "root" })
export class SignupStoreService {
  signUpState = computed(() => this.state());
  private allPlans = signal<APIPlans>([]);
  private allAddons = signal<APIAddons>([]);

  billingFrequency = computed(
    () => this.signUpState().billingFrequency ?? BillingFrequencyUnit.Monthly
  );

  plans = computed((): Plans => {
    const billingFrequency = this.billingFrequency();
    return this.allPlans().map<Plan>(({ prices, ...restOfPlan }) => ({
      ...restOfPlan,
      price: findPrice({ prices, billingFrequency, defaultPrice: prices[0] }),
    }));
  });

  addons = computed((): Addons => {
    const billingFrequency = this.billingFrequency();
    return this.allAddons().map<Addon>(({ prices, ...restOfAddon }) => ({
      ...restOfAddon,
      price: findPrice({ prices, billingFrequency, defaultPrice: prices[0] }),
    }));
  });

  total = computed(() => {
    const { plan, addons } = this.signUpState();

    if (plan == null) {
      return 0;
    }

    if (addons == null) {
      return plan.price.amount;
    }

    return addons.reduce(
      (acc, addon) => acc + addon.price.amount,
      plan.price.amount
    );
  });

  private state = signal<Partial<Signup>>({});
  private signupApiService = inject(SignupApiService);
  private stepperService = inject(StepperService);

  maybeLoadPlans() {
    if (this.allPlans().length > 0) {
      return of(true);
    }

    return this.signupApiService.getPlans().pipe(
      take(1),
      tap((plans) => this.allPlans.set(plans)),
      map(() => true)
    );
  }

  maybeLoadAddons() {
    if (this.allAddons().length > 0) {
      return of(true);
    }

    return this.signupApiService.getAddons().pipe(
      take(1),
      tap((addons) => this.allAddons.set(addons)),
      map(() => true)
    );
  }

  progressToNextStep(signup: Partial<Signup>) {
    this.updateSignupState(signup);
    this.stepperService.nextStep();
  }

  completeSignup() {
    const signup = this.signUpState() as Signup;
    return this.signupApiService
      .completeSignup(signup)
      .pipe(tap(() => this.stepperService.nextStep()));
  }

  private updateSignupState(signup: Partial<Signup>): void {
    this.state.update((prev) => ({ ...prev, ...signup }));
  }
}
