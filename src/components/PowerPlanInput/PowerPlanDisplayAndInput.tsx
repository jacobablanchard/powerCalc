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
  name: z.string().min(2).max(50),
  baseChargePerCycleCents: z.coerce.number().positive(),
  energyVariablePriceCents: z.coerce.number().positive(),
  TduBaseChargeCents: z.coerce.number().positive(),
  TduVariableChargeCents: z.coerce.number().positive(),
  _edit: z.boolean().default(false),
  _planIndex: z.number(),
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
    const newPlan = {
      baseChargePerCycleCents: values.baseChargePerCycleCents,
      energyVariablePriceCents: values.energyVariablePriceCents,
      name: values.name,
      provider: values.provider,
      TduBaseChargeCents: values.TduBaseChargeCents,
      TduVariableChargeCents: values.TduVariableChargeCents,
    };

    if (values._edit) {
      props.setPlans([
        ...props.plans.slice(0, values._planIndex),
        newPlan,
        ...props.plans.slice(values._planIndex + 1),
      ]);
    } else {
      props.setPlans([...props.plans, newPlan]);
    }
    setOpen(false);
  }

  return (
    <div>
      <div className="flex gap-2 flex-wrap">
        {props.plans.map((plan, index) => (
          <PowerPlanCard
            plan={plan}
            onRemoveClick={() =>
              props.setPlans(
                props.plans.filter((value, planIndex) => planIndex != index)
              )
            }
            onEditClick={() => {
              form.reset({
                ...plan,
                _edit: true,
                _planIndex: index,
              });
              setOpen(true);
            }}
          />
        ))}
      </div>
      <Button
        onClick={() => {
          form.reset({ _edit: false });
          setOpen(true);
        }}
      >
        + Add Plan
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
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
                  name="name"
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
                  name="TduBaseChargeCents"
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
                  name="TduVariableChargeCents"
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
