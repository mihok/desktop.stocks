import React, { Component } from 'react';
import { Canvas } from 'react-three-fiber';

import './style.scss';

export interface Props {
  handleMouseDown: () => void
  handleMouseUp: () => void
  handleMouseWheel: () => void
  keyDown: boolean
  key: string
}

export interface State {
  mouseDown: boolean
}

export default class ThreeCanvas extends Component<{}, {}> {
  async onMouseDown () {

  }

  async onMouseUp () {

  }

  async onMouseWheel () {

  }

  render () {
    console.log('RENDER CANVAS');

    return (
      <Canvas shadowMap
        pixelRatio={window.devicePixelRatio}
        camera={{ position: [0, 25, 75] }}
        onWheel={this.onMouseWheel}
        onPointerUp={this.onMouseUp}
        onPointerDown={this.onMouseDown}
      >

        {/* Lights */}
        <ambientLight />
        <pointLight position={[10, 10, 10]} />

        {/* Helpers */} 
        <gridHelper args={[100, 25, 0xffffff, 0x888888]} />
        <axesHelper args={[5]} />
      </Canvas>
    );
  }
};
