import React from 'react';
import ReactDOM from 'react-dom';

import { Default } from './Default';

import '../assets/fonts/meslo.css';
import '../assets/css/base.css';

ReactDOM.render(
  <Default
    chromeVersion={ process.versions.chrome }
    nodeVersion={ process.versions.node }
    electronVersion={ process.versions.electron }
  />,
  document.getElementById('app')
);
