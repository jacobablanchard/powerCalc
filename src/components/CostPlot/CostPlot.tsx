import * as React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { months, type Month } from "../MonthSelector";
import type { PowerPlan } from "../PowerPlanInput/types";
import { calculateUsage } from "@/lib/powerCalculation";
import { addMonth } from "@/lib/utils";

export interface ICostPlot {
  startMonth: Month;
  powerUsage: number[];
  powerPlans: PowerPlan[];
}
export function CostPlot(props: ICostPlot) {
  const allMonths = months.map((val, index) =>
    addMonth(props.startMonth, index)
  );

  const costData = props.powerPlans.map((plan) => {
    return {
      ...plan,
      costs: calculateUsage(plan, props.powerUsage, props.startMonth),
    };
  });
  const data = allMonths.map((value, index) => {
    const costDataPerPlan = costData.reduce((previous, current) => {
      let planCost: Record<string, number> = {};
      planCost[`${current.provider ?? ""}-${current.name}`] =
        current.costs[index];
      return { ...previous, ...planCost };
    }, {});

    return { month: value, ...costDataPerPlan };
  });

  return (
    <LineChart
      width={900}
      height={300}
      data={data}
      margin={{ top: 5, right: 20, bottom: 20, left: 0 }}
    >
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      {props.powerPlans.map((plan) => {
        return (
          <Line
            type="monotone"
            dataKey={`${plan.provider ?? ""}-${plan.name}`}
            stroke="#8884d8"
          />
        );
      })}
    </LineChart>
  );
}
