import React, { Component } from 'react';

import './style.scss';

export interface Props {
  nodeVersion?: string,
  chromeVersion?: string,
  electronVersion?: string,
};

export class Default extends Component<Props, {}> {
  render () {
    const { nodeVersion, chromeVersion, electronVersion } = this.props;

    return [
      <h1 key="title">Hello World!</h1>,
      <p key="versions" className="versions">
        We are using Node.js <span>{ nodeVersion }</span>,<br />
        Chromium <span>{ chromeVersion }</span>,<br />
        and Electron <span>{ electronVersion }</span>.
      </p>,
    ];
  }
};
