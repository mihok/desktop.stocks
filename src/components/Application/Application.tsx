import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from'../../state';
import { KeyDownAction, KeyUpAction } from '../../state/UserInterface';

import ThreeCanvas from '../ThreeCanvas';

type Props = ConnectedProps<typeof connector>;

export class Application extends Component<Props> {
  onKeyDown (event: KeyboardEvent) {
    const { handleKeyDown } = this.props;
  
    handleKeyDown(event.key.toLowerCase());
  }

  onKeyUp (event: KeyboardEvent) {
    const { handleKeyUp } = this.props;

    handleKeyUp(event.key.toLowerCase());
  }

  componentDidMount () {
    document.addEventListener('keydown', this.onKeyDown.bind(this));
    document.addEventListener('keyup', this.onKeyUp.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown.bind(this));
    document.removeEventListener('keyup', this.onKeyUp.bind(this));
  }

  render () {
    return <ThreeCanvas />
  }
};

const mapDispatch = (dispatch: any) => ({
  handleKeyDown: (key: string) => dispatch(KeyDownAction({ key })),
  handleKeyUp: (key: string) => dispatch(KeyUpAction({ key })),
});

const mapState = (state: RootState) => ({ });

const connector = connect(mapState, mapDispatch);

export default connector(Application);
