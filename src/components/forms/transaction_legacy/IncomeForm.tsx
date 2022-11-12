import { Button, CircularProgress, Stack } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { withSnackbar } from 'notistack';
import { FormItem, incomeSchema } from '../../../util/form';
import ApiErrorDialog, { ApiError } from '../../ApiErrorDialog';
import ControlledAmountInput from '../inputs/ControlledAmountInput';
import ControlledDescriptionInput from '../inputs/ControlledDescriptionInput';
import ControlledDateInput from '../inputs/ControlledDateInput';

export interface IncomeFormData {
  amount: number;
  description: string;
  date: Date;
}

function IncomeForm() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<ApiError | null>(null);

  const defaultValues = {
    amount: 0,
    description: '',
    date: new Date(),
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(incomeSchema),
    defaultValues,
  });

  const onSubmit = (data: IncomeFormData): void => {
    // setLoading(true);
    // const transactions = createIncomeTransactions({
    //   ...data,
    //   amount: Math.abs(data.amount),
    // });
    // const createTransactionPromises: Promise<Transaction>[] = transactions.map(
    //   (transaction: Transaction) => {
    //     return api.transaction.createTransaction(transaction);
    //   }
    // );
    //
    // Promise.allSettled(createTransactionPromises)
    //   .then((promiseStates: PromiseSettledResult<Transaction>[]) => {
    //     setLoading(false);
    //     props.enqueueSnackbar(`Successfully created income transactions`, {
    //       variant: "success",
    //     });
    //     props.onCreateTransactions(
    //       promiseStates
    //         .filter((p) => p.status === "fulfilled")
    //         // @ts-ignore
    //         .map((promise) => promise.value)
    //     );
    //   })
    //   .catch((err) => {
    //     setLoading(false);
    //     setApiError(err);
    //   });
    alert('TODO');
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
          <FormItem
            sx={{
              display: 'flex',
            }}
          >
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
            <ControlledDateInput
              name="date"
              control={control}
              sx={{ width: '100%' }}
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
}

export default withSnackbar(IncomeForm);
