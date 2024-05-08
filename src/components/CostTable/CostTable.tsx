import * as React from "react";
import { months, type Month } from "../MonthSelector";
import type { PowerPlan } from "../PowerPlanInput/types";
import { calculateUsage } from "@/lib/powerCalculation";
import { addMonth } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export interface ICostTable {
  startMonth: Month;
  powerUsage: number[];
  powerPlans: PowerPlan[];
}
export function CostTable(props: ICostTable) {
  const allMonths = months.map((val, index) =>
    addMonth(props.startMonth, index)
  );

  const costData = props.powerPlans.map((plan) => {
    return {
      ...plan,
      costs: calculateUsage(plan, props.powerUsage, props.startMonth),
    };
  });

  return (
    <Table className="w-[100%]">
      <TableHeader>
        <TableRow>
          <TableHead className="sticky left-0 bg-background"></TableHead>
          {allMonths.map((month) => (
            <TableHead>{month}</TableHead>
          ))}
          <TableHead>Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {costData.map((plan) => {
          const totalPlanCost = plan.costs.reduce(
            (runningTotal, current) => current + runningTotal,
            0
          );
          return (
            <TableRow>
              <TableCell className="sticky left-0 bg-background">{`${
                plan.provider ?? ""
              }-${plan.name}`}</TableCell>
              {plan.costs.map((cost) => (
                <TableCell>{`\$${cost.toFixed(2)}`}</TableCell>
              ))}
              <TableCell>{`\$${totalPlanCost.toFixed(2)}`}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
