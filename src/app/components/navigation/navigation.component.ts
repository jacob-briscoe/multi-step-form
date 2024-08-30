import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  output,
} from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { StepperService } from "../../services/stepper.service";
import { ButtonDirective } from "../../shared/directives/button.directive";
import { STEP_FORM_ID } from "../../shared/utils/form";

@Component({
  selector: "app-navigation",
  standalone: true,
  imports: [ButtonDirective, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./navigation.component.html",
  styleUrl: "./navigation.component.scss",
})
export class NavigationComponent {
  confirmSignup = output<void>();

  stepperService = inject(StepperService);

  nextStepButtonText = computed(() => {
    if (this.stepperService.isSecondToLastStep()) {
      return "Confirm";
    }

    return "Next Step";
  });

  get stepFormId(): string {
    return STEP_FORM_ID;
  }

  handleConfirmSignup(): void {
    this.confirmSignup.emit();
  }
}
