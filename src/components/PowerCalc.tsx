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
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [powerPlans, setPowerPlans] = React.useState<PowerPlan[]>([
    {
      name: "Power plan 100",
      provider: "Frontier",
      baseChargePerCycleCents: 100.111,
      energyVariablePriceCents: 200.222,
      TduBaseChargeCents: 300.0,
      TduVariableChargeCents: 20.3,
    },
    {
      name: "Power plan 200",
      provider: "Frontier",
      baseChargePerCycleCents: 100.111,
      energyVariablePriceCents: 500.222,
      TduBaseChargeCents: 300.0,
      TduVariableChargeCents: 20.3,
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
