import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MainHeaderComponent } from "../../../components/main/main-header/main-header.component";
import { MainInstructionsComponent } from "../../../components/main/main-instructions/main-instructions.component";

@Component({
  selector: "app-step5",
  standalone: true,
  imports: [MainHeaderComponent, MainInstructionsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./step5.component.html",
  styleUrl: "./step5.component.scss",
})
export class Step5Component {}
