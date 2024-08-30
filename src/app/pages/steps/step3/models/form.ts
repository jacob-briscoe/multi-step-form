import type { FormArray, FormControl } from "@angular/forms";

export type Form = {
  addons: FormArray<FormControl<boolean>>;
};
