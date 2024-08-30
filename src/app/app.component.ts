import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { RouterOutlet } from "@angular/router";
import { take } from "rxjs";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { StepperComponent } from "./components/stepper/stepper.component";
import { SignupStoreService } from "./services/signup-store.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, StepperComponent, NavigationComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  signUpService = inject(SignupStoreService);
  destroyRef = inject(DestroyRef);

  onConfirmSignup() {
    this.signUpService
      .completeSignup()
      .pipe(take(1), takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
