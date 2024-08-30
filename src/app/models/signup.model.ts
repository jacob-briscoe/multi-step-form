import type { Addons } from "./addon.model";
import type { BillingFrequencyUnit } from "./billing-frequency-unit.model";
import type { Person } from "./person.model";
import type { Plan } from "./plan.model";

export type Signup = {
  personalInfo: Person;
  plan: Plan;
  billingFrequency: BillingFrequencyUnit;
  addons: Addons;
};
