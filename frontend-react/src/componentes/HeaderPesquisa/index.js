import InputPesquisa from '../Inputs/InputPesquisa'
import styled from 'styled-components'

const HeaderContainer = styled.header`
    background-color: #FFF;
    display: flex;
    justify-content: center;
    align-content: center;
    width: auto;
    margin-right: 10%;
    margin-left: 4%;
`
const Titulo = styled.h2`
    color:rgb(3, 48, 116);
    font-size: 32px;
    text-align: left;
    width: 100%;
`

function Header({ query, onSearch }) {
    return (
        <HeaderContainer>
            <Titulo style={{ fontFamily: "Bookochi", letterSpacing: "0.22em" }}>
                Comércio S.A.
            </Titulo>
            <InputPesquisa query={query} onSearch={onSearch} />
        </HeaderContainer>
    );
}

export default Header;
