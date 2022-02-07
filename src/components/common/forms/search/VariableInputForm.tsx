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
import { QueryParameters } from "../../../../api/types";
import { getQueryParametersFromExpressions } from "../../../../api/util";

const sx = {
  bottomBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
};

type VariableInputFormProps = {
  submit: (queryParams: QueryParameters) => void;
};

const VariableInputForm: React.FC<VariableInputFormProps> = function ({
  submit,
}) {
  const [expressionIdSequence, setExpressionIdSequence] = useState(0);
  const [expressions, setExpressions] = useState<Expression[]>([]);
  const { register, handleSubmit } = useForm<{ [id: string]: any }>();

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
