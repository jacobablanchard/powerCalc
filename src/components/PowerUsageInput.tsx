import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Month } from "./MonthSelector";
import { addMonth } from "@/lib/utils";

const PowerUsageInput: React.FC<{
  startMonth: Month;
  powerUsage: number[];
  setPowerUsage: (powerUsage: number[]) => void;
}> = (props) => {
  return (
    <div className="flex flex-col lg:flex-row">
      {props.powerUsage.map((value, index) => {
        const monthName = addMonth(props.startMonth, index);
        return (
          <div className="flex-col">
            <Label htmlFor={`${monthName}-usage`}>{monthName}</Label>
            <Input
              type="number"
              id={`${monthName}-usage`}
              placeholder="kWh"
              onChange={(e) => {
                props.setPowerUsage([
                  ...props.powerUsage.slice(0, index),
                  Number.parseInt(e.target.value),
                  ...props.powerUsage.slice(index + 1, props.powerUsage.length),
                ]);
              }}
              value={value}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PowerUsageInput;
