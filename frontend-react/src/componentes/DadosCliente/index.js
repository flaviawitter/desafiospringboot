import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BotaoSimples from '../Botoes/BotaoSimples';
import BotaoExcluir from '../Botoes/BotaoExcluir';
import BotaoEditar from '../Botoes/BotaoEditar';
import axios from 'axios';

const ContainerPrincipal = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0;
  flex-wrap: wrap;
  justify-content: center;
  font-family: Bookochi, sans-serif;
  width: 100%;
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

const Preco = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin: 4px 0;
`;

const DadosCliente = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/clientes')
      .then(response => {
        setClientes(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar clientes:', error);
      });
  }, []);

  return (
    <ContainerPrincipal>
      {clientes.map(cliente => (
        <ContainerTexto key={cliente.id}>
          <Nome>{cliente.nome}</Nome>
          <Dados>CPF: {cliente.cpf}</Dados>
          <Dados>Data de Nascimento: {cliente.dataCadastro}</Dados>
          {/*<Dados>Endereço: {cliente.endereco}</Dados>
          <BotaoSimples>Visualizar contatos</BotaoSimples>*/}

          <ContainerBotao>
            <BotaoEditar>Editar</BotaoEditar>
            <BotaoExcluir>Excluir</BotaoExcluir>
          </ContainerBotao>
        </ContainerTexto>
      ))}
    </ContainerPrincipal>
  );
};

export default DadosCliente;
