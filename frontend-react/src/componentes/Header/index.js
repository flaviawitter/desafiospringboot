
import InputPesquisa from '../Inputs/InputPesquisa'
import styled from 'styled-components'

const HeaderContainer = styled.header`
    background-color: #FFF;
    display: flex;
    align-content: center;
    width: 100%;
    margin-right: 10%;
    margin-left: 10%
`
const Titulo = styled.h2`
    color:rgb(3, 48, 116);
    font-size: 32px;
    text-align: left;
    width: 100%;
`


function Header() {
    return (
        <HeaderContainer>
            <Titulo style={{ fontFamily: "Bookochi", letterSpacing: "0.22em"  }}>Comércio S.A.</Titulo>
            <InputPesquisa />
        </HeaderContainer>
    )
}

export default Header