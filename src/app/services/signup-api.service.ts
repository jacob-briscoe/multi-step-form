import { Injectable } from "@angular/core";
import { delay, of } from "rxjs";
import type { APIAddons } from "../models/addon.model";
import { APIPlans } from "../models/plan.model";
import type { Signup } from "../models/signup.model";
import sampleData from "../sample-data.json";

@Injectable({ providedIn: "root" })
export class SignupApiService {
  private readonly delayTime = 0;

  getPlans() {
    return of<APIPlans>(sampleData.plans).pipe(delay(this.delayTime));
  }

  getAddons() {
    return of<APIAddons>(sampleData.addons).pipe(delay(this.delayTime));
  }

  completeSignup(signup: Signup) {
    console.info("Signup User", signup);

    return of(true).pipe(delay(this.delayTime));
  }
}
