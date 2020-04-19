import React, { Component } from 'react';
import { Canvas } from 'react-three-fiber';

import './style.css';

export default class ThreeCanvas extends Component<{}, {}> {
  render() {
    return (
      <Canvas />
    );
  }
};
