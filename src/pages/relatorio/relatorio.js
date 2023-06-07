import React, { Component } from 'react';
import Header from '../../components/Header';
import '../../styles/styleListaProdutos.css';
import FiltroPesquisa from '../../components/FiltroPesquisa/FiltroPesquisa';
import {
  Card, Button, CardImg, CardTitle, CardText, CardGroup,
  CardSubtitle, CardBody, Col, Row, Modal, ModalHeader, ModalBody, ModalFooter,
  Table
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { FaShoppingBasket, IconName } from "react-icons/fa";
import FiltroRelatorio from '../../components/FiltroRelatorio/FiltroRelatorio';
import { UserContext } from '../../context/userContext';
import ApexCharts from 'apexcharts';

class Relatorio extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);

    this.state = {
      resultados: {},
      resultadosAnteriores: {},
      carrinho: [],
      exibirModal: false,
      chartInstance: null
    };
  }

  componentDidMount() {
    this.createChart();
  }

  componentDidUpdate() {
    const { resultados, resultadosAnteriores } = this.state;

    if (JSON.stringify(resultados) !== JSON.stringify(resultadosAnteriores)) {
      this.updateChart();
    }
  }

  componentWillUnmount() {
    if (this.state.chartInstance) {
      this.state.chartInstance.destroy();
    }
  }

  atualizarResultados = (dados) => {
    this.setState({
      resultados: dados,
      resultadosAnteriores: {} // Reinicia os resultados anteriores
    });
  };

  createChart = () => {
    const { resultados } = this.state;

    if (resultados && Object.keys(resultados).length > 0) {
      const { valorTotalVendas, vendasPorRegiao } = resultados;
      const chartElement = document.getElementById('chart');

      if (chartElement) {
        let chartOptions;

        if (resultados.regiaoSelecionada === 'vendas-regiao') {
          chartOptions = {
            series: Object.values(vendasPorRegiao),
            labels: Object.keys(vendasPorRegiao),
            chart: {
              type: 'donut',
              height: 350,
            },
            colors: ['#980122', '#FF5733', '#FFC300', '#DAF7A6', '#C70039'],
            title: {
              text: 'Relatório de Vendas por Região',
              align: 'center',
            },
          };
        } else {
          const { datasMaisVendas } = resultados;

          chartOptions = {
            series: [
              {
                name: 'Total de Vendas',
                data: Object.values(datasMaisVendas),
              },
            ],
            chart: {
              type: 'bar',
              height: 350,
            },
            xaxis: {
              categories: Object.keys(datasMaisVendas),
            },
            colors: ['#980122'],
            title: {
              text: 'Relatório de Vendas por Data',
              align: 'center',
            },
          };
        }

        const chartInstance = new ApexCharts(chartElement, chartOptions);
        chartInstance.render();

        this.setState({
          chartInstance,
          resultadosAnteriores: resultados // Atualiza os resultados anteriores com os resultados atuais
        });
      }
    }
  };

  updateChart = () => {
    if (this.state.chartInstance) {
      this.state.chartInstance.destroy();
    }

    this.createChart();
  };

  render() {
    const { resultados, carrinho, exibirModal } = this.state;
    const { username } = this.context;

    return (
      <div>
        <div className="relatorio">
          <Header />
          <FiltroRelatorio onResultadosAtualizados={this.atualizarResultados} />
          {resultados && Object.keys(resultados).length > 0 && (
            <div>
              <div id="chart"></div>
              {resultados.regiaoSelecionada === 'vendas-regiao' ? (
                null
              ) : (
                <p className="valor-vendas">Valor Total de Vendas: {resultados.valorTotalVendas}R$</p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Relatorio;
