import React, { Component } from "react";
import { Button, Table } from "reactstrap";
import Header from "../../components/Header";
import '../../styles/styleCarrinho.css'

class Carrinho extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          total: 0,
          itens: props.produtos.map((produto) => ({ ...produto, quantidade: 1 })),
        };
      }
    
      componentDidMount() {
        console.log(this.props.produtos);
      }
    
      atualizarQuantidade = (produto, novaQuantidade) => {

        console.log(produto)
        console.log(novaQuantidade)
        const itensAtualizados = this.state.itens.map((item) => {
          if (item.id === produto.id) {
            return {
              ...item,
              quantidade: novaQuantidade > 0 ? novaQuantidade : 1,
            };
          } else {
            return item;
          }
        });
      
        this.setState({
          itens: itensAtualizados,
        });
        localStorage.setItem("carrinho", JSON.stringify(itensAtualizados));
      };
    
      calcularTotal = () => {
        return this.state.itens.reduce(
          (total, item) => {
            if (isNaN(item.preco) || isNaN(item.quantidade)) {
              console.log(item.preco);
              console.log(item.quantidade);
              return total;
            }
            // Calcula o valor total do item
    
            const valorItem = item.preco * item.quantidade;
            return total + valorItem;
          },
          0
        );
      };
    
      componentDidUpdate(prevProps, prevState) {
        // Salva os dados do carrinho no localStorage sempre que houver uma alteração no estado do componente
        if (prevState.itens !== this.state.itens) {
          localStorage.setItem("carrinho", JSON.stringify(this.state.itens));
        }
    
        console.log(localStorage.getItem("carrinho"));
      }
    
      adicionarItem = (produto) => {
        const itemExistente = this.state.itens.find(
          (item) => item.produto?.id === produto?.id
        );
    
        if (itemExistente) {
          const itensAtualizados = this.state.itens.map((item) => {
            if (item.produto?.id === produto?.id) {
              return {
                ...item,
                quantidade: item.quantidade + 1,
              };
            } else {
              return item;
            }
          });
    
          this.setState({
            itens: itensAtualizados,
          });
        } else {
          const novoItem = {
            produto: { ...produto },
            quantidade: 1,
          };
    
          this.setState({
            itens: [...this.state.itens, novoItem],
          });
        }
      };

    // Função para remover um item do carrinho
    removerItem = (produto) => {
        // Filtra os itens do carrinho, removendo o item com o produto desejado
        const itensAtualizados = this.state.itens.filter((item) => item.produto.id !== produto.id);

        // Atualiza o estado do componente com os itens atualizados
        this.setState({
            itens: itensAtualizados,
        });
    };


    render() {
        const { produtos, onRemoverProduto } = this.props;
        const { itens } = this.state;
        const total = this.calcularTotal();
    
        return (
          <div className="carrinho" style={{ position: 'absolute', bottom: 0, left: 0, zIndex: 1000 }}>
            <h1>Itens do pedido</h1>
            <Table>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Quantidade</th>
                  <th>Preço</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {itens.map((item) => (
                  <tr key={item.id}>
                    <td>{item.nome}</td>
                    <td>
                      <Button
                      className="btnCarrinhoAdd"
                        color="primary"
                        size="sm"
                        onClick={() =>
                          this.atualizarQuantidade(item, item.quantidade + 1)
                        }
                      >
                        +
                      </Button>{" "}
                      {item.quantidade}{" "}
                      <Button
                      className="btnCarrinhoAdd"
                        color="secondary"
                        size="sm"
                        onClick={() =>
                          this.atualizarQuantidade(item, item.quantidade - 1)
                        }
                      >
                        -
                      </Button>{" "}
                    </td>
                    <td>${item.preco.toFixed(2)}</td>
                    <td>${(item.quantidade * item.preco).toFixed(2)}</td>
                    <td>
                      <Button
                        color="danger"
                        size="sm"
                        onClick={() => onRemoverProduto(item)}
                      >
                        Remover
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3">Total</td>
                  <td>${total.toFixed(2)}</td>
                  <td></td>
                </tr>
              </tfoot>
            </Table>
          </div>
        );
    }
}

export default Carrinho;
