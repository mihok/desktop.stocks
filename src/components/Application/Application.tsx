import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from'../../state';

import AlphaVantageService from '../../services/AlphaVantageService';

import { Graph } from '../Graph';
import { StatusBar } from '../StatusBar'; 

import './styles.scss';

type Props = ConnectedProps<typeof connector>;

type State = {
  innerWidth: number;
  innerHeight: number;
}

export class Application extends Component<Props> {
  state: State = {
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
  }

  handleResize () {
    const { innerWidth, innerHeight } = window;

    this.setState({
      innerWidth,
      innerHeight,
    });
  }

  async componentDidMount () {
    window.addEventListener('resize', this.handleResize.bind(this));

    await AlphaVantageService.getIntradayBySymbol('BB');
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize.bind(this));
  }

  render () {
    const { innerWidth, innerHeight } = this.state;

    return [
      <section key="content">
        <Graph
          data={[]}
          width={innerWidth}
          height={innerHeight} />
      </section>,
      <StatusBar key="command" />,
    ];
  }
};

const mapDispatch = (dispatch: any) => ({ });

const mapState = (state: RootState) => ({ });

const connector = connect(mapState, mapDispatch);

export default connector(Application);
