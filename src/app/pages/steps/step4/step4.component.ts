import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { MainHeaderComponent } from "../../../components/main/main-header/main-header.component";
import { MainInstructionsComponent } from "../../../components/main/main-instructions/main-instructions.component";
import type { Signup } from "../../../models/signup.model";
import { SignupStoreService } from "../../../services/signup-store.service";
import { StepperService } from "../../../services/stepper.service";
import { FormDirective } from "../../../shared/directives/form.directive";
import { BillingFrequencyDetailPipe } from "../../../shared/pipes/billing-frequency-detail.pipe";
import { PricePipe } from "../../../shared/pipes/price.pipe";

@Component({
  selector: "app-step4",
  standalone: true,
  imports: [
    BillingFrequencyDetailPipe,
    MainHeaderComponent,
    MainInstructionsComponent,
    PricePipe,
    RouterLink,
    FormDirective,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./step4.component.html",
  styleUrl: "./step4.component.scss",
})
export class Step4Component {
  stepperService = inject(StepperService);
  signUpService = inject(SignupStoreService);

  vm = computed(() => {
    const signup = this.signUpService.signUpState() as Signup;
    const total = this.signUpService.total();

    return {
      ...signup,
      total,
    };
  });

  onChangePlan(): void {
    this.stepperService.goToStep(2);
  }
}
