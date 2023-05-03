import React, { Component } from 'react';
import '../../styles/styleFiltroPesquisa.css'
import axios from 'axios';

class FiltroPesquisaEstab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      regiao: '',
      categoria: ''
    };
  }

  handleRegiaoChange = (event) => {
    this.setState({ regiao: event.target.value });
  }

  handleCategoriaChange = (event) => {
    this.setState({ categoria: event.target.value });
  }

  handleSubmit = (event) => {
    const endpoint = "http://localhost:8080/filtroEstabelecimento";
    event.preventDefault();
    const { regiao, categoria } = this.state;
    
    axios.post(endpoint, {
      regiao: regiao,
      categoria: categoria
    })
    .then((response) => {
      alert("Feito consulta");
      // lógica para atualizar os resultados da pesquisa na interface
      this.props.onResultadosAtualizados(response.data);
      
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <form className="filtro-pesquisa" onSubmit={this.handleSubmit}>
        <label>
          Região:
          <select value={this.state.regiao} onChange={this.handleRegiaoChange}>
            <option value="todas">Todas</option>
            <option value="sul">Sul</option>
            <option value="sudeste">Sudeste</option>
            <option value="centro-oeste">Centro-Oeste</option>
            <option value="nordeste">Nordeste</option>
            <option value="norte">Norte</option>
          </select>
        </label>
        <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default FiltroPesquisaEstab;
