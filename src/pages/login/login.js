import React, { Component } from 'react';
import axios from 'axios';
import '../../styles/styleLogin.css';
import FemsaLogo from '../../assets/femsa-logo.png'

class Login extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          username: '',
          password: ''
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        const { name, value } = event.target;
    
        this.setState({
          [name]: value
        });
      }
    
      handleSubmit(event) {
        event.preventDefault();
      
        const { username, password } = this.state;
        const endpoint = "http://localhost:8080/login";
        
        axios.post(endpoint, { username, password })
          .then(response => {
            // Aqui você pode tratar a resposta da API, como redirecionar o usuário para a página principal, por exemplo
          })
          .catch(error => {
            // Aqui você pode tratar o erro da API, como exibir uma mensagem de erro para o usuário
          });
      }

      
  render() {
    return (
        <div className="container">
        <div className="d-flex justify-content-center h-100">
          <div className="card">
            <div className="card-header">
              <h3 className='logoKatalogo'>Kata Logo</h3>
              <div className="d-flex justify-content-end social_icon"></div>
            </div>
            <div className="card-body">
              <form action="http://localhost:8080/login" method="POST" onSubmit={this.handleSubmit}>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                  </div>
                  <input type="text" className="form-control" placeholder="username" name="username" onChange={this.handleChange} />
                </div>
                <div className="input-group form-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                  </div>
                  <input type="password" className="form-control" placeholder="password" name="password" onChange={this.handleChange} />
                </div>
                <div className="row align-items-center remember">
                  <input type="checkbox" />Remember Me
                </div>
                <div className="form-group">
                  <input type="submit" value="Login" className="btn float-right login_btn" />
                </div>
              </form>
            </div>
            <div className="card-footer">
              <div className="d-flex justify-content-center links">
                Don't have an account?<a>Sign Up</a>
              </div>
              <div className="d-flex justify-content-center">
                <a>Forgot your password?</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
