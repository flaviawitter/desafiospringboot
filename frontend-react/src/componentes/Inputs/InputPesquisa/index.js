import React, { useState, useEffect } from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  position: relative;
  width: 300px;
`;

const Input = styled.input`
  background: transparent;
  border: 1px solid rgb(3, 48, 116);
  padding: 10px 10px 10px 35px;
  border-radius: 25px;
  width: 280px;
  height: 7.5px;
  color: rgb(3, 48, 116);
  font-size: 12px;
  margin-bottom: 10px;
  margin-top: 30px;

  &::placeholder {
    color: rgb(3, 48, 116);
    font-size: 10px;
  }
`;

const InputPesquisa = ({ query, onSearch }) => {
    const [valorInput, setValorInput] = useState(query);
  
    // Atualiza o valorInput sempre que o 'query' mudar no componente pai
    useEffect(() => {
      setValorInput(query);
    }, [query]);
  
    const handleChange = (e) => {
      const valor = e.target.value;
      setValorInput(valor); // Atualiza o valor local
      if (valor.length > 0 || valor.length === 0) {
        onSearch(valor); // Chama a função de busca com o valor atual
      }
    };
  
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        onSearch(valorInput); // Chama a busca ao pressionar Enter
      }
    };
  
    return (
      <InputContainer>
        <Input
          type="text"
          placeholder="Pesquise o cliente por nome ou CPF"
          value={valorInput}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      </InputContainer>
    );
  };
  

export default InputPesquisa;
