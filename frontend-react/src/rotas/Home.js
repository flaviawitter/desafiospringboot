
import styled from 'styled-components'
import Header from '../componentes/Header';
import PagPrincipal from '../componentes/PagPrincipal';

const AppContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #ffffff; 
`

function App() {
  return (
    <AppContainer>
      <Header />
      <PagPrincipal />
    </AppContainer>
  );
}

export default App