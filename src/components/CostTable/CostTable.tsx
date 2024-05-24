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

function scale(
  number: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

const cellGradients = [
  "bg-cellGradient-4",
  "bg-cellGradient-3",
  "bg-cellGradient-2",
  "bg-cellGradient-1",
  "bg-cellGradient-0",
];

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

  const minMaxCosts = costData.map((current) => {
    return {
      minCost: Math.min(...current.costs),
      maxCost: Math.max(...current.costs),
    };
  });
  const overallMinMaxCost = minMaxCosts.reduce(
    (prev, curr) => {
      return {
        minCost: Math.min(prev.minCost, curr.minCost),
        maxCost: Math.max(prev.maxCost, curr.maxCost),
      };
    },
    { minCost: 0, maxCost: 0 }
  );

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
              {plan.costs.map((cost) => {
                const colorProportion =
                  cost /
                  (overallMinMaxCost.maxCost - overallMinMaxCost.minCost);
                const colorStop = Math.round(
                  scale(
                    cost,
                    overallMinMaxCost.minCost,
                    overallMinMaxCost.maxCost,
                    0,
                    5
                  )
                );
                return (
                  <TableCell
                    className={`${cellGradients[colorStop]}`}
                  >{`\$${cost.toFixed(2)}`}</TableCell>
                );
              })}
              <TableCell>{`\$${totalPlanCost.toFixed(2)}`}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
