import styled from 'styled-components'
import DadosCliente from '../DadosCliente'

const NovidadesContainer = styled.section`
    color: #FFF;
    text-align: center;
    height: 470px;
    width: 100%;
    margin: 25px;
`

const Titulo = styled.h2`
    color: rgb(3, 48, 116);
    font-size: 32px;
    text-align: left;
    width: 100%;
`

const Resultado = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    cursor: pointer;

    p {
        width: 200px;
    }

    img {
        width: 100px;
    }

    &:hover {
        border: 1px solid white;
    }
`

function PagPrincipal() {
  
    return (
        <NovidadesContainer>
            <Titulo style={{ fontFamily: "Bookochi", letterSpacing: "0.22em"  }}>CLIENTES CADASTRADOS</Titulo>
            <DadosCliente />
        </NovidadesContainer>
    );
}

export default PagPrincipal;