import { Component, inject } from "@angular/core";
import { StepperService } from "../../services/stepper.service";

@Component({
  selector: "app-stepper",
  standalone: true,
  imports: [],
  template: `
    <nav class="nav">
      <ol class="steps">
        @for (step of stepperService.visibleSteps(); track step.num) {
          <li
            class="step"
            [class.step-active]="step.num === stepperService.active()"
          >
            <label class="step__label">{{ step.num }}</label>
            <p class="step__text">
              <span class="step__number">Step {{ step.num }}</span>
              {{ step.description }}
            </p>
          </li>
        }
      </ol>
    </nav>
  `,
  styleUrl: "./stepper.component.scss",
})
export class StepperComponent {
  stepperService = inject(StepperService);
}
