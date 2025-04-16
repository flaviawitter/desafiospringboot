import styled from "styled-components";

const BotaoCinza = styled.button`
    background: transparent;
    border: 2px solid rgb(163, 159, 157);
    color: rgb(163, 159, 157);
    padding: 5px 10px;
    border-radius: 25px;
    font-size: 14px;
    cursor: pointer;
    margin-top: 5px;
    
    &:hover {
        background:rgb(163, 159, 157);
        color:rgb(0, 0, 0);
    }
`;

export default BotaoCinza;