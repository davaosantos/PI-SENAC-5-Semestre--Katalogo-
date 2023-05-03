import React, { Component } from 'react';
import '../../styles/styleFiltroPesquisa.css'
import axios from 'axios';

class FiltroPesquisa extends Component {
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
    const endpoint = "http://localhost:8080/filtroProduto";
    event.preventDefault();
    const { regiao, categoria } = this.state;
    
    axios.post(endpoint, {
      regiao: regiao,
      categoria: categoria
    })
    .then((response) => {
      console.log(regiao + "CATE" + categoria)
      console.log(response.data);
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
        <label>
          Categoria:
          <select value={this.state.categoria} onChange={this.handleCategoriaChange}>
          <option value="Todos">Todos</option>
          <option value="BEBIDAS CARBONATADAS">BEBIDAS CARBONATADAS</option>
            <option value="BEBIDAS ESPORTIVAS">BEBIDAS ESPORTIVAS</option>
            <option value="BEBIDAS ENERGÉTICAS">BEBIDAS ENERGÉTICAS</option>
            <option value="SUCOS E NÉCTARES">SUCOS E NÉCTARES</option>
            <option value="PRODUTOS LATICÍNIOS">PRODUTOS LATICÍNIOS</option>
            <option value="CHÁS">CHÁS</option>
            <option value="BEBIDAS À BASE DE FRUTAS">BEBIDAS À BASE DE FRUTAS</option>
            <option value="BEBIDAS À BASE DE PROTEÍNA VEGETAL">BEBIDAS À BASE DE PROTEÍNA VEGETAL</option>
            <option value="ÁGUA GASIFICADA">ÁGUA GASIFICADA</option>
            <option value="ÁGUA COM SABOR">ÁGUA COM SABOR</option>
            <option value="ÁGUA PURIFICADA">ÁGUA PURIFICADA</option>
          </select>
        </label>
        <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default FiltroPesquisa;
