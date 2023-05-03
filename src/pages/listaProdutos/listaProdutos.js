import React, { Component } from 'react';
import Header from '../../components/Header';
import '../../styles/styleListaProdutos.css';
import FiltroPesquisa from '../../components/FiltroPesquisa/FiltroPesquisa';
import {
  Card, Button, CardImg, CardTitle, CardText, CardGroup,
  CardSubtitle, CardBody, Col, Row, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { FaShoppingBasket, IconName } from "react-icons/fa";

class ListaProdutos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resultados: [],
      carrinho: [],
      exibirModal: false
    };
  }

  atualizarResultados = (resultados) => {
    console.log(resultados);
    this.setState({ resultados });
  };

  adicionarProduto = (produto) => {
    const produtoJaNoCarrinho = this.state.carrinho.some(p => p.id === produto.id);
    if (produtoJaNoCarrinho) {
      console.warn('Produto já está no carrinho');
      return;
    }

    const novoProduto = {
      ...produto,
      id: produto.id // adicione o ID do produto ao objeto
    };

    const novoCarrinho = [...this.state.carrinho, novoProduto];
    this.setState({
      carrinho: novoCarrinho
    });
  }

  removerProduto = (produto) => {
    const novoCarrinho = this.state.carrinho.filter((p) => p.id !== produto.id);
    this.setState({
      carrinho: novoCarrinho
    });
  }

  toggleModal = () => {
    this.setState({
      exibirModal: !this.state.exibirModal
    });
  }

  render() {
    const { resultados, carrinho, exibirModal } = this.state;

    return (
      <div>
        <div className="lista-produtos">
          <Header />
          <FiltroPesquisa onResultadosAtualizados={this.atualizarResultados} />
          <div className="container bootstrap snipets">
            <h1 className="text-center text-muted">Catálogo de produtos</h1>
            <div className="row flow-offset-1">
              {resultados.map((produto) => (
                <div key={produto.id} className="col-12 col-md-6 col-lg-4 mb-4">
                <div className="card h-100">
                  <img src={`data:image/png;base64,${produto.imagem}`} className="card-img-top" alt="" />
                  <div className="card-body d-flex flex-column h-100">
                    <h5 className="card-title">{produto.nome}</h5>
                    <p className="card-text">
                      <span className="card-subtitle mb-2 text-muted">{produto.categoria}</span>
                      {produto.descricao}
                    </p>
                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <div className="preco">R${produto.preco}</div>
                      <Button className="btn-adicionar" onClick={() => this.adicionarProduto(produto)}>Adicionar</Button>
                    </div>
                  </div>
                </div>
              </div>
              ))}
            </div>
          </div>
        </div>
        <div className="carrinho">
          <Button className="btnVerCarrinho" onClick={this.toggleModal}><FaShoppingBasket ></FaShoppingBasket></Button>
          <Modal isOpen={exibirModal} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Carrinho</ModalHeader>
            <ModalBody>
              {carrinho.map((produto) => (
                <div key={produto.id}>
                  <p>{produto.nome}</p>
                  <Button onClick={() => this.removerProduto(produto)}>Remover</Button>
                </div>
              ))}
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggleModal}>Fechar</Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

export default ListaProdutos;