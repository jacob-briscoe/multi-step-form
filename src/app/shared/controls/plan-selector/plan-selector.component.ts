import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  signal,
} from "@angular/core";
import { NG_VALUE_ACCESSOR, type ControlValueAccessor } from "@angular/forms";
import type { BillingFrequencyUnit } from "../../../models/billing-frequency-unit.model";
import type { ID } from "../../../models/id.model";
import type { Plan, Plans } from "../../../models/plan.model";
import { BillingFrequencyDetailPipe } from "../../pipes/billing-frequency-detail.pipe";
import { PricePipe } from "../../pipes/price.pipe";

@Component({
  selector: "app-plan-selector",
  standalone: true,
  imports: [BillingFrequencyDetailPipe, PricePipe],
  templateUrl: "./plan-selector.component.html",
  styleUrl: "./plan-selector.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PlanSelectorComponent),
      multi: true,
    },
  ],
})
export class PlanSelectorComponent implements ControlValueAccessor {
  formControlName = input<string | number | null>(null);
  allPlans = input.required<Plans>();
  selectedBillingFrequency = input.required<BillingFrequencyUnit>();

  value = signal<Plan | undefined>(undefined);
  disabled = signal<boolean | undefined>(undefined);

  private propagateChange: any = () => {};
  private propagateTouched: any = () => {};

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  writeValue(value?: Plan): void {
    this.value.set(value);
  }

  onRadioChange(value: string): void {
    const planId = +value;

    const selectedPlan = this.allPlans().find(this.byPlanId(planId));

    this.value.set(selectedPlan);
    this.propagateChange(selectedPlan);
  }

  onBlur(): void {
    this.propagateTouched();
  }

  private byPlanId(id: ID) {
    return ({ id: compareToId }: { id: ID }) => compareToId === id;
  }
}
