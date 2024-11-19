import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import {
  FormBuilder,
  ReactiveFormsModule,
  type FormControl,
  type FormGroup,
} from "@angular/forms";
import { MainHeaderComponent } from "../../../components/main/main-header/main-header.component";
import { MainInstructionsComponent } from "../../../components/main/main-instructions/main-instructions.component";
import { SignupStoreService } from "../../../services/signup-store.service";
import { AddonsSelectorComponent } from "../../../shared/controls/addons-selector/addons-selector.component";
import { FormFieldComponent } from "../../../shared/controls/form-field/form-field.component";
import { FormDirective } from "../../../shared/directives/form.directive";
import type { Form } from "./models/form";

@Component({
    selector: "app-step3",
    imports: [
        FormDirective,
        FormFieldComponent,
        MainHeaderComponent,
        MainInstructionsComponent,
        ReactiveFormsModule,
        AddonsSelectorComponent,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: "./step3.component.html"
})
export class Step3Component {
  formBuilder = inject(FormBuilder);
  signUpService = inject(SignupStoreService);
  form: FormGroup<Form>;
  allAddons = this.signUpService.addons;

  constructor() {
    const { addons: selectedAddons } = this.signUpService.signUpState();

    const addonControls = this.allAddons().map((addon) => {
      const selected = selectedAddons?.some(({ id }) => id === addon.id);
      return this.formBuilder.nonNullable.control(!!selected);
    });

    this.form = this.formBuilder.group<Form>({
      addons: this.formBuilder.array<FormControl<boolean>>(addonControls),
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { addons: formAddons } = this.form.getRawValue();

    const addons = this.allAddons()
      .filter((_, index) => formAddons[index])
      .map((addon) => addon);

    this.signUpService.progressToNextStep({ addons });
  }
}
