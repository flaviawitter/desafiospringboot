import styled from "styled-components";

const BotaoAdicionar = styled.button`
    display: flex;
    align-items: center;
    flex-direction: row;
    background: transparent;
    border: 2px solid rgb(250, 115, 47);
    color: rgb(250, 115, 47);
    padding: 5px 10px;
    border-radius: 25px;
    font-size: 14px;
    cursor: pointer;
    margin-top: 5px;
    
    &:hover {
        background:rgb(250, 115, 47);
        color:rgb(0, 0, 0);
    }
`;

export default BotaoAdicionar;