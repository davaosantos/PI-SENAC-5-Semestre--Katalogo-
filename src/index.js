import React from 'react';
import { createRoot } from 'react-dom';
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
import Relatorio from './pages/relatorio/relatorio';
import FecharPedido from './pages/fecharPedido/fecharPedido';
import Novidades from './pages/novidades/novidades';
import { UserProvider } from './context/userContext';
import PDFViewer from '../src/components/PDFViewer/PDFViewer';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <Switch>
          <Route path='/' exact={true} component={App} />
          <Route path='/login' exact={true} component={Login} />
          <Route path='/listaProdutos'  component={ListaProdutos}/>
          <Route path='/listaEstabs' component={ListaEstabs} />
          <Route path='/cadastroProduto' component={CadastroProdutos} />
          <Route path='/cadastroEstab' component={CadastroEstabs} />
          <Route path='/carrinho' component={Carrinho} />
          <Route path='/relatorio' component={Relatorio} />
          <Route path='/fechar-pedido' component={FecharPedido} />
          <Route path='/novidades' component={Novidades} />
          <Route path="/privacy-policy">
          <PDFViewer pdfUrl="/Politica_de_Privacidade_KATA-LOGO (1).pdf" />
        </Route>
        <Route path="/terms-and-conditions">
          <PDFViewer pdfUrl="/Termos_e_Condicoes_do_Catalogo_de_Produtos_da_FEMSA_KATA_LOGO (1).pdf" />
        </Route>
        </Switch>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
