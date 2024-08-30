import { type BillingFrequencyUnit } from "./billing-frequency-unit.model";

export type Price = {
  amount: number;
  billingFrequency: BillingFrequencyUnit;
  promo?: string;
};

export type Prices = Price[];

export type NoPromoPrice = Exclude<Price, "promo">;

export type NoPromoPrices = NoPromoPrice[];
