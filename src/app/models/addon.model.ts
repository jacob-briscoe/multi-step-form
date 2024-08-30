import type { ID } from "./id.model";
import type { NoPromoPrice, NoPromoPrices } from "./price.model";

export type APIAddon = {
  id: ID;
  title: string;
  description: string;
  prices: NoPromoPrices;
};

export type APIAddons = APIAddon[];

export type Addon = Omit<APIAddon, "prices"> & {
  price: NoPromoPrice;
};

export type Addons = Addon[];
