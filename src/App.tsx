import { useState } from "react";

import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { NewTransactionModal } from "./components/NewTransactionModal";

import { TransactionsProvider } from "./contexts/TransactionsContext";

import { GlobalStyle } from "./styles/global";

export const App = () => {
  const [isTransactionModalOpen, setTransactionModalOpen] = useState(false);

  const handleTransactionModal = {
    open: () => setTransactionModalOpen(true),
    close: () => setTransactionModalOpen(false),
  };

  return (
    <TransactionsProvider>
      <Header onOpenTransactionModal={handleTransactionModal.open} />
      <Dashboard />
      <NewTransactionModal
        isOpen={isTransactionModalOpen}
        onRequestClose={handleTransactionModal.close}
      />
      <GlobalStyle />
    </TransactionsProvider>
  );
};
