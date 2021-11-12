import { useState } from "react";

import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";

import { GlobalStyle } from "./styles/global";
import { NewTransactionModal } from "./components/NewTransactionModal";

export const App = () => {
  const [isTransactionModalOpen, setTransactionModalOpen] = useState(false);

  const handleTransactionModal = {
    open: () => setTransactionModalOpen(true),
    close: () => setTransactionModalOpen(false),
  };

  return (
    <>
      <Header onOpenTransactionModal={handleTransactionModal.open} />
      <Dashboard />
      <NewTransactionModal
        isOpen={isTransactionModalOpen}
        onRequestClose={handleTransactionModal.close}
      />
      <GlobalStyle />
    </>
  );
};
