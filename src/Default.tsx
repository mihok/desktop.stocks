import React, { Component } from 'react';

export interface Props {
  nodeVersion: string,
  chromeVersion: string,
  electronVersion: string,
};

export class Default extends Component<Props, {}> {
  render () {
    const { nodeVersion, chromeVersion, electronVersion } = this.props;

    return [
      <h1>Hello World!</h1>,
      <p>We are using Node.js <span>{ nodeVersion }</span>,</p>,
      <p>Chromium <span>{ chromeVersion }</span>,</p>,
      <p>and Electron <span>{ electronVersion }</span>.</p>,
    ];
  }
};
