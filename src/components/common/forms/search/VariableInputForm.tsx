import { Button } from "@mui/material";
import { FormItem } from "../../../../util/form";
import * as React from "react";
import { useForm } from "react-hook-form";
import ExpressionTable from "./ExpressionTable";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import { Expression } from "./types";
import { OPERANDS, OPERATORS } from "./constants";
import { removeFromValuesList, updateValuesList } from "../../../../util/state";

const sx = {
  bottomBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "space-between",
  },
};

type VariableInputForm = {};

const VariableInputForm: React.FC<VariableInputForm> = function ({}) {
  const [expressionIdSequence, setExpressionIdSequence] = useState(0);
  const [expressions, setExpressions] = useState<Expression[]>([
    { id: 100, operand: OPERANDS.amount, operator: OPERATORS.equal, value: 3 },
    {
      id: 200,
      operand: OPERANDS.budget__balance,
      operator: OPERATORS.equal,
      value: 3,
    },
    {
      id: 300,
      operand: OPERANDS.description,
      operator: OPERATORS.icontains,
      value: "",
    },
  ]);
  const { register, handleSubmit } = useForm();
  function onSubmit(data) {
    const completedExpressions = Object.entries(data).map(([id, value]) => {
      return {
        ...expressions.find((e: Expression) => e.id === parseInt(id)),
        value,
      };
    });
    console.log(completedExpressions);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ExpressionTable
        register={register}
        expressions={expressions}
        onChangeExpression={(expression) =>
          updateValuesList<Expression>(expression, expressions, setExpressions)
        }
        onRemoveExpression={(expression) =>
          removeFromValuesList<Expression>(
            expression,
            expressions,
            setExpressions
          )
        }
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
