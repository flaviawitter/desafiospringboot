import Input from '../Inputs/Input';
import styled from 'styled-components';
import BotaoEditar from '../Botoes/BotaoEditar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '../Toast/ToastContext';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const FormContainer = styled.section`
  background: white;
  padding: 25px 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  color: #000;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Titulo = styled.h2`
  color: rgb(3, 48, 116);
  font-size: 20px;
  margin-bottom: 15px;
  font-family: 'Bookochi';
`;
const Opcoes = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  align-items: center;
`;
const InputWrapper = styled.div`
  width: 100%;
  max-width: 400px;
`;
const Botoes = styled.div`
  margin-top: 18px;
  display: flex;
  justify-content: center;
  gap: 15px;
`;

function ModalEditar({ cliente, onClose, onSave }) {
  const [form, setForm] = useState({
    nome: '',
    dataNascimento: '',
    endereco: '',
  });

  const { showToast } = useToast();
  
  useEffect(() => {
    if (cliente) {
      setForm({
        nome: cliente.nome || '',
        dataNascimento: cliente.dataNascimento || '',
        endereco: cliente.endereco || '',
      });
    }
  }, [cliente]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSalvar = async () => {
    if (!form.nome) {
      showToast('O campo Nome deve ser preenchido', 'alert');
      return;
    }
  
    if (form.dataNascimento) {
      const dataNascimento = new Date(form.dataNascimento);
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0); 
  
      if (dataNascimento > hoje) {
        showToast('A data de nascimento não pode ser no futuro', 'alert');
        return;
      }
    }
  
    try {
      const response = await axios.put(
        `http://localhost:8080/api/cliente/alterarCliente/${cliente.id}`,
        {
          ...cliente,
          ...form,
        }
      );
      onSave(response.data);
      showToast('Cliente atualizado com sucesso!', 'success');
      onClose();
    } catch (error) {
      showToast('Erro ao atualizar cliente. Verifique os dados enviados', 'error');
    }
  };
  

  if (!cliente) return null;

  return (
    <Overlay>
      <FormContainer>
        <Titulo>Editar Cliente</Titulo>
        <Opcoes>
          <InputWrapper>
            <Input
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Nome"
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              name="dataNascimento"
              value={form.dataNascimento}
              onChange={handleChange}
              placeholder="Data de Nascimento"
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              name="endereco"
              value={form.endereco}
              onChange={handleChange}
              placeholder="Endereço"
            />
          </InputWrapper>
        </Opcoes>
        <Botoes>
          <BotaoEditar onClick={handleSalvar}>Salvar</BotaoEditar>
          <BotaoEditar onClick={onClose}>Cancelar</BotaoEditar>
        </Botoes>
      </FormContainer>
    </Overlay>
  );
}

export default ModalEditar;
