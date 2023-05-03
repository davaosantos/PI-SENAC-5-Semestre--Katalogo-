import React, { Component } from 'react';
import Header from '../../components/Header';
import '../../styles/styleListaProdutos.css';
import FiltroPesquisa from '../../components/FiltroPesquisa/FiltroPesquisa';
import {
  Card, Button, CardImg, CardTitle, CardText, CardGroup,
  CardSubtitle, CardBody, Col, Row
} from 'reactstrap';
import FiltroPesquisaEstab from '../../components/FiltroPesquisaEstab/FiltroPesquisaEstab';


class ListaEstabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resultados: [],
    };
  }

  atualizarResultados = (resultados) => {
    console.log(resultados);
    this.setState({ resultados });
  };

  render() {
    const { resultados } = this.state;

    return (
      <div>
        <div className="lista-estabs">
          <Header />
          <FiltroPesquisaEstab onResultadosAtualizados={this.atualizarResultados} />
          <div className="container bootstrap snipets">
            <h1 className="text-center text-muted">Catálogo de estabelecimentos</h1>
            <div className="row flow-offset-1">
              {resultados.map((estabelecimento) => (
                <div key={estabelecimento.id} className="col-12 col-md-6 col-lg-4 mb-4">
                  <div className="card">
                    <img src={`data:image/png;base64,${estabelecimento.imagem}`} className="card-img-top" alt="" />
                    <div className="card-body">
                      <h5 className="card-title">{estabelecimento.nome}</h5>
                      <p className="card-text">
                        <span type="textarea">{estabelecimento.descricao}</span>
                      </p>
                      <Button className="btnDetalhesEstab">Detalhes</Button>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default ListaEstabs;
