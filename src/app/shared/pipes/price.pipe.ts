import { formatCurrency } from "@angular/common";
import { inject, LOCALE_ID, Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "price",
  standalone: true,
})
export class PricePipe implements PipeTransform {
  locale = inject(LOCALE_ID);

  transform(amount: number): string {
    return formatCurrency(amount, this.locale, "$", "USD", "1.0-0");
  }
}
