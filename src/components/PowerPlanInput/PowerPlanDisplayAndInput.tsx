import * as React from "react";
import type { PowerPlan } from "./types";
import { PowerPlanCard } from "./PowerPlanCard";
import { Button } from "@/components/ui/button";

// Takes in a month and that month's usage, and returns the new price for that month

export interface IPowerPlanDisplayAndInputProps {
  plans: PowerPlan[];
  setPlans: (plans: PowerPlan[]) => void;
}

export function PowerPlanDisplayAndInput(
  props: IPowerPlanDisplayAndInputProps
) {
  return (
    <div>
      <div className="flex">
        {props.plans.map((plan) => (
          <PowerPlanCard plan={plan} />
        ))}
      </div>
      <Button>+ Add Plan</Button>
    </div>
  );
}
