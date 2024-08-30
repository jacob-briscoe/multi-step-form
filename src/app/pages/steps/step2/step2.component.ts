import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  type FormGroup,
} from "@angular/forms";
import { MainHeaderComponent } from "../../../components/main/main-header/main-header.component";
import { MainInstructionsComponent } from "../../../components/main/main-instructions/main-instructions.component";
import { defaultTo, defaultToNull } from "../../../helpers/utils.helper";
import { BillingFrequencyUnit } from "../../../models/billing-frequency-unit.model";
import { SignupStoreService } from "../../../services/signup-store.service";
import { BillingFrequencyToggle } from "../../../shared/controls/billing-frequency-toggle/billing-frequency-toggle.component";
import { FormFieldComponent } from "../../../shared/controls/form-field/form-field.component";
import { PlanSelectorComponent } from "../../../shared/controls/plan-selector/plan-selector.component";
import { FormDirective } from "../../../shared/directives/form.directive";
import type { Form } from "./models/form";

@Component({
  selector: "app-step2",
  standalone: true,
  imports: [
    BillingFrequencyToggle,
    FormDirective,
    FormFieldComponent,
    MainHeaderComponent,
    MainInstructionsComponent,
    PlanSelectorComponent,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./step2.component.html",
  styleUrls: ["./step2.component.scss"],
})
export class Step2Component {
  formBuilder = inject(FormBuilder);
  signUpService = inject(SignupStoreService);
  form: FormGroup<Form>;
  plans = this.signUpService.plans;

  constructor() {
    const { plan, billingFrequency: frequency } =
      this.signUpService.signUpState();

    this.form = this.formBuilder.group<Form>({
      plan: this.formBuilder.control(defaultToNull(plan), {
        validators: [Validators.required],
      }),
      billingFrequency: this.formBuilder.nonNullable.control(
        defaultTo(BillingFrequencyUnit.Monthly)(frequency),
        {
          validators: [Validators.required],
        }
      ),
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { billingFrequency, plan } = this.form.getRawValue();

    this.signUpService.progressToNextStep({
      plan: plan!,
      billingFrequency,
    });
  }
}
