import React, { Component } from 'react';
import * as d3 from 'd3';

import AlphaVantageService from '../../services/AlphaVantageService';

import './styles.scss';

const TODAY = new Date();

interface InlineProps {
  width: number;
  height: number;
  data: Array<{ date: string | Date, close: number }>;
};

type Props = InlineProps;

type State = {
  margin: { top: number, right: number, bottom: number, left: number };
  x: any;
  xLabel: string;
  y: any;
  yLabel: string;
  data: Array<any>;
}

type DateAxisDomainFormat = (domainValue: number | string | Date | { valueOf(): number; }, index: number) => string

export default class StockGraph extends Component<Props, State> {
  state: State = {
    margin: { top: 20, right: 0, bottom: 30, left: 20 },
    x: d3
      .scaleUtc()
      .domain([ new Date((new Date()).setFullYear(TODAY.getFullYear() - 5)), TODAY ])
      .range([0, 100]),
    xLabel: "",
    y: d3
      .scaleLinear()
      .domain([ 0, 100 ]).nice()
      .range([0, 100]),
    yLabel: "$ Close",
    data: [].map(({date, close}) => ({date, value: close})),
  }

  private canvas = React.createRef<HTMLDivElement>();

  private handleResize () {
    const { width, height } = this.props;
    const { margin } = this.state;

    this.setState({
      // TODO Change this to the actual domain for X
      x: d3
        .scaleUtc()
        .domain([ new Date((new Date()).setFullYear(TODAY.getFullYear() - 5)), TODAY ])
        .range([ margin.left, width ]),
      // TODO Change this to the actual domain for Y
      y: d3
        .scaleLinear()
        .domain([ 0, 100 ]).nice()
        .range([ height - margin.bottom, margin.top ]),
    });

    this.update();
  }

  private drawCanvas = () => {
    const { width, height } = this.props;

    return d3.select(this.canvas.current)
      .selectAll('svg')
      .attr("width", '100%')
      .attr("height", '100%')
      .attr('viewBox', `0 0 ${width} ${height}`)
      // .attr('preserveAspectRatio','xMinYMin')
      // .style('border', '1px solid white')
      .call((svg: any) => svg.selectAll('g').remove())
      .append('g');
      // .attr("transform", "translate(" + Math.min(width, height) / 2 + "," + Math.min(width, height) / 2 + ")");
  }

  private drawXAxis = (g: any) => {
    const { margin, x } = this.state;
    const { width, height } = this.props;

    let format: DateAxisDomainFormat;

    if ((width / 80) > 15) {
      format = d3.timeFormat("%Y-%m-%d") as DateAxisDomainFormat
    } else if ((width / 80) < 10) {
      format = d3.timeFormat("%Y") as DateAxisDomainFormat
    } else {
      format = d3.timeFormat("%Y-%m") as DateAxisDomainFormat
    }

    return g
      .attr('transform', `translate(0, ${height - margin.top - 10})`)
      .attr('id', 'x-axis')
      .call(
        // TODO: Base the tick format off of the interval
        d3.axisBottom(x)
          .tickFormat(format)
          .ticks(width / 80)
          .tickSizeOuter(0))
      .attr('font-family', 'meslo')
      .call((g: any) => g.selectAll('.domain')
        .attr('fill', 'none')
        .attr('stroke', 'white'));
  }

  private drawYAxis = (g: any) => {
    const { margin, y, yLabel } = this.state;

    return g
      .attr("transform", `translate(${margin.left}, 0)`)
      .attr('id', 'y-axis')
      .call(d3.axisLeft(y))
      .attr('font-family', 'meslo')
      .call((g: any) => g.select(".domain").remove())
      .call((g: any) => g.selectAll('.tick text')
        .attr('fill', 'white'))
      .call((g: any) => g.selectAll('.tick line')
        .attr('stroke', 'white'))
      .call((g: any) => g.select(".tick:last-of-type text")
        .clone()
        .attr("x", 3)
        .attr('stroke', 'white')
        .attr("text-anchor", "start")
        .attr("font-weight", "normal")
        .text(yLabel));
  }

  update() {
    const { x, y, data } = this.state;

    const svg = this.drawCanvas();    

    svg.append("g")
      .call(this.drawXAxis);

    svg.append("g")
      .call(this.drawYAxis);

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d: any) { console.log('DATUM X', d.date); return x(d.date) })
        .y(function(d: any) { console.log('DATUM Y', d.value); return y(d.value) })
      );
  }

  async componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));

    this.handleResize();

    const data = await AlphaVantageService.getIntradayBySymbol('GME');

    if (data) {
      this.setState({ data });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  render () {
    // TODO: Figure out if this is too expensive
    // Redraw the chart whenever there is a render.
    this.update();

    return (
      <div id="canvas" ref={this.canvas}>
        <svg width="100%" height="100%" viewBox="0 0 0 0" preserveAspectRatio="xMinYMin">
          <g></g>
        </svg>
      </div>
    );
  }
};
