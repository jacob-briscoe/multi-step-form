import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-main-header",
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <h1 class="main-section__title"><ng-content /></h1> `,
  styles: ``,
})
export class MainHeaderComponent {}
