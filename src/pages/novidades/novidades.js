import React from 'react';
import '../../styles/styleNovidades.css';
import Header from '../../components/Header';

const Novidades = () => {
  return (
    <div>
      <Header />
      <div className="novidades-container">
        <h2 className="headerNovidades">Novidades</h2>
        <p className="tituloNovidades">Aqui estão as últimas novidades do nosso site.</p>
        <div className="novidades-list">
          <div className="novidade-card">
            <img
              className="novidade-img"
              src="https://portal.clientesa.com.br/wp-content/uploads/2023/03/Coke_Studio_CocaCola_ClienteSA.jpg"
              alt="Imagem 1"
            />
            <h3>Lollapalooza e coca cola</h3>
            <p className="descNovidades">Coca -Cola cria estrutura multissensorial 
            inspirada nas ondas sonoras das músicas para o festival Lollapalooza Brasil.</p>
          </div>
          <div className="novidade-card">
            <img
              className="novidade-img"
              src="https://coca-colafemsa.com/wp-content/uploads/2023/03/22-Mar_A-Port.jpg"
              alt="Imagem 2"
            />
            <h3>Dia mundial da água</h3>
            <p>Dia Mundial da Água: Coca-Cola reafirma compromisso com avanços em iniciativas 
              em prol do acesso à água, conservação e segurança hídrica.</p>
          </div>
          <div className="novidade-card">
            <img
              className="novidade-img"
              src="https://experimentaissohome.files.wordpress.com/2020/08/ezy-watermark_07-08-2020_02-08-16pm.jpg?w=1024"
              alt="Imagem 3"
            />
            <h3>Guaraná jesus em destaque</h3>
            <p className="descNovidades">Marca da Coca-Cola desde 2001, Guaraná Jesus vira aposta 'premium'
            Bebida cor-de-rosa folclórica deixa de ser restrita à região do Maranhão.
            Com 'preço de importado', bebida chega a outros estados e mira classe A..</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Novidades;
