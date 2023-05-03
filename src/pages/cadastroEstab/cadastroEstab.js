import React, { Component } from 'react';
import Header from '../../components/Header';
import '../../styles/styleCadastroProduto.css';
import { Col, Button, Form, FormGroup, Label, Input, FormText, Row } from 'reactstrap';
import axios from 'axios';

class CadastroEstabs extends Component {

constructor(props) {
super(props);

this.state = {
    options: [
      {label: 'Sul', value: 'Sul'}, 
      {label: 'Sudeste', value: 'Sudeste'}, 
      {label: 'Centro-Oeste', value: 'Centro-Oeste'},
      {label: 'Norte', value:'Norte'},
      {label: 'Nordeste', value:'Nordeste'}],
    selectedRegions: '',
    nome: '',
    descricao: '',
    imagem: null,
    regiao: '', 
  };
  
  this.handleRegionChange = this.handleRegionChange.bind(this);

}

handleSubmit = (event) => {
const endpoint = "http://localhost:8080/cadastroEstabelecimento";
event.preventDefault(); // impede o envio do formulário
console.log(this.state.regiao)
console.log(this.state.nome)
console.log(this.state.descricao)

const formData = new FormData();
formData.append('nome', event.target.elements.nome.value);
formData.append('descricao', event.target.elements.descricao.value);
formData.append('imagem', this.state.imagem);
formData.append('regiao', this.state.regiao);

axios
  .post(endpoint, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .then((response) => {
    console.log(response.data);
    alert('Estabelecimento cadastrado com sucesso!');
  })
  .catch((error) => {
    console.log(error);
    alert(
      'Erro ao cadastrar o estabelecimento. Verifique os campos e tente novamente.'
    );
  });

};

handleChange = (event) => {
this.setState({
[event.target.name]: event.target.value
});
};

handleRegionChange(event) {
this.setState({regiao: event.target.value});
}

handleImageChange = (event) => {
  this.setState({
    imagem: event.target.files[0]
  });
};

render() {
const { options } = this.state;

return (
    <div>
        <Header/>

        <div>
    <Form className="formCadastroProduto" onSubmit={this.handleSubmit} encType="multipart/form-data" value={this.state.nome} >
    <FormGroup row>
      <Label for="nome" sm={2}>Nome do estabelecimento</Label>
      <Col sm={10}>
        <Input type="text" name="nome" id="nome" placeholder="Nome do estabelecimento" onChange={this.handleChange} />
      </Col>
    </FormGroup>
    <FormGroup row>
      <Label for="descricao" sm={2}>Descrição</Label>
      <Col sm={10}>
        <Input type="textarea" name="descricao" id="descricao" placeholder="Descrição" value={this.state.descricao} onChange={this.handleChange} />
      </Col>
    </FormGroup>

    <FormGroup row>
          <Label for="imagem" sm={2}>Imagem</Label>
          <Col sm={10}>
          <Input type="file" name="imagem" id="imagem" onChange={this.handleImageChange} />
            <FormText color="muted">
              Imagem do estabelecimento
            </FormText>
          </Col>
    </FormGroup>

    <FormGroup row>
      <Label for="regiao" sm={2}>Região</Label>
      <Col sm={10}>
        <FormGroup check>
        {options.map((option, i) => (
            <Label check key={i}  className="regioesEstabs">
            <Input 
                type="radio" 
                name="regiao" 
                className="radioRegiao"
                value={option.value} 
                checked={this.state.regiao === option.value} 
                onChange={this.handleRegionChange}
            />{' '}
            {option.label}
            </Label>
        ))}
        </FormGroup>
      </Col>
    </FormGroup>
    <FormGroup row>
      <Col sm={{ size: 10, offset: 2 }}>
        <Button>Submit</Button>
      </Col>
    </FormGroup>
  </Form>
        </div>
        
    </div>
);
}
}

export default CadastroEstabs;