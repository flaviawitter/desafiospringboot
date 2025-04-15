
import InputPesquisa from '../Inputs/InputPesquisa'
import styled from 'styled-components'

const HeaderContainer = styled.header`
    background-color: #FFF;
    display: flex;
    align-content: center;
    justify-content: space-evenly;
    width: 100%;

`

function Header() {
    return (
        <HeaderContainer>
            <InputPesquisa />
        </HeaderContainer>
    )
}

export default Header