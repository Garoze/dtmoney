import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from "../services/api";

type Transaction = {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
};

type TransactionInput = Omit<Transaction, "id" | "createdAt">;

type TransactionsProviderProps = {
  children: ReactNode;
};

type TransactionsContextData = {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
};

export const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export const TransactionsProvider = ({
  children,
}: TransactionsProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api
      .get("transactions")
      .then((response) => setTransactions(response.data.transactions));
  }, []);

  const createTransaction = async (transaction: TransactionInput) => {
    const response = await api.post("/transactions", {
      ...transaction,
      createdAt: new Date(),
    });

    const { transaction: data } = response.data;

    setTransactions((prev) => [...prev, data]);
  };

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
};
