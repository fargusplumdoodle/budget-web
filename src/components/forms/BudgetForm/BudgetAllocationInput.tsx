import React, { FunctionComponent } from "react";
import { AllocationInput } from "../../inputs";
import { useController } from "react-hook-form";

interface Props {}

const BudgetAllocationInput: FunctionComponent<Props> = () => {
  const {
    field: { value: isNode },
  } = useController({ name: "isNode" });

  return <AllocationInput disabled={isNode} setToZeroOnDisabled />;
};

export default BudgetAllocationInput;
