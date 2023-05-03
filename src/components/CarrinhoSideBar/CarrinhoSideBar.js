import React from 'react';
import PropTypes from 'prop-types';

const CarrinhoSideBar = ({ carrinho, onRemoverProduto, onIncrementarQuantidade, onDiminuirQuantidade }) => (
  <div className="sidebar">
    <h2>Carrinho</h2>
    <div className="sidebar__produtos">
      {carrinho.map((produto) => (
        <div className="sidebar__produto" key={produto.id}>
          <div>{produto.nome}</div>
          <div>
            <button onClick={() => onDiminuirQuantidade(produto)}>-</button>
            <span>{produto.quantidade}</span>
            <button onClick={() => onIncrementarQuantidade(produto)}>+</button>
          </div>
          <div>${(produto.preco * produto.quantidade).toFixed(2)}</div>
          <button className="sidebar__remover" onClick={() => onRemoverProduto(produto)}>Remover</button>
        </div>
      ))}
    </div>
    <div className="sidebar__total">
      <div>Total:</div>
      <div>${carrinho.reduce((total, produto) => total + produto.preco * produto.quantidade, 0).toFixed(2)}</div>
    </div>
  </div>
);

CarrinhoSideBar.propTypes = {
  carrinho: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nome: PropTypes.string.isRequired,
      preco: PropTypes.number.isRequired,
      quantidade: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  onRemoverProduto: PropTypes.func.isRequired,
  onIncrementarQuantidade: PropTypes.func.isRequired,
  onDiminuirQuantidade: PropTypes.func.isRequired,
};

export default CarrinhoSideBar;