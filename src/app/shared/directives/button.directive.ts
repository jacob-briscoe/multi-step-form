import { computed, Directive, effect, ElementRef, input } from "@angular/core";

type Button = "basic" | "filled";

@Directive({
  selector: "[appButton]",
  standalone: true,
})
export class ButtonDirective {
  appButton = input<Button | undefined>("basic");

  private readonly buttonClasses: Readonly<Record<Button, string[]>> = {
    basic: ["button", "button_basic"],
    filled: ["button"],
  };

  classes = computed(() => {
    const appButtonType = this.appButton() ?? "basic";
    return [...this.buttonClasses[appButtonType]];
  });

  constructor(private button: ElementRef<HTMLButtonElement>) {
    effect(() => {
      const buttonElement = this.button.nativeElement;

      this.resetExistingPossibleClasses(buttonElement);

      buttonElement.classList.add(...this.classes());
    });
  }

  private resetExistingPossibleClasses(buttonElement: HTMLButtonElement) {
    const allPossibleClasses = new Set(
      Object.values(this.buttonClasses).flat()
    );
    buttonElement.classList.remove(...allPossibleClasses);
  }
}
