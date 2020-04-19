import React from 'react';
import ReactDOM from 'react-dom';

import { Default } from './DefaultComponent';

// Global Stylesheets
import '../assets/css/meslo.scss';
import '../assets/css/base.scss';

// Our injected versions object from the preload script.
declare global {
  interface Window  {
    versions: { [column: string]: string };
  }
}

const { versions } = window;

ReactDOM.render(
  <Default
    nodeVersion={versions.node}
    chromeVersion={versions.chrome}
    electronVersion={versions.electron}
  />,
  document.getElementById('app')
);
