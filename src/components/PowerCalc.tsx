import * as React from "react";
import MonthSelector, { type Month } from "./MonthSelector";
import PowerUsageInput from "./PowerUsageInput";
import type { PowerPlan } from "./PowerPlanInput/types";
import PowerPlanDisplayAndInput from "./PowerPlanInput";
import CostPlot from "./CostPlot";
import CostTable from "./CostTable";

interface IPowerCalcProps {}

const PowerCalc: React.FunctionComponent<IPowerCalcProps> = (props) => {
  const [month, setMonth] = React.useState<Month>("January");
  const [powerUsage, setPowerUsage] = React.useState([
    100, 100, 100, 100, 100, 300, 500, 1000, 500, 300, 100, 0,
  ]);
  const [powerPlans, setPowerPlans] = React.useState<PowerPlan[]>([
    {
      name: "PTC 3 Month - Postpaid",
      provider: "Payless Power",
      baseChargePerCycleCents: 0,
      energyVariablePriceCents: 8.1,
      TduBaseChargeCents: 423.0,
      TduVariableChargeCents: 4.5403,
    },
    {
      name: "Power plan 200",
      provider: "Octopus energy",
      baseChargePerCycleCents: 1000,
      energyVariablePriceCents: 8.5215,
      TduBaseChargeCents: 423.0,
      TduVariableChargeCents: 4.5403,
    },
  ]);

  return (
    <div className="flex flex-col gap-3 mx-4">
      <MonthSelector month={month} setMonth={setMonth}></MonthSelector>
      <PowerUsageInput
        powerUsage={powerUsage}
        setPowerUsage={setPowerUsage}
        startMonth={month}
      />
      <hr></hr>
      <PowerPlanDisplayAndInput plans={powerPlans} setPlans={setPowerPlans} />
      <CostPlot
        powerPlans={powerPlans}
        powerUsage={powerUsage}
        startMonth={month}
      />
      <CostTable
        powerPlans={powerPlans}
        powerUsage={powerUsage}
        startMonth={month}
      />
    </div>
  );
};

export default PowerCalc;
