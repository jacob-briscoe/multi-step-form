import { Pipe, PipeTransform } from "@angular/core";
import { billingFrequencyDetails } from "../../models/billing-frequency-detail.model";
import { BillingFrequencyUnit } from "../../models/billing-frequency-unit.model";

@Pipe({
  name: "billingFrequencyDetail",
  standalone: true,
})
export class BillingFrequencyDetailPipe implements PipeTransform {
  transform(
    value: BillingFrequencyUnit,
    format: "abbreviation" | "title" | "singularTitle" = "abbreviation"
  ): string {
    return billingFrequencyDetails.find((detail) => detail.type === value)![
      format
    ];
  }
}
