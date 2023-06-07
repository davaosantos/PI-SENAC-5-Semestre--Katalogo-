import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../../components/Header';
import '../../styles/styleListaProdutos.css';
import FiltroPesquisa from '../../components/FiltroPesquisa/FiltroPesquisa';
import {
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardGroup,
  CardSubtitle,
  CardBody,
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { FaShoppingBasket, FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

class ListaProdutos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resultados: [],
      carrinho: [],
      exibirModal: false,
    };
  }

  atualizarResultados = (resultados) => {
    console.log(resultados);
    this.setState({ resultados });
  };

  adicionarProduto = (produto) => {
    const produtoJaNoCarrinho = this.state.carrinho.find((p) => p.id === produto.id);
    if (produtoJaNoCarrinho) {
      console.warn('Produto já está no carrinho');
      return;
    }

    const novoProduto = {
      ...produto,
      quantidade: 1, // Definindo a quantidade inicial como 1
    };

    const novoCarrinho = [...this.state.carrinho, novoProduto];
    this.setState({
      carrinho: novoCarrinho,
    });
  };

  removerProduto = (produto) => {
    const novoCarrinho = this.state.carrinho.filter((p) => p.id !== produto.id);
    this.setState({
      carrinho: novoCarrinho,
    });
  };

  toggleModal = () => {
    this.setState({
      exibirModal: !this.state.exibirModal,
    });
  };

  calcularValorTotal = () => {
    return this.state.carrinho.reduce((total, produto) => {
      return total + produto.preco * produto.quantidade;
    }, 0);
  };

  incrementarQuantidade = (produto) => {
    const novoCarrinho = this.state.carrinho.map((p) => {
      if (p.id === produto.id) {
        return {
          ...p,
          quantidade: p.quantidade + 1,
        };
      }
      return p;
    });
    this.setState({
      carrinho: novoCarrinho,
    });
  };

  decrementarQuantidade = (produto) => {
    const novoCarrinho = this.state.carrinho.map((p) => {
      if (p.id === produto.id && p.quantidade > 1) {
        return {
          ...p,
          quantidade: p.quantidade - 1,
        };
      }
      return p;
    });
    this.setState({
      carrinho: novoCarrinho,
    });
  };

  render() {
    const { resultados, carrinho, exibirModal } = this.state;
    console.log(this.props);
    const { username } = this.props.location.state || {};

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
                    <img
                      src={`data:image/png;base64,${produto.imagem}`}
                      className="card-img-top"
                      alt={produto.nome} // Adicione o texto alternativo para a imagem
                    />
                    <div className="card-body d-flex flex-column h-100">
                      <h5 className="card-title">{produto.nome}</h5>
                      <p className="card-text">
                        <span className="card-subtitle mb-2 text-muted">{produto.categoria}</span>
                        {produto.descricao}
                      </p>
                      <div className="mt-auto d-flex justify-content-between align-items-center">
                        <div className="preco">R${produto.preco}</div>
                        <Button
                          className="btn-adicionar"
                          onClick={() => this.adicionarProduto(produto)}
                          aria-label={`Adicionar ${produto.nome} ao carrinho`} // Descrição textual para o botão
                        >
                          Adicionar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="carrinho">
          <Button className="btnVerCarrinho" onClick={this.toggleModal}>
            <FaShoppingBasket /> {carrinho.length > 0 && `+${carrinho.length}`}
          </Button>
          <Modal isOpen={exibirModal} toggle={this.toggleModal} aria-labelledby="carrinho-modal-title">
            <ModalHeader toggle={this.toggleModal} id="carrinho-modal-title">
              Carrinho
            </ModalHeader>
            <ModalBody>
              {carrinho.map((produto) => (
                <div key={produto.id} className="produto-carrinho">
                  <img
                    src={`data:image/png;base64,${produto.imagem}`}
                    className="produto-imagem"
                    alt={produto.nome} // Adicione o texto alternativo para a imagem
                  />
                  <div>
                    <p>{produto.nome}</p>
                    <p>
                      Valor por produto: R${produto.preco} | Quantidade: {produto.quantidade}
                    </p>
                    <div className="d-flex justify-content-center align-items-center">
                      <Button
                        className="btn-remover ml-2"
                        onClick={() => this.removerProduto(produto)}
                        aria-label={`Remover ${produto.nome} do carrinho`} // Descrição textual para o botão
                      >
                        <FaTrash />
                      </Button>
                      <div className="quantidade-botoes">
                        <Button
                          className="btn-quantidade"
                          onClick={() => this.decrementarQuantidade(produto)}
                          aria-label={`Diminuir quantidade de ${produto.nome}`} // Descrição textual para o botão
                        >
                          <FaMinus />
                        </Button>
                        <Button
                          className="btn-quantidade"
                          onClick={() => this.incrementarQuantidade(produto)}
                          aria-label={`Aumentar quantidade de ${produto.nome}`} // Descrição textual para o botão
                        >
                          <FaPlus />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </ModalBody>
            <ModalFooter>
              <p>Valor total: R${this.calcularValorTotal()}</p>
              <NavLink
                to={{
                  pathname: "/fechar-pedido",
                  state: { carrinho: this.state.carrinho, username },
                }}
                className="btn btn-secondary"
              >
                Fechar Pedido
              </NavLink>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}

export default ListaProdutos;
