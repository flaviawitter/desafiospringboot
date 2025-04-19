import styled from 'styled-components';
import { useState, useEffect } from 'react';
import DadosCliente from '../DadosCliente';
import BotaoAdicionar from '../Botoes/BotaoAdicionar';
import ModalCadastrar from '../ModalCadastrar';
import axios from 'axios';
import Header from '../HeaderPesquisa'
import { useToast } from '../Toast/ToastContext';

const Container = styled.section`
  color: #FFF;
  text-align: center;
  height: 470px;
  width: 100%;
  margin: 25px;
`;
const ContainerCabecalho = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #FFF;
  text-align: center;
  height: auto;
  width: 88%;
  margin: 25px;
`;
const ContainerDados = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #FFF;
  text-align: center;
  height: auto;
  width: 95%;
  margin-right: 5%;
  margin-left: 5%
`;
const Titulo = styled.h2`
  color: rgb(3, 48, 116);
  font-size: 20px;
  text-align: left;
  width: 100%;
  font-family: Bookochi; 
  letter-spacing: 0.22em;
`;

function PagPrincipal() {
  const [clientes, setClientes] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);
  const [query, setQuery] = useState('');

  const { showToast } = useToast();

  useEffect(() => {
    carregarClientes();
  }, []);

  const carregarClientes = () => {
    axios.get('http://localhost:8080/api/cliente/listarClientes')
      .then(response => setClientes(response.data))
      .catch(error => console.error("Erro ao carregar clientes:", error));
  };

  const abrirCadastro = () => {
    setClienteEditando(null);
    setMostrarModal(true);
  };

  const fecharModal = () => {
    setMostrarModal(false);
  };

  const handleClienteSalvo = () => {
    carregarClientes(); 
    fecharModal();
  };

  const handleSearch = async (valor) => {
    setQuery(valor);
    try {
      const response = await fetch(`http://localhost:8080/api/cliente/pesquisar?nomeCpf=${encodeURIComponent(valor)}`);
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      showToast('Erro ao buscar clientes', 'error');
    }
  };

  return (
    <Container>
       <Header query={query} onSearch={handleSearch} />
      <ContainerCabecalho>
        <Titulo>CLIENTES CADASTRADOS</Titulo>
        <BotaoAdicionar onClick={abrirCadastro}>+Cliente</BotaoAdicionar>
      </ContainerCabecalho>
      <ContainerDados>
      <DadosCliente clientes={clientes} setClientes={setClientes} />
      </ContainerDados>


      {mostrarModal && (
        <ModalCadastrar
          cliente={clienteEditando}
          onClose={fecharModal}
          onSave={handleClienteSalvo}
        />
      )}
    </Container>
  );
}

export default PagPrincipal;
