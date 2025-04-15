import React from "react";
import styled from "styled-components";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import dadosFavoritos from "../Favoritos/dadosFavoritos";

const ContainerPrincipal = styled.section`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  font-family: Bookochi, sans-serif;
  width: 100%;
`;

const ContainerLivro = styled.div`
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

const Titulo = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #000;
  margin: 0;
`;

const Autor = styled.p`
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


  return (
    <ContainerPrincipal>
     <ContainerTexto>
              <Titulo>Titulo</Titulo>
              <Autor>por</Autor>
              <Preco>valor</Preco>
            </ContainerTexto>
    </ContainerPrincipal>
  );

export default DadosLivro;