import type { FormControl } from "@angular/forms";

export type Form = {
  name: FormControl<string>;
  email: FormControl<string>;
  phone: FormControl<string>;
};
