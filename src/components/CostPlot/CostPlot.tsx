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
import { useEffect, useState } from "react";

export interface ICostPlot {
  startMonth: Month;
  powerUsage: number[];
  powerPlans: PowerPlan[];
  width: number;
}
function CostPlot(props: ICostPlot) {
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
      width={props.width}
      height={300}
      data={data}
      margin={{ top: 5, right: 20, bottom: 20, left: 0 }}
    >
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis
        dataKey="month"
        tickFormatter={(value: string) => value.slice(0, 3)}
      />
      <Tooltip
        formatter={(value, name, props) =>
          `\$${Number.parseFloat(value.toString()).toFixed(2)}`
        }
        contentStyle={{ backgroundColor: "hsl(var(--background))" }}
      />
      {props.powerPlans.map((plan) => {
        return (
          <Line
            type="monotone"
            dataKey={`${plan.provider ?? ""}-${plan.name}`}
            stroke="#8884d8"
          />
        );
      })}
      <YAxis
        tickFormatter={(value, index) => {
          return `\$${value}`;
        }}
      />
    </LineChart>
  );
}

function CostPlotForSize(props: Omit<ICostPlot, "width">) {
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }
  return (
    <div>
      <div className="sm:hidden md:hidden lg:hidden xl:hidden">
        <CostPlot
          powerPlans={props.powerPlans}
          powerUsage={props.powerUsage}
          startMonth={props.startMonth}
          width={400}
        />
      </div>
      <div className="hidden sm:inline md:hidden ">
        <CostPlot
          powerPlans={props.powerPlans}
          powerUsage={props.powerUsage}
          startMonth={props.startMonth}
          width={600}
        />
      </div>
      <div className="hidden md:inline lg:hidden ">
        <CostPlot
          powerPlans={props.powerPlans}
          powerUsage={props.powerUsage}
          startMonth={props.startMonth}
          width={750}
        />
      </div>
      <div className="hidden lg:inline xl:hidden ">
        <CostPlot
          powerPlans={props.powerPlans}
          powerUsage={props.powerUsage}
          startMonth={props.startMonth}
          width={975}
        />
      </div>
      <div className="hidden xl:inline">
        <CostPlot
          powerPlans={props.powerPlans}
          powerUsage={props.powerUsage}
          startMonth={props.startMonth}
          width={1200}
        />
      </div>
    </div>
  );
}

export { CostPlotForSize as CostPlot };
