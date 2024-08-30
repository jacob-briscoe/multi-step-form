import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter, map, tap } from "rxjs";
import type { Steps } from "../models/stepper.model";

@Injectable({ providedIn: "root" })
export class StepperService {
  private router = inject(Router);
  private steps = signal<Steps>({
    active: 1,
    steps: [],
  });

  private isLastStep = computed(
    () => this.active() === this.steps().steps.length
  );

  visibleSteps = computed(() =>
    this.steps().steps.filter((step) => !step.isHidden)
  );

  active = computed(() => this.steps().active);

  hasNextStep = computed(() => {
    const steps = this.steps();
    return steps.active < steps.steps.length;
  });

  hasPreviousStep = computed(() => {
    const steps = this.steps();
    const onLastStep = this.isLastStep();
    return steps.active > 1 && !onLastStep;
  });

  isSecondToLastStep = computed(
    () => this.active() === this.steps().steps.length - 1
  );

  constructor() {
    this.steps.set({
      active: 1,
      steps: [
        {
          num: 1,
          description: "Your Info",
        },
        {
          num: 2,
          description: "Select Plan",
        },
        {
          num: 3,
          description: "Add-Ons",
        },
        {
          num: 4,
          description: "Summary",
        },
        {
          num: 5,
          description: "Thank You",
          isHidden: true,
        },
      ],
    });

    effect(() => {
      const currentStep = this.active();

      if (
        this.router.routerState.snapshot.url.endsWith(currentStep.toString())
      ) {
        return;
      }

      this.router.navigate([currentStep]);
    });

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map((event) => event as NavigationEnd),
        tap((event) => {
          const currentStep = this.active();

          if (event.url.endsWith(currentStep.toString())) {
            return;
          }

          if (event.url.endsWith("/")) {
            this.goToStep(1);
          } else {
            this.goToStep(parseInt(event.url.split("/")[1]));
          }
        })
      )
      .subscribe();
  }

  nextStep() {
    this.steps.update((steps) => {
      const nextStep = steps.active + 1;
      return {
        ...steps,
        active: nextStep <= steps.steps.length ? nextStep : steps.active,
      };
    });
  }

  previousStep() {
    this.steps.update((steps) => {
      const previousStep = steps.active - 1;
      return {
        ...steps,
        active: previousStep > 0 ? previousStep : steps.active,
      };
    });
  }

  goToStep(step: number) {
    this.steps.update((steps) => {
      return {
        ...steps,
        active: step,
      };
    });
  }
}
