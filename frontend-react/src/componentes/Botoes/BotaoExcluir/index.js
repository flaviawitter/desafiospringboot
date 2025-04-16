import styled from "styled-components";

const BotaoCinza = styled.button`
    background: transparent;
    border: 2px solid rgb(167, 47, 0);
    color: rgb(167, 47, 0);
    padding: 5px 10px;
    border-radius: 25px;
    font-size: 14px;
    cursor: pointer;
    margin-top: 5px;
    
    &:hover {
        background:rgb(167, 47, 0);
        color:rgb(255, 255, 255);
    }
`;

export default BotaoCinza;