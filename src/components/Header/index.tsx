import logoImg from "../../assets/logo.svg";

import { Container, Content } from "./styles";

type HeaderProps = {
  onOpenTransactionModal: () => void;
};

export const Header = ({ onOpenTransactionModal }: HeaderProps) => {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt money" />
        <button type="button" onClick={onOpenTransactionModal}>
          Nova transação
        </button>
      </Content>
    </Container>
  );
};
