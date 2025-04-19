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

function ModalEditarContato({ contato, onClose, onSave }) {
  const [form, setForm] = useState({
    tipo: '',
    valor: '',
    observacao: '',
  });

  const { showToast } = useToast();

  useEffect(() => {
    if (contato) {
      setForm({
        tipo: contato.tipo || '',
        valor: contato.valor || '',
        observacao: contato.observacao || '',
      });
    }
  }, [contato]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSalvar = async () => {
    if (!form.tipo || !form.valor) {
      showToast('Os campos Tipo e Valor devem ser preenchidos', 'alert');
      return;
    }
  
    try {
      const response = await axios.put(
        `http://localhost:8080/api/contato/alterarContato/${contato.codigo}`,
        {
          ...form,
          usuarioModel: { id: contato.usuarioModel?.id || contato.usuarioModel }
        }
      );
      onSave(response.data);
      showToast('Contato atualizado com sucesso!', 'success');
      onClose();
    } catch (error) {
      showToast('Erro ao atualizar contato', 'error');
    }
  };
  

  if (!contato) return null;

  return (
    <Overlay>
      <FormContainer>
        <Titulo>Editar Contato</Titulo>
        <Opcoes>
          <InputWrapper>
            <Input
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              placeholder="Tipo de Contato"
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              name="valor"
              value={form.valor}
              onChange={handleChange}
              placeholder="Valor do Contato"
            />
          </InputWrapper>
          <InputWrapper>
            <Input
              name="observacao"
              value={form.observacao}
              onChange={handleChange}
              placeholder="Observações"
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

export default ModalEditarContato;
