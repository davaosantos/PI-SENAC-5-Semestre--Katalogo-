import React, { Component } from 'react';
import Header from '../../components/Header';
import '../../styles/styleCadastroProduto.css';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Row } from 'reactstrap';
import axios from 'axios';

class CadastroProdutos extends Component {

  constructor(props) {
    super(props);

    this.state = {
      options: [
        {label: 'Sul', value: 1}, 
        {label: 'Sudeste', value: 2}, 
        {label: 'Centro-Oeste', value: 3},
        {label: 'Norte', value:4},
        {label: 'Nordeste', value:5}],
      selectedRegions: [],
      nome: '',
      preco: '',
      categoria: '',
      imagem: null,
      regiao: [], // Armazena as regiões selecionadas
      produtos: [] // Adiciona uma array para armazenar os produtos
    };
    this.handleRegionChange = this.handleRegionChange.bind(this);
  }

  handleSubmit = (event) => {
    const endpoint = "http://localhost:8080/cadastroProduto";
    event.preventDefault(); // impede o envio do formulário
    console.log(this.state.regiao)
    console.log(this.state.preco)
    console.log(this.state.regiao)
    console.log(this.state.nome)
    console.log(this.state.categoria)
  
    const formData = new FormData();
    formData.append('nome', event.target.elements.nome.value);
    formData.append('preco', String(this.state.preco)); // converte o preço para string
    formData.append('categoria', this.state.categoria);
    formData.append('imagem', this.state.imagem);
  
    this.state.regiao.forEach((id) => {
      formData.append('regiao', id);
    });
  
    axios
      .post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        console.log(response.data);
        alert('Produto cadastrado com sucesso!');
      })
      .catch((error) => {
        console.log(error);
        alert(
          'Erro ao cadastrar o produto. Verifique os campos e tente novamente.'
        );
      });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleImageChange = (event) => {
    this.setState({
      imagem: event.target.files[0]
    });
  };

  handlePrecoChange = (event) => {
    this.setState({
      preco: event.target.value
    });
  };

  handleRegionChange(event) {
    const value = event.target.value;
    const isChecked = event.target.checked;
    let regiao = this.state.regiao.slice();
    if (isChecked) {
      regiao.push(parseInt(value));
    } else {
      regiao = regiao.filter(region => region !== parseInt(value));
    }
    this.setState({regiao: regiao});
  }
  


  render() {
    const { options } = this.state;

    return (
        <div>
            <Header/>

            <div>
        <Form className="formCadastroProduto" onSubmit={this.handleSubmit} encType="multipart/form-data" value={this.state.nome} >
        <FormGroup row>
          <Label for="nome" sm={2}>Nome Produto</Label>
          <Col sm={10}>
            <Input type="text" name="nome" id="nome" placeholder="Nome do produto" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="preco" sm={2}>Preço</Label>
          <Col sm={10}>
            <Input type="text" name="preco" id="preco" placeholder="Preço" value={this.state.preco} onChange={this.handlePrecoChange} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="imagem" sm={2}>Imagem</Label>
          <Col sm={10}>
          <Input type="file" name="imagem" id="imagem" onChange={this.handleImageChange} />
            <FormText color="muted">
              Imagem do produto
            </FormText>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="categoria" sm={2}>Categoria</Label>
          <Col sm={10}>
            <Input type="select" name="categoria" id="categoria" onChange={(event) => this.setState({categoria: event.target.value})}> 

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
            
            </Input>
          </Col>
        </FormGroup>

        <FormGroup>
  <Label for="regiao">Regiões</Label>
  <Row>
  <Col xs="6">
    {options.slice(0, 3).map((option) => (
      <FormGroup check key={option.value}>
        <Label check>
          <Input
            type="checkbox"
            value={option.value}
            onChange={this.handleRegionChange}
            checked={this.state.regiao.includes(option.value)}
          />
          {option.label}
        </Label>
      </FormGroup>
    ))}
  </Col>
  <Col xs="6">
    {options.slice(3, 5).map((option) => (
      <FormGroup check key={option.value}>
        <Label check>
          <Input
            type="checkbox"
            value={option.value}
            onChange={this.handleRegionChange}
            checked={this.state.regiao.includes(option.value)}
          />
          {option.label}
        </Label>
      </FormGroup>
    ))}
  </Col>
</Row>
</FormGroup>



        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button className="submitProduto">Submit</Button>
          </Col>
        </FormGroup>
      </Form>
      </div>

      </div>

    )
  }
}

export default CadastroProdutos;

