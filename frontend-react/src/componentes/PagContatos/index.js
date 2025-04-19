import styled from 'styled-components';
import { useState, useEffect } from 'react';
import DadosContato from '../DadosContato';
import BotaoAdicionar from '../Botoes/BotaoAdicionar';
import BotaoEditar from '../Botoes/BotaoEditar';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import ModalCadastrarContato from '../ModalCadastrarContato';
import Header from '../Header';
import { useToast } from '../Toast/ToastContext';

const Container = styled.section`
  color: #FFF;
  text-align: center;
  height: 470px;
  width: 100%;
  margin: 25px;
`;
const ContainerBotao = styled.section`
  color: #FFF;
  display: flex;
  flex-direction: row;
  text-align: center;
  gap: 20px;
  height: auto;
  width: 100%;
  margin: 25px;
`;
const ContainerCabecalho = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #FFF;
  text-align: center;
  height: auto;
  width: 152%;
  margin-right: 5%;
  margin-left: 2%
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

function PagContatos() {
  const [cliente, setCliente] = useState(null);
  const [contatos, setContatos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);

  const navigate = useNavigate();
  const { clienteid } = useParams();

  const { showToast } = useToast();

  useEffect(() => {
    if (clienteid) {
      axios.get(`http://localhost:8080/api/cliente/usuario/${clienteid}`)
        .then(response => setCliente(response.data))
        .catch(error => console.error("Erro ao carregar cliente:", error));
  
      axios.get(`http://localhost:8080/api/contato/listarContatosDoUsuario/${clienteid}`)
          .then(response => setContatos(response.data))
          .catch(error => console.error("Erro ao carregar contatos:", error));
    }
  }, [clienteid]);

  const irParaHome = () => {
    navigate(`/`);
  };

  const abrirCadastro = () => {
    setClienteEditando(null);
    setMostrarModal(true);
  };

  const abrirModal = () => {
    setMostrarModal(true);
  };

  const fecharModal = () => {
    setMostrarModal(false);
  };

  const handleContatoSalvo = () => {
    if (clienteid) {
      axios.get(`http://localhost:8080/api/contato/listarContatosDoUsuario/${clienteid}`)
        .then(response => setContatos(response.data));
    }
    fecharModal();
  };

  return (
    <Container>
      <Header />
      <ContainerCabecalho>
        <Titulo>Contatos de {cliente?.nome}</Titulo>
        <ContainerBotao>
          <BotaoAdicionar onClick={abrirCadastro}>+Contato</BotaoAdicionar>
          <BotaoEditar onClick={irParaHome}>Voltar</BotaoEditar>
        </ContainerBotao>
      </ContainerCabecalho>
      <ContainerDados>
        <DadosContato
          contatos={contatos}
          setContatos={setContatos}
          clienteId={clienteid}
          onClose={fecharModal}
        />
      </ContainerDados>

      {mostrarModal && (
        <ModalCadastrarContato
          cliente={clienteEditando}
          onClose={fecharModal}
          onSave={handleContatoSalvo}
          contatos={contatos}
          setContatos={setContatos}
          clienteId={clienteid}
        />
      )}
    </Container>
  );
}

export default PagContatos;
