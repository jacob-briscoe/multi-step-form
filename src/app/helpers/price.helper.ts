import type {
  FindPriceParameters,
  FindPriceReturnType,
} from "./models/price.helper.model";
import { defaultTo } from "./utils.helper";

export function findPrice<T extends FindPriceParameters>({
  billingFrequency,
  prices,
  defaultPrice,
}: T): FindPriceReturnType<T> {
  const price = prices.find(
    (price) => price.billingFrequency === billingFrequency
  );

  if (defaultPrice != null) {
    const fallbackPrice = defaultTo(defaultPrice);
    return fallbackPrice(price) as FindPriceReturnType<T>;
  }

  return price as FindPriceReturnType<T>;
}
