import React, { useState } from "react";
import styled from "styled-components";
import BotaoSimples from '../Botoes/BotaoSimples';
import BotaoExcluir from '../Botoes/BotaoExcluir';
import BotaoEditar from '../Botoes/BotaoEditar';
import ModalEditar from '../ModalEditar';
import DadosContato from '../DadosContato';
import axios from 'axios';
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";
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
const CardCliente = styled.div`
  display: flex;
  flex-direction: column;
  width: 226px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px; 
  background-color: #f8f8f8;
`;
const ContainerBotao = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 10px 0 0;
`;

const DadosCliente = ({ clientes, setClientes }) => {
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [mostrarModalUsuario, setMostrarModalUsuario] = useState(false);

  const [mostrarContatos, setMostrarContatos] = useState(false);
  const [clienteIdSelecionado, setClienteIdSelecionado] = useState(null);
  const [contatos, setContatos] = useState([]);

  const navigate = useNavigate();

  const { showToast } = useToast();

  const abrirModalUsuario = (cliente) => {
    setClienteSelecionado(cliente);
    setMostrarModalUsuario(true);
  };

  const fecharModalUsuario = () => {
    setMostrarModalUsuario(false);
    setClienteSelecionado(null);
  };

  const atualizarCliente = (clienteAtualizado) => {
    setClientes((prev) =>
      prev.map((c) => (c.id === clienteAtualizado.id ? clienteAtualizado : c))
    );
  };

  const handleExcluir = async (clienteId) => {
    try {
      await axios.delete(`http://localhost:8080/api/cliente/deletarCliente/${clienteId}`);
      setClientes((prev) => prev.filter((cliente) => cliente.id !== clienteId));
      showToast('Cliente excluído com sucesso!', 'success');
    } catch (error) {
      showToast('Erro ao excluir cliente', 'error');
    }
  };

  const formatarData = (data) => {
    const dateObj = new Date(data);
    return !isNaN(dateObj) ? format(dateObj, 'dd/MM/yyyy') : 'Data inválida';
  };

  const irParaContato = (clienteId) => {
    navigate(`/contatos/${clienteId}`);
  };


  return (
    <Container>
      {clientes.map((cliente) => (
        <CardCliente key={cliente.id}>
          <ContainerTexto>
            <Nome>{cliente.nome}</Nome>
            <Dados>CPF: {cliente.cpf}</Dados>
            <Dados>Data de Nascimento: {formatarData(cliente.dataNascimento)}</Dados>
            <Dados>Endereço: {cliente.endereco}</Dados>
            <BotaoSimples onClick={() => irParaContato(cliente.id)}>Visualizar contatos</BotaoSimples>
          </ContainerTexto>

          <ContainerBotao>
            <BotaoEditar onClick={() => abrirModalUsuario(cliente)}>Editar</BotaoEditar>
            <BotaoExcluir onClick={() => handleExcluir(cliente.id)}>Excluir</BotaoExcluir>
          </ContainerBotao>
        </CardCliente>
      ))}

      {mostrarModalUsuario && (
        <ModalEditar
          cliente={clienteSelecionado}
          onClose={fecharModalUsuario}
          onSave={atualizarCliente}
        />
      )}

      {mostrarContatos && (
        <DadosContato
          contatos={contatos}
          setContatos={setContatos}
          onClose={() => setMostrarContatos(false)}
          clienteId={clienteIdSelecionado}
        />
      )}
    </Container>
  );
};

export default DadosCliente;
