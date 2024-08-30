import type { BillingFrequencyUnit } from "../../models/billing-frequency-unit.model";
import type { Price, Prices } from "../../models/price.model";

export type FindPriceReturnType<T> = T extends { defaultPrice: Price }
  ? Price
  : Price | undefined;

export type FindPriceParameters = {
  prices: Prices;
  billingFrequency: BillingFrequencyUnit;
  defaultPrice?: Price;
};
