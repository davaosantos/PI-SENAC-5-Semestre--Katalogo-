import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Login from './pages/login/login';
import ListaProdutos from './pages/listaProdutos/listaProdutos';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CadastroProdutos from './pages/cadastroProduto/cadastroProdutos';
import CadastroEstabs from './pages/cadastroEstab/cadastroEstab';
import ListaEstabs from './pages/listaEstabs/listaEstabs';
import Carrinho from './pages/carrinho/carrinho';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
      <Route path='/' exact={true} component={App} />
        <Route path='/login' exact={true} component={Login} />
        <Route path='/listaProdutos' component={ListaProdutos} />
        <Route path='/listaEstabs' component={ListaEstabs} />
        <Route path='/cadastroProduto' component={CadastroProdutos} />
        <Route path='/cadastroEstab' component={CadastroEstabs} />
        <Route path='/carrinho' component={Carrinho} />
        
      </Switch>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
