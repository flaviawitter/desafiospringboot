import Input from '../Inputs/Input';
import styled from 'styled-components';
import BotaoEditar from '../Botoes/BotaoEditar';
import { useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
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

function ModalCadastrar({ onClose, onSave }) {
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    dataNascimento: '',
    endereco: ''
  });

  const [isSaving, setIsSaving] = useState(false);
  const { showToast } = useToast();

  const handleSalvar = async () => {
    if (!form.nome || !form.cpf) {
      showToast('Os campos Nome e CPF devem ser preenchidos', 'alert');
      return;
    }

    if (form.dataNascimento) {
      const dataNascimento = new Date(form.dataNascimento);
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0); // Remove horas para comparação precisa
  
      
      if (dataNascimento > hoje) {
        showToast('A data de nascimento não pode ser no futuro', 'alert');
        return;
      }
    }
  
    try {
      const parsedDate = new Date(form.dataNascimento);
  
      if (isNaN(parsedDate.getTime())) {
        showToast('Data inválida', 'alert');
        return;
      }
  
      setIsSaving(true);
  
      const payload = {
        ...form,
        dataNascimento: form.dataNascimento, // já está no formato yyyy-MM-dd
        dataCadastro: format(new Date(), 'yyyy-MM-dd')
      };
  
      if (!form.dataNascimento) {
        delete payload.dataNascimento;
      }
      
      const response = await axios.post(
        `http://localhost:8080/api/cliente/cadastrarCliente`,
        payload
      );
  
      onSave(response.data);
      showToast('Cliente cadastrado com sucesso!', 'success');
      onClose();
    } catch (error) {
      showToast('CFP já cadastrado', 'error');
    } finally {
      setIsSaving(false);
    }
  };  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Overlay>
      <FormContainer>
        <Titulo>Cadastrar Cliente</Titulo>
        <Opcoes>
          <InputWrapper>
            <Input name="cpf" value={form.cpf} onChange={handleChange} placeholder="CPF" />
          </InputWrapper>
          <InputWrapper>
            <Input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome" />
          </InputWrapper>
          <InputWrapper>
            <Input
              name="dataNascimento"
              value={form.dataNascimento}
              onChange={handleChange}
              placeholder="Data de Nascimento"
              type="date"
            />
          </InputWrapper>
          <InputWrapper>
            <Input name="endereco" value={form.endereco} onChange={handleChange} placeholder="Endereço" />
          </InputWrapper>
        </Opcoes>
        <Botoes>
          <BotaoEditar onClick={handleSalvar} disabled={isSaving}>
            {isSaving ? 'Salvando...' : 'Salvar'}
          </BotaoEditar>
          <BotaoEditar onClick={onClose}>Cancelar</BotaoEditar>
        </Botoes>
      </FormContainer>
    </Overlay>
  );
}

export default ModalCadastrar;
