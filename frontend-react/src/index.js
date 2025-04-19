import React from 'react';
import ReactDOM from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './componentes/PagPrincipal/index';
import Contatos from './componentes/PagContatos/index';
import { ToastProvider } from '../src/componentes/Toast/ToastContext';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    width: 100vw;
    max-width: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  li {
    list-style: none;    
  }


`

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <ToastProvider>
    <GlobalStyle />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contatos/:clienteid' element={<Contatos />} />
      </Routes>
    </BrowserRouter>
    </ToastProvider>
  </>
);


