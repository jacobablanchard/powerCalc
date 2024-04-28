import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

export type Month = (typeof months)[number];

const MonthSelector: React.FC<{
  month?: Month;
  setMonth: (month: Month) => void;
}> = (props) => {
  return (
    <Select
      value={props.month}
      onValueChange={(val) => props.setMonth(val as Month)}
    >
      <SelectTrigger className="w-56">
        <SelectValue placeholder="Select a beginning month" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Month</SelectLabel>
          {months.map((month) => (
            <SelectItem value={month}>{month}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default MonthSelector;
