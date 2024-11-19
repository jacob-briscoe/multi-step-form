import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  signal,
} from "@angular/core";
import {
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  type ControlValueAccessor,
  type FormGroup,
} from "@angular/forms";
import { type Addons } from "../../../models/addon.model";
import type { Form } from "../../../pages/steps/step3/models/form";
import { BillingFrequencyDetailPipe } from "../../pipes/billing-frequency-detail.pipe";
import { PricePipe } from "../../pipes/price.pipe";

@Component({
    selector: "app-addons-selector",
    imports: [BillingFrequencyDetailPipe, ReactiveFormsModule, PricePipe],
    templateUrl: "./addons-selector.component.html",
    styleUrl: "./addons-selector.component.scss",
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AddonsSelectorComponent),
            multi: true,
        },
    ]
})
export class AddonsSelectorComponent implements ControlValueAccessor {
  allAddons = input.required<Addons>();
  form = input.required<FormGroup<Form>>();

  value = signal<Addons>([]);
  disabled = signal<boolean | undefined>(undefined);

  private propagateChange: any = () => {};

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(_: any): void {}

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  writeValue(value: Addons): void {
    this.value.set(value);
  }
}
