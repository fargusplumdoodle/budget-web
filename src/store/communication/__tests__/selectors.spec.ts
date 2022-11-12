import * as utils from '../utils';
import { selectRequestById, selectRequestByModel } from '../selectors';
import { Transaction } from '../../data/transactions/types';
import { CommunicationState } from '../types';
import generateRequestState from '../__fixtures__/generateRequestState';
import { generateTransaction } from '../../data/transactions/__fixtures__/generateTransaction';
import { RootState } from '../../types';

const getCommunicationState = (
  args: CommunicationState = {},
): Partial<RootState> => ({
  communication: {
    fakeHash: generateRequestState(),
    ...args,
  },
});

describe('communication selectors', () => {
  describe('selectRequestByModel', () => {
    it('should hash transaction without an id', () => {
      const transaction = generateTransaction();
      const state = getCommunicationState();
      const getId = jest.spyOn(utils, 'getId').mockReturnValue('fakeHash');
      const selector = selectRequestByModel<Transaction>(
        'transaction',
        transaction,
      );

      expect(getId).toBeCalledWith('transaction', transaction);
      expect(selector(state as RootState)).toEqual(
        state.communication.fakeHash,
      );
    });

    it('should return undefined if not found', () => {
      jest.spyOn(utils, 'getId').mockReturnValue('doesnt exist');
      const state = getCommunicationState();
      const selector = selectRequestByModel<Transaction>(
        'transaction',
        generateTransaction(),
      );
      expect(selector(state as RootState)).toEqual(undefined);
    });
  });

  describe('selectRequestById', () => {
    it('should select by id id', () => {
      const transaction = generateTransaction({ id: 1 });
      const state = getCommunicationState({
        [transaction.id]: generateRequestState(),
      });

      const selector = selectRequestById('transaction', transaction.id);

      expect(selector(state as RootState)).toEqual(
        state.communication[transaction.id],
      );
    });
  });

  it('should return undefined if not found', () => {
    const state = getCommunicationState();
    const selector = selectRequestById('transaction', 'doesnt exist');
    expect(selector(state as RootState)).toEqual(undefined);
  });
});
