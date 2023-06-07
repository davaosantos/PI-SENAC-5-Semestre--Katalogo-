import React, { Component } from 'react';
import '../../styles/styleFiltroPesquisa.css';
import axios from 'axios';
import { UserContext } from '../../context/userContext';

class FiltroRelatorio extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      regiaoSelecionada: 'minhas-vendas',
      categoria: '',
      dataInicial: '',
      dataFinal: ''
    };
  }

  handleRegiaoChange = (event) => {
    this.setState({ regiaoSelecionada: event.target.value });
  };

  handleCategoriaChange = (event) => {
    this.setState({ categoria: event.target.value });
  };

  handleDataInicialChange = (event) => {
    this.setState({ dataInicial: event.target.value });
  };
  
  handleDataFinalChange = (event) => {
    this.setState({ dataFinal: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { regiaoSelecionada, categoria, dataInicial, dataFinal } = this.state;
    const { username } = this.context;

    if (regiaoSelecionada === 'vendas-regiao') {
      // Chamada à API para Vendas por Região
      const endpoint = "http://localhost:8080/relatorioVendasRegiao";

      axios.post(endpoint, {
        dataInicial: dataInicial,
        dataFinal: dataFinal,
        username: username
      })
      .then((response) => {
        alert("Consulta realizada com sucesso!");
        const { valorTotalVendas, vendasPorRegiao } = response.data;
        const resultados = {
          regiaoSelecionada,
          valorTotalVendas,
          vendasPorRegiao
        };
        this.props.onResultadosAtualizados(resultados);
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      // Chamada à API para Minhas Vendas
      const endpoint = "http://localhost:8080/relatorioVendasProprias";

      axios.post(endpoint, {
        regiao: regiaoSelecionada,
        categoria: categoria,
        dataInicial: dataInicial,
        dataFinal: dataFinal,
        username: username
      })
      .then((response) => {
        alert("Consulta realizada com sucesso!");
        const { valorTotalVendas, datasMaisVendas } = response.data;
        const resultados = {
          regiaoSelecionada,
          valorTotalVendas,
          datasMaisVendas
        };
        this.props.onResultadosAtualizados(resultados);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  render() {
    return (
      <form className="filtro-pesquisa" onSubmit={this.handleSubmit}>
        <label>
          Tipo de relatório: 
          <select value={this.state.regiaoSelecionada} onChange={this.handleRegiaoChange}>
            <option value="minhas-vendas">Minhas vendas</option>
            <option value="vendas-regiao">Vendas por região</option>
          </select>
        </label>
        <label>
          Data inicial:
          <input
            type="date"
            value={this.state.dataInicial}
            onChange={this.handleDataInicialChange}
          />
        </label>
        <label>
          Data final:
          <input
            type="date"
            value={this.state.dataFinal}
            onChange={this.handleDataFinalChange}
          />
        </label>
        <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default FiltroRelatorio;
