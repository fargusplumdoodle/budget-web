import { Assessment, Functions } from "@mui/icons-material";
import { Box, Button, styled } from "@mui/material";
import { FunctionComponent, useState } from "react";
import ExpressionForm from "../components/forms/ExpressionForm";
import { OPERANDS } from "../components/query/constants/operands";
import { OPERATORS } from "../components/query/constants/operators";
import ExpressionChip from "../components/query/ExpressionChip";
import { Expression } from "../components/query/types";
import { updateValuesList } from "../util/state";

const Container = styled(Box)(() => ({}));

const InputContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
}));

const QueryContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
}));

const ReportInputContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
}));

const QueryView: FunctionComponent = () => {
  const [editExpression, setEditExpression] = useState<Expression<any> | null>(
    null
  );
  const [expressions, setExpressions] = useState<Expression<any>[]>([
    {
      id: 1,
      operand: OPERANDS.amount,
      operator: OPERATORS.greaterThan,
      value: 102.21,
    },
    {
      id: 2,
      operand: OPERANDS.date,
      operator: OPERATORS.greaterThan,
      value: new Date(),
    },
    {
      id: 3,
      operand: OPERANDS.tags,
      operator: OPERATORS.includes,
      value: [{ name: "Rent" }, { name: "Computers" }],
    },
  ]);

  const handleDelete = (expression: Expression<any>) =>
    updateValuesList<Expression<any>>(expression, expressions, setExpressions);

  return (
    <>
      <Container>
        <InputContainer>
          <QueryContainer>
            <Button>
              <Functions />
            </Button>
            {expressions.map((expression: Expression<any>) => (
              <ExpressionChip
                expression={expression}
                onClick={(expression) => setEditExpression(expression)}
                onDelete={handleDelete}
              />
            ))}
          </QueryContainer>
        </InputContainer>
        <ReportInputContainer>
          <Button>
            <Assessment />
          </Button>
        </ReportInputContainer>
      </Container>

      <ExpressionForm
        expression={editExpression}
        onDelete={handleDelete}
        onUpdate={() => alert("edited")}
        cancel={() =>setEditExpression(null)}
      />
    </>
  );
};

export default QueryView;
