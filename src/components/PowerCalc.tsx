import * as React from "react";
import MonthSelector, { type Month } from "./MonthSelector";
import PowerUsageInput from "./PowerUsageInput";
import type { PowerPlan } from "./PowerPlanInput/types";
import PowerPlanDisplayAndInput from "./PowerPlanInput";
import CostPlot from "./CostPlot";
import CostTable from "./CostTable";
import { Button } from "@/components/ui/button";

interface SaveData {
  startMonth: Month;
  powerUsage: number[];
  plans: PowerPlan[];
}

interface IPowerCalcProps {}

const PowerCalc: React.FunctionComponent<IPowerCalcProps> = (props) => {
  const [month, setMonth] = React.useState<Month>("January");
  const [powerUsage, setPowerUsage] = React.useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);
  const [powerPlans, setPowerPlans] = React.useState<PowerPlan[]>([]);
  const inputFile = React.useRef<HTMLInputElement>(null);

  const stringifyData = () => {
    return JSON.stringify({
      plans: powerPlans,
      powerUsage: powerUsage,
      startMonth: month,
    } as SaveData);
  };

  return (
    <div className="flex flex-col gap-3 mx-4">
      <div className="flex">
        <MonthSelector month={month} setMonth={setMonth}></MonthSelector>
        <div className="flex flex-col">
          <div className="flex">
            <Button
              onClick={() => {
                window.localStorage.setItem("data", stringifyData());
              }}
            >
              Save to browser
            </Button>
            <Button
              onClick={() => {
                const rawData = window.localStorage.getItem("data");
                if (!rawData) {
                  return;
                }
                const parsedData = JSON.parse(rawData) as SaveData;
                setMonth(parsedData.startMonth);
                setPowerPlans(parsedData.plans);
                setPowerUsage(parsedData.powerUsage);
              }}
            >
              Load from browser
            </Button>
          </div>
          <div className="flex">
            <Button
              onClick={() => {
                const blob = new Blob([stringifyData()], {
                  type: "text/plain",
                }); // the blob
                var a = document.createElement("a");
                a.download = "data.json";
                a.href = window.URL.createObjectURL(blob);
                a.click();
                a.remove();
              }}
            >
              Save to file
            </Button>
            <Button
              onClick={() => {
                inputFile.current!.click();
              }}
            >
              Load from file
            </Button>
          </div>
        </div>
      </div>
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
      <input
        type="file"
        id="file"
        ref={inputFile}
        style={{ display: "none" }}
        onChange={async (event) => {
          if (!event.target.files) {
            return;
          }
          const fileText = await event.target.files[0].text();
          const data = JSON.parse(fileText) as SaveData;
          setMonth(data.startMonth);
          setPowerPlans(data.plans);
          setPowerUsage(data.powerUsage);
        }}
      />
    </div>
  );
};

export default PowerCalc;
