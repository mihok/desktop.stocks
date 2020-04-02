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
      <h1 key="title">Hello World!</h1>,
      <p key="version">
        We are using Node.js <span>{ nodeVersion }</span>,<br />
        Chromium <span>{ chromeVersion }</span>,<br />
        and Electron <span>{ electronVersion }</span>.
      </p>,
    ];
  }
};
