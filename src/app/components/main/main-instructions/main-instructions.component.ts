import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-main-instructions",
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <h2 class="main-section__instructions"><ng-content /></h2> `,
  styles: ``,
})
export class MainInstructionsComponent {}
