import * as React from 'react';
import { Add, Clear } from '@mui/icons-material';
import {
  Box, IconButton, styled, Typography,
} from '@mui/material';
import { useState } from 'react';
import ExpressionForm from './ExpressionForm';
import { OPERANDS } from './constants/operands';
import { OPERATORS } from './constants/operators';
import ExpressionChip from './ExpressionChip';
import { Expression } from './types';
import { removeFromValuesList, updateValuesList } from '../../util/state';

const Container = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing(1),
}));

const TitleContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
}));

const QueryContainer = styled(Box)(({ theme: { spacing } }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: spacing(1),
}));

const Title = styled(Typography)(() => ({}));

export interface QueryFormProps {
  expressions: Expression<any>[];
  onChangeExpressions: (expressions: Expression<any>[]) => void;
  showReports?: boolean;
}

export default function QueryForm({
  expressions,
  onChangeExpressions,
  showReports,
}: QueryFormProps) {
  const [editExpression, setEditExpression] = useState<Expression<any> | null>(
    null,
  );

  const handleAddExpression = () => {
    const expression = {
      id: expressions.length + 1,
      operand: OPERANDS.amount,
      operator: OPERATORS.greaterThan,
      value: 0,
    };
    onChangeExpressions([...expressions, expression]);
    setEditExpression(expression);
  };

  const handleDeleteExpression = (expression: Expression<any>) => {
    removeFromValuesList<Expression<any>>(
      expression,
      expressions,
      onChangeExpressions,
    );
    setEditExpression(null);
  };

  const handleUpdateExpression = (expression: Expression<any>) => {
    updateValuesList<Expression<any>>(
      expression,
      expressions,
      onChangeExpressions,
    );
    setEditExpression(null);
  };

  return (
    <>
      <Container>
        <TitleContainer>
          <Title variant="h6">Expressions</Title>
          <Box>
            <IconButton onClick={() => onChangeExpressions([])}>
              <Clear />
            </IconButton>
            <IconButton onClick={handleAddExpression}>
              <Add />
            </IconButton>
          </Box>
        </TitleContainer>
        <QueryContainer>
          {expressions.map((expression: Expression<any>) => (
            <ExpressionChip
              key={expression.id}
              expression={expression}
              onClick={(expression: Expression<any>) => setEditExpression(expression)}
              onDelete={handleDeleteExpression}
            />
          ))}
        </QueryContainer>
        {showReports && (
          <TitleContainer>
            <Title variant="h6">Reports</Title>
            <IconButton onClick={() => null}>
              <Add />
            </IconButton>
          </TitleContainer>
        )}
      </Container>

      {editExpression && (
        <ExpressionForm
          open
          expression={editExpression}
          onDelete={handleDeleteExpression}
          onUpdate={handleUpdateExpression}
          cancel={() => setEditExpression(null)}
        />
      )}
    </>
  );
}
