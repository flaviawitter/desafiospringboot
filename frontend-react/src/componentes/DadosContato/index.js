import React, { useState } from "react";
import styled from "styled-components";
import BotaoExcluir from '../Botoes/BotaoExcluir';
import BotaoEditar from '../Botoes/BotaoEditar';
import axios from 'axios';
import ModalEditarContato from "../ModalEditarContato";
import { useToast } from '../Toast/ToastContext';

const Container = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
  font-family: Bookochi, sans-serif;
  width: 100%;
  padding: 20px;
`;
const ContainerBotao = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  width: 300px;
  padding: 10px;
  cursor: pointer;
`;
const ContainerTexto = styled.div`
  text-align: left;
`;
const Nome = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #000;
  margin: 0;
`;
const Dados = styled.p`
  font-size: 14px;
  color: #999;
  margin: 4px 0;
`;
const CardContato = styled.div`
  display: flex;
  flex-direction: column;
  width: 220px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f8f8f8;
`;

const DadosContato = ({ contatos, setContatos, onClose, clienteId }) => {
  const [contatoSelecionado, setContatoSelecionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const { showToast } = useToast();

  const abrirModal = (contato) => {
    setContatoSelecionado(contato);
    setMostrarModal(true);
  };

  const fecharModal = () => {
    setMostrarModal(false);
    setContatoSelecionado(null);
  };

  const atualizarContato = (contatoAtualizado) => {
    setContatos((prev) =>
      prev.map((c) => (c.codigo === contatoAtualizado.codigo ? contatoAtualizado : c))
    );
  };

  const handleExcluir = async (contatoId) => {
    try {
      await axios.delete(`http://localhost:8080/api/contato/deletarContato/${contatoId}`);
      setContatos((prev) => prev.filter((contato) => contato.codigo !== contatoId));
      showToast('Contato excluído com sucesso!','success');
    } catch (error) {
      showToast('Erro ao excluir contato','error');
    }
  };
  

  return (
    <Container>
      {contatos.map((contato) => (
        <CardContato key={contato.codigo}>
          <ContainerTexto>
            <Nome>{contato.tipo}</Nome>
            <Dados>Valor: {contato.valor}</Dados>
            <Dados>Observação: {contato.observacao}</Dados>
          </ContainerTexto>

          <ContainerBotao>
            <BotaoEditar onClick={() => abrirModal(contato)}>Editar</BotaoEditar>
            <BotaoExcluir onClick={() => handleExcluir(contato.codigo)}>Excluir</BotaoExcluir>
          </ContainerBotao>
        </CardContato>
      ))}

      {mostrarModal && (
        <ModalEditarContato
          contato={contatoSelecionado}
          onClose={fecharModal}
          onSave={atualizarContato}
        />
      )}
    </Container>
  );
};

export default DadosContato;
