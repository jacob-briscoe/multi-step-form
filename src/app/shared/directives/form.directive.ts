import { Directive, ElementRef } from "@angular/core";
import { STEP_FORM_ID } from "../utils/form";

@Directive({
  selector: "[appForm]",
  standalone: true,
})
export class FormDirective {
  constructor(private form: ElementRef<HTMLFormElement>) {
    const formElement = this.form.nativeElement;

    formElement.classList.add("main-section__form");
    formElement.setAttribute("id", STEP_FORM_ID);
    formElement.setAttribute("novalidate", "");
    formElement.setAttribute("autocomplete", "on");
  }
}
