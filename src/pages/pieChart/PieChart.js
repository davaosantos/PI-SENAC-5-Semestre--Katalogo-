import React, { Component } from 'react';
import ApexCharts from 'apexcharts';

class PieChart extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate() {
    this.renderChart();
  }

  renderChart() {
    const { data } = this.props;

    const options = {
      series: data.map(item => item.value),
      labels: data.map(item => item.label),
      chart: {
        type: 'pie',
      },
    };

    const chart = new ApexCharts(this.chartRef.current, options);
    chart.render();
  }

  render() {
    return <div ref={this.chartRef}></div>;
  }
}

export default PieChart;
