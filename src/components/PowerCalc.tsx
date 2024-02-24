import * as React from "react";
import { Button } from "@/components/ui/button";

interface IPowerCalcProps {}

const PowerCalc: React.FunctionComponent<IPowerCalcProps> = (props) => {
  const [num, setNum] = React.useState(0);
  return (
    <div>
      <Button>test</Button>
    </div>
  );
};

export default PowerCalc;
