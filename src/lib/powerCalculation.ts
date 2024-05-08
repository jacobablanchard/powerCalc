import type { Month } from "@/components/MonthSelector";
import type { PowerPlan } from "@/components/PowerPlanInput/types";
import { addMonth } from "./utils";

export const calculateUsage = (
  powerPlan: PowerPlan,
  usage: number[],
  startMonth: Month
) => {
  // Returns value in dollars
  return usage.map((monthsUsage) => {
    let monthsCost =
      powerPlan.TduBaseChargeCents +
      powerPlan.baseChargePerCycleCents +
      powerPlan.TduVariableChargeCents * monthsUsage +
      powerPlan.energyVariablePriceCents * monthsUsage;
    const totalDiscounts =
      powerPlan.discounts?.reduce((previous, discountFunction, index) => {
        return (
          previous + discountFunction(addMonth(startMonth, index), monthsUsage)
        );
      }, 0) ?? 0;
    return (monthsCost - totalDiscounts) * 0.01;
  });
};
