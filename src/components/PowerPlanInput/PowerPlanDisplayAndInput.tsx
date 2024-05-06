import * as React from "react";
import type { PowerPlan } from "./types";
import { PowerPlanCard } from "./PowerPlanCard";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  provider: z.string().min(2).max(50),
  planName: z.string().min(2).max(50),
  baseChargePerCycleCents: z.coerce.number().positive(),
  energyVariablePriceCents: z.coerce.number().positive(),
  tduBaseChargePerCycleCents: z.coerce.number().positive(),
  tduEnergyVariablePriceCents: z.coerce.number().positive(),
});

export interface IPowerPlanDisplayAndInputProps {
  plans: PowerPlan[];
  setPlans: (plans: PowerPlan[]) => void;
}

export function PowerPlanDisplayAndInput(
  props: IPowerPlanDisplayAndInputProps
) {
  const [open, setOpen] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    props.setPlans([
      ...props.plans,
      {
        baseChargePerCycleCents: values.baseChargePerCycleCents,
        energyVariablePriceCents: values.energyVariablePriceCents,
        name: values.planName,
        provider: values.provider,
        TduBaseChargeCents: values.tduBaseChargePerCycleCents,
        TduVariableChargeCents: values.tduEnergyVariablePriceCents,
      },
    ]);
    setOpen(false);
  }

  return (
    <div>
      <div className="flex">
        {props.plans.map((plan) => (
          <PowerPlanCard plan={plan} />
        ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>+ Add Plan</Button>
        </DialogTrigger>
        <DialogContent className=" overflow-y-scroll max-h-screen">
          <DialogHeader>
            <DialogTitle>Add a plan</DialogTitle>
          </DialogHeader>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="provider"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Provider</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormDescription>
                        The name of the provider for this plan
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="planName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Plan Name</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormDescription>
                        The name of the plan for this provider
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="baseChargePerCycleCents"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Plan Base charge per month (in cents)
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="" type="number" {...field} />
                      </FormControl>
                      <FormDescription>
                        How much this plan charges per month as a base
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="energyVariablePriceCents"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Charge per kW/h (in cents)</FormLabel>
                      <FormControl>
                        <Input placeholder="" type="number" {...field} />
                      </FormControl>
                      <FormDescription>
                        How much this plan charges per kW/h
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tduBaseChargePerCycleCents"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        TDU Base charge per month (in cents)
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="" type="number" {...field} />
                      </FormControl>
                      <FormDescription>
                        How much TDU charges per month as a base
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tduEnergyVariablePriceCents"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>TDU charge per kW/h (in cents)</FormLabel>
                      <FormControl>
                        <Input placeholder="" type="number" {...field} />
                      </FormControl>
                      <FormDescription>
                        How much TDU charges per kW/h
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}