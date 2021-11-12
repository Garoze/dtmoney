import Modal from "react-modal";

import { FormEvent, useState } from "react";

import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";

import { api } from "../../services/api";

import { Container, TransactionTypeContainer, RadioBox } from "./styles";

type NewTransactionModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
};

Modal.setAppElement("#root");

export const NewTransactionModal = ({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) => {
  const [type, setType] = useState<"deposit" | "withdraw">("deposit");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [value, setValue] = useState(0);

  const handleCreateTrasaction = (e: FormEvent) => {
    e.preventDefault();

    const data = {
      title,
      value,
      category,
      type,
    };

    api.post("/transactions", data);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateTrasaction}>
        <h2>Cadastrar transação</h2>
        <input
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Valor"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setType("deposit")}
            isActive={type === "deposit"}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => setType("withdraw")}
            isActive={type === "withdraw"}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
};
