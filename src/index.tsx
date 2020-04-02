import React from 'react';
import ReactDOM from 'react-dom';

import { Default } from './Default';

// Global Stylesheets
import '../assets/css/meslo.scss';
import '../assets/css/base.scss';

ReactDOM.render(
  <Default
    chromeVersion={ process.versions.chrome }
    nodeVersion={ process.versions.node }
    electronVersion={ process.versions.electron }
  />,
  document.getElementById('app')
);
