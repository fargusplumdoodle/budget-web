import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { Button, CircularProgress, Stack } from '@mui/material';
import { ProviderContext, withSnackbar } from 'notistack';
import { FormItem, transferSchema } from '../../../util/form';
import ApiErrorDialog, { ApiError } from '../../ApiErrorDialog';
import { createTransaction } from '../../../api/endpoints/transaction';
import { createTransferTransactions } from '../../../util/transfer';
import ControlledAmountInput from '../inputs/ControlledAmountInput';
import ControlledBudgetInput from '../inputs/ControlledBudgetInput';
import { InputErrorMessage } from '../types';
import ControlledDescriptionInput from '../inputs/ControlledDescriptionInput';
import { Transaction, Budget, selectBudgetList } from '../../../store';

interface Props extends ProviderContext {
  onCreateCallback: (transactions: Transaction[]) => void;
}

export interface TransferFormData {
  amount: number;
  description: string;
  date: Date;
  fromBudget: Budget;
  toBudget: Budget;
}

const TransferForm: FunctionComponent<Props> = (props) => {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<ApiError | null>(null);
  const budgets = useSelector(selectBudgetList);

  const defaultValues = {
    amount: 0,
    description: '',
    date: new Date(),
    fromBudget: budgets[0],
    toBudget: budgets[1],
  };

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(transferSchema),
    defaultValues,
  });

  const onSubmit = (data: TransferFormData) => {
    setLoading(true);
    const transactions = createTransferTransactions({
      ...data,
      amount: 0 - Math.abs(data.amount),
    });
    const createTransactionPromises: Promise<Transaction>[] = transactions.map(
      (transaction: Transaction) => createTransaction(transaction),
    );

    Promise.allSettled(createTransactionPromises)
      .then((promiseStates: PromiseSettledResult<Transaction>[]): void => {
        setLoading(false);
        props.enqueueSnackbar('Successfully created income transactions', {
          variant: 'success',
        });
        props.onCreateCallback(
          promiseStates
            .filter((p) => p.status === 'fulfilled')
            // @ts-ignore
            .map((promise) => promise.value),
        );
      })
      .catch((err) => {
        setLoading(false);
        setApiError(err);
      });
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack
          spacing={2}
          justifyContent="flex-start"
          alignItems="stretch"
          sx={{
            maxWidth: '615px',
          }}
        >
          <FormItem>
            <ControlledAmountInput
              name="amount"
              control={control}
              errors={errors.amount}
              showError
              sx={{ width: '100%', marginRight: 1 }}
            />
          </FormItem>

          <FormItem>
            <ControlledDescriptionInput
              name="description"
              control={control}
              errors={errors.description}
            />
          </FormItem>

          <FormItem>
            <ControlledBudgetInput<TransferFormData>
              name="fromBudget"
              control={control}
              getValues={getValues}
              defaultValue={budgets[0]}
              options={budgets.filter((b) => b.id !== getValues('toBudget').id)}
              errors={errors.fromBudget as InputErrorMessage}
            />
          </FormItem>

          <FormItem>
            <ControlledBudgetInput<TransferFormData>
              name="toBudget"
              control={control}
              getValues={getValues}
              defaultValue={budgets[1]}
              options={budgets.filter(
                (b) => b.id !== getValues('fromBudget').id,
              )}
              errors={errors.toBudget as InputErrorMessage}
            />
          </FormItem>

          <Button sx={{ width: '100%' }} type="submit" disabled={loading}>
            {loading ? <CircularProgress /> : 'SUBMIT'}
          </Button>
        </Stack>
      </form>

      <ApiErrorDialog
        error={apiError}
        onClose={() => {
          setApiError(null);
        }}
      />
    </>
  );
};

export default withSnackbar(TransferForm);
