import { create } from 'zustand';

export interface Transaction {
  id: string;
  date: Date;
  amount: number;
  last4: string;
  status: 'success' | 'failed';
  bin: string;
}

interface TransactionState {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [
        {
          ...transaction,
          id: crypto.randomUUID(),
          date: new Date(),
        },
        ...state.transactions,
      ],
    })),
}));