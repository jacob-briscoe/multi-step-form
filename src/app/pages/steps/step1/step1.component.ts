import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
  type FormGroup,
} from "@angular/forms";
import { MainHeaderComponent } from "../../../components/main/main-header/main-header.component";
import { MainInstructionsComponent } from "../../../components/main/main-instructions/main-instructions.component";
import { defaultToEmptyString } from "../../../helpers/utils.helper";
import { SignupStoreService } from "../../../services/signup-store.service";
import { FormFieldComponent } from "../../../shared/controls/form-field/form-field.component";
import { InputComponent } from "../../../shared/controls/input/input.component";
import { FormDirective } from "../../../shared/directives/form.directive";
import { Regex, RegexError } from "../../../shared/utils/regex";
import type { Form } from "./models/form";

@Component({
  selector: "app-step1",
  standalone: true,
  imports: [
    FormDirective,
    FormFieldComponent,
    InputComponent,
    MainHeaderComponent,
    MainInstructionsComponent,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./step1.component.html",
})
export class Step1Component {
  signUpService = inject(SignupStoreService);
  formBuilder = inject(NonNullableFormBuilder);
  form: FormGroup<Form>;

  constructor() {
    const { personalInfo } = this.signUpService.signUpState();

    this.form = this.formBuilder.group<Form>({
      name: this.formBuilder.control(defaultToEmptyString(personalInfo?.name), {
        validators: [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(255),
        ],
      }),
      email: this.formBuilder.control(
        defaultToEmptyString(personalInfo?.email),
        {
          validators: [Validators.required, Validators.email],
        }
      ),
      phone: this.formBuilder.control(
        defaultToEmptyString(personalInfo?.phone),
        {
          validators: [Validators.required, Validators.pattern(Regex.phone)],
        }
      ),
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const personalInfo = this.form.getRawValue();

    this.signUpService.progressToNextStep({
      personalInfo,
    });
  }

  get phonePatternError(): string {
    return RegexError.phone;
  }
}
