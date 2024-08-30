import type { Icon } from "./icon.model";
import type { ID } from "./id.model";
import type { Price, Prices } from "./price.model";

export type APIPlan = {
  id: ID;
  title: string;
  icon: Icon;
  prices: Prices;
};

export type APIPlans = APIPlan[];

export type Plan = Omit<APIPlan, "prices"> & {
  price: Price;
};

export type Plans = Plan[];
