import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  signal,
  type OnInit,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import {
  StatusChangeEvent,
  TouchedChangeEvent,
  type AbstractControl,
} from "@angular/forms";
import { filter, tap } from "rxjs";

@Component({
    selector: "app-form-field",
    imports: [],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "./form-field.component.html",
    styleUrl: "./form-field.component.scss"
})
export class FormFieldComponent implements OnInit {
  label = input<string | undefined>();
  control = input.required<AbstractControl>();
  patternError = input<string | undefined>();
  hasValidation = input(true, {
    transform: booleanAttribute,
  });

  destroyRef = inject(DestroyRef);

  error = signal<{
    hasError: boolean;
    key?: string;
  }>({
    hasError: false,
  });

  ngOnInit(): void {
    this.control()
      .events.pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(
          (event) =>
            event instanceof TouchedChangeEvent ||
            event instanceof StatusChangeEvent
        ),
        tap((event) => {
          const control = event.source;
          const hasError = control.touched && control.invalid;
          const [key] = hasError ? Object.keys(control.errors!) : [];

          this.error.set({
            hasError,
            key,
          });
        })
      )
      .subscribe();
  }
}
