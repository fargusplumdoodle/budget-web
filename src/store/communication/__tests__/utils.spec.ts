import { getId } from '../utils';
import { getTransactionHash } from '../../data/transactions/utils';
import { generateTransaction } from '../../data/transactions/__fixtures__/generateTransaction';

describe('getId', () => {
  it('should use id if it exists', () => {
    expect(getId('transaction', { id: 1 })).toBe(1);
  });

  it('should use hash transaction', () => {
    const transaction = generateTransaction({ id: null });
    const hash = getTransactionHash(transaction);
    expect(getId('transaction', transaction)).toBe(hash);
  });
});