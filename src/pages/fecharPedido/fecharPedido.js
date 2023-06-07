import React, { Component } from 'react';
import Header from '../../components/Header';
import axios from 'axios';
import '../../styles/styleFecharPedido.css';
import { UserContext } from '../../context/userContext';

class FecharPedido extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);

    this.state = {
      nomeComerciante: '',
      enderecoEntrega: '',
      selectedRegion: '',
      carrinho: [],
      valorTotal: 0, // novo estado para armazenar o valor total
    };
  }

  componentDidMount() {
    const { carrinho } = this.props.location.state;
    const valorTotal = this.calcularValorTotal(carrinho); // calcular o valor total
    this.setState({ carrinho, valorTotal }); // atualizar o estado com o carrinho e o valor total
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleRegionChange = (event) => {
    this.setState({
      selectedRegion: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { nomeComerciante, enderecoEntrega, selectedRegion, carrinho, valorTotal } = this.state;
    const { username } = this.context;

     // Obtenha o ID da região com base no valor selecionado
    const regiaoId = parseInt(selectedRegion);


    const pedido = {
      username,
      nomeComerciante,
      enderecoEntrega,
      selectedRegion, // atribuir o valor diretamente
      carrinho: carrinho.map((produto) => produto.id),
      valorTotal,
    };

    console.log(pedido);

    axios
      .post('http://localhost:8080/vendas?selectedRegion=' + selectedRegion, pedido)
      .then((response) => {
        console.log('Pedido cadastrado com sucesso:', response.data);
        alert("Pedido registrado");
        // Aqui você pode realizar alguma ação adicional, como redirecionar para uma página de confirmação
      })
      .catch((error) => {
        console.error('Erro ao cadastrar pedido:', error);
        // Aqui você pode tratar o erro e exibir uma mensagem de erro para o usuário
      });
  };

  calcularValorTotal = (carrinho) => {
    return carrinho.reduce((total, produto) => {
      return total + produto.preco * produto.quantidade;
    }, 0);
  };

  render() {
    const { nomeComerciante, enderecoEntrega, carrinho, selectedRegion, valorTotal } = this.state;

    return (
      <div>
        <Header />
        <div className="container">
          <h1 className="text-center mt-4">Checkout</h1>
          <div className="row">
            <div className="col-md-6">
              <h3>Dados do Pedido</h3>
              {carrinho.map((produto) => (
                <div key={produto.id}>
                  <p>{produto.nome}</p>
                  <p>Quantidade: {produto.quantidade}</p>
                  <p>Valor Unitário: R${produto.preco}</p>
                  <p>Valor Total: R${produto.preco * produto.quantidade}</p>
                  <hr />
                </div>
              ))}
              <p>Valor Total do Pedido: R${valorTotal}</p>
            </div>
            <div className="col-md-6">
              <h3>Dados do Cliente</h3>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="nomeComerciante">Comerciante responsável:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nomeComerciante"
                    name="nomeComerciante"
                    value={nomeComerciante}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="enderecoEntrega">Endereço de entrega:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="enderecoEntrega"
                    name="enderecoEntrega"
                    value={enderecoEntrega}
                    onChange={this.handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="regiao">Região:</label>
                  <select
                    className="form-control"
                    id="regiao"
                    name="selectedRegion"
                    value={selectedRegion}
                    onChange={this.handleRegionChange}
                    required
                  >
                    <option value="">Região de entrega: </option>
                    <option value="1">Sul</option>
                    <option value="2">Sudeste</option>
                    <option value="3">Centro-Oeste</option>
                    <option value="4">Norte</option>
                    <option value="5">Nordeste</option>
                  </select>
                </div>
                <button type="submit" className="btn  btnFecharPed">Fechar Pedido</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FecharPedido;
