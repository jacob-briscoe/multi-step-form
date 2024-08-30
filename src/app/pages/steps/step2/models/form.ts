import type { FormControl } from "@angular/forms";
import type { BillingFrequencyUnit } from "../../../../models/billing-frequency-unit.model";
import type { Plan } from "../../../../models/plan.model";

export type Form = {
  plan: FormControl<Plan | null>;
  billingFrequency: FormControl<BillingFrequencyUnit>;
};
