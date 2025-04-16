import React, { useState } from "react";
import styled from "styled-components";
import lupa from "../../../imagens/lupa.png";

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

const BotaoLupa = styled.button`
    position: absolute;
    top: 66%;
    right: 1px;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;

    img {
        width: 20px;
        height: 20px;
    }
`;

const InputPesquisa = () => {
/*    const [valor, setValor] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setValor(e.target.value);
    };

    const handleClick = async () => {
        console.log("Valor pesquisado:", valor);
        const resultado = await buscarLivrosPorTermo(valor);
        console.log(resultado)

        navigate("/pesquisa", { state: { resultado, termo: valor } });
    };
*/
    return (
        <InputContainer>
            <Input
                type="text"
                placeholder="Pesquise o cliente por nome ou CPF"
               /* value={valor}
                onChange={handleChange}
                onKeyDown={(e) => e.key === "Enter" && handleClick()} // Chama handleLogin ao pressionar Enter*/
            />
           {/* <BotaoLupa>
                <img src={lupa} alt="Buscar" />
            </BotaoLupa>*/}
        </InputContainer>
    );
}
export default InputPesquisa;