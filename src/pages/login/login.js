import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/styleLogin.css';
import { NavLink, useHistory } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

function Login({ location }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const { updateUsername, updateProfile } = useContext(UserContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const endpoint = "http://localhost:8080/login";

    axios.post(endpoint, { username, password })
      .then(response => {
        console.log("RESPOSTA: " + response.data);

        if (response.status === 200 && response.data.message === "Login successful") {
          updateUsername(username);
          updateProfile(response.data.profile);
          console.log(response.data.profile); // Exibir o valor do perfil retornado pela API
          console.log(updateProfile); // Exibir o valor atualizado do perfil no contexto
      
          history.push('/listaProdutos');
        }
      })
      .catch(error => {
        // Trate o erro da API aqui
        alert("Usuario ou senha incorretos")
      });
  }
  return (
    <div className="container login-class">
      <div className="d-flex justify-content-center h-100">
        <div className="card">
          <div className="card-header">
            <h3 className='logoKatalogo'>Kata Logo</h3>
            <div className="d-flex justify-content-end social_icon"></div>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fas fa-user"></i></span>
                </div>
                <input type="text" className="form-control" placeholder="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fas fa-key"></i></span>
                </div>
                <input type="password" className="form-control" placeholder="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
            <div className="d-flex justify-content-center">
              <NavLink className="btnVoltar" to="/">Return</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
