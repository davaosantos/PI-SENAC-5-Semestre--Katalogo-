import React, { Component } from 'react';
import Header from '../../components/Header';
import '../../styles/styleListaProdutos.css';
import FiltroPesquisaEstab from '../../components/FiltroPesquisaEstab/FiltroPesquisaEstab';
import { Button } from 'reactstrap';

class ListaEstabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resultados: [],
      showModal: false,
      modalEstabelecimento: null,
    };
  }

  atualizarResultados = (resultados) => {
    console.log(resultados);
    this.setState({ resultados });
  };

  abrirModal = (estabelecimento) => {
    this.setState({ showModal: true, modalEstabelecimento: estabelecimento });
  };

  fecharModal = () => {
    this.setState({ showModal: false, modalEstabelecimento: null });
  };

  render() {
    const { resultados, showModal, modalEstabelecimento } = this.state;

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
                    <img src={`data:image/png;base64,${estabelecimento.imagem}`} className="card-img-top" alt={estabelecimento.nome} />
                    <div className="card-body">
                      <h5 className="card-title">{estabelecimento.nome}</h5>
                      <p className="card-text">
                        <span type="textarea">{estabelecimento.descricao}</span>
                      </p>
                      <Button className="btnDetalhesEstab" onClick={() => this.abrirModal(estabelecimento)}>Detalhes</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {showModal && (
          <div className="custom-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={this.fecharModal}>
            <div className="custom-modal-content">
              <span className="custom-modal-close" onClick={this.fecharModal}>&times;</span>
              <img src={`data:image/png;base64,${modalEstabelecimento.imagem}`} alt={modalEstabelecimento.nome} />
              <h2 id="modal-title">{modalEstabelecimento.nome}</h2>
              <p>{modalEstabelecimento.descricao}</p>
              <p>Código do estabelecimento: {modalEstabelecimento.id}</p>
              {/* Outros detalhes do estabelecimento */}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default ListaEstabs;
