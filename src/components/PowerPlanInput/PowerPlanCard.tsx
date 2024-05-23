import * as React from "react";
import type { PowerPlan } from "./types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";

export interface IPowerPlanCardProps {
  plan: PowerPlan;
  onRemoveClick: () => void;
  onEditClick: () => void;
}

export function PowerPlanCard(props: IPowerPlanCardProps) {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{props.plan.name}</CardTitle>
          {props.plan.provider && (
            <CardDescription>{props.plan.provider}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <p>Base charge: {props.plan.baseChargePerCycleCents} ¢</p>
          <p>Electricity charge: {props.plan.energyVariablePriceCents} ¢</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant={"outline"} onClick={() => props.onEditClick()}>
            Edit
          </Button>
          <Button variant={"outline"} onClick={() => props.onRemoveClick()}>
            Remove
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
