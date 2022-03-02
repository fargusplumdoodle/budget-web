import { Button } from "@mui/material";
import { FormItem } from "../../../util/form";
import * as React from "react";
import { useForm } from "react-hook-form";
import ExpressionTable from "./ExpressionTable";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import { Expression } from "./types";
import { OPERANDS, OPERATORS } from "./constants";
import { removeFromValuesList, updateValuesList } from "../../../util/state";
import { getQueryParametersFromExpressions } from "../../../api/util";
const sx = {
  bottomBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
};

type VariableInputFormProps = {
  submit: (queryParams: URLSearchParams) => void;
};

const VariableInputForm: React.FC<VariableInputFormProps> = function ({
  submit,
}) {
  const [expressionIdSequence, setExpressionIdSequence] = useState(0);
  const [expressions, setExpressions] = useState<Expression[]>([]);
  const { register, unregister, setValue, handleSubmit } =
    useForm<{ [id: string]: Expression }>();

  function onSubmit(data: any) {
    const completedExpressions = Object.entries(data).map(([id, value]) => {
      return {
        ...expressions.find((e: Expression) => e.id === parseInt(id)),
        value,
      };
    });
    const queryParams = getQueryParametersFromExpressions(completedExpressions);
    submit(queryParams);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ExpressionTable
        register={register}
        expressions={expressions}
        setValue={setValue}
        onChangeExpression={(expression) =>
          updateValuesList<Expression>(expression, expressions, setExpressions)
        }
        onRemoveExpression={(expression) => {
          removeFromValuesList<Expression>(
            expression,
            expressions,
            setExpressions
          );
          unregister(expression.id.toString());
        }}
      />

      <FormItem sx={sx.bottomBar}>
        <Button type="submit">Search</Button>

        <Button>
          <Add
            onClick={() => {
              setExpressions([
                ...expressions,
                {
                  id: expressionIdSequence,
                  operand: OPERANDS.amount,
                  operator: OPERATORS.equal,
                  value: null,
                },
              ]);
              setExpressionIdSequence(expressionIdSequence + 1);
            }}
          />
        </Button>
      </FormItem>
    </form>
  );
};

export default VariableInputForm;
