import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  output,
  signal,
} from "@angular/core";
import { NG_VALUE_ACCESSOR, type ControlValueAccessor } from "@angular/forms";

@Component({
  selector: "app-input",
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  template: `
    <input
      #input
      [type]="type()"
      class="form__input"
      [value]="value()"
      [placeholder]="placeholder() ?? ''"
      [attr.disabled]="disabled() || null"
      (keyup)="onKeyup(input.value)"
      (blur)="onBlur()"
    />
  `,
  styleUrl: "./input.component.scss",
})
export class InputComponent implements ControlValueAccessor {
  type = input.required<"text" | "email" | "tel">();
  placeholder = input<string | undefined>();
  changed = output<string>();

  value = signal<string | undefined>(undefined);
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

  writeValue(value: string): void {
    this.value.set(value);
  }

  onKeyup(value: string): void {
    this.value.set(value);
    this.propagateChange(value);
    this.changed.emit(value);
  }

  onBlur(): void {
    this.propagateTouched();
  }
}
