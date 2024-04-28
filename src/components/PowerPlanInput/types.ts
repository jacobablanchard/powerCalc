import type { Month } from "../MonthSelector";

export type DiscountFunction = (month: Month, usage: number) => number;

export interface PowerPlan {
  name: string;
  provider?: string;
  baseChargePerCycleCents: number; // in cents
  energyVariablePriceCents: number; // cents/kWh
  TduBaseChargeCents: number;
  TduVariableChargeCents: number;
  discounts?: DiscountFunction[];
}
