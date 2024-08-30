import { BillingFrequencyUnit } from "./billing-frequency-unit.model";

export type BillingFrequencyDetail = {
  type: BillingFrequencyUnit;
  abbreviation: string;
  title: string;
  singularTitle: string;
};

export type BillingFrequencyDetails = BillingFrequencyDetail[];

export const billingFrequencyDetails: ReadonlyArray<
  Readonly<BillingFrequencyDetail>
> = [
  {
    type: BillingFrequencyUnit.Monthly,
    abbreviation: "mo",
    title: "Monthly",
    singularTitle: "month",
  },
  {
    type: BillingFrequencyUnit.Yearly,
    abbreviation: "yr",
    title: "Yearly",
    singularTitle: "year",
  },
];
