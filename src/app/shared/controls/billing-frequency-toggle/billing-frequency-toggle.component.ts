import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  signal,
} from "@angular/core";
import {
  CheckboxControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { BillingFrequencyUnit } from "../../../models/billing-frequency-unit.model";

@Component({
  selector: "app-billing-frequency-toggle",
  standalone: true,
  imports: [],
  template: `
    <span class="label__text">Monthly</span>
    <div class="toggle-switch">
      <input
        type="checkbox"
        class="toggle-switch__checkbox"
        (change)="onChange($event)"
        (blur)="onTouched()"
        [checked]="isChecked()"
      />
      <span class="toggle-switch__slider"></span>
    </div>
    <span class="label__text">Yearly</span>
  `,
  styleUrl: "./billing-frequency-toggle.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BillingFrequencyToggle),
      multi: true,
    },
  ],
})
export class BillingFrequencyToggle extends CheckboxControlValueAccessor {
  value = signal<BillingFrequencyUnit | undefined>(undefined);

  isChecked = computed(() => this.value() === BillingFrequencyUnit.Yearly);

  private propagateChange: any = (event: Event) => {};
  private propagateTouched: any = () => {};

  override writeValue(value: BillingFrequencyUnit | undefined): void {
    this.value.set(value);
  }

  override onChange = (event: Event): void => {
    const input = event.target as HTMLInputElement;

    if (input == null) {
      return;
    }

    const value = input.checked
      ? BillingFrequencyUnit.Yearly
      : BillingFrequencyUnit.Monthly;

    this.writeValue(value);

    this.propagateChange(value);
  };

  override registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  override registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  override onTouched = (): void => {
    this.propagateTouched();
  };
}
