import path from 'path';
import { URL } from 'url';

import Window from './window';

const url = new URL(path.resolve(__dirname, 'index.html'), 'file:/');
const preload = path.resolve(__dirname, 'preload.js');

Window.create(
    // By default, we will automatically load the file index.html so provided
    // there are no other parameters for .create() you can remove this as well.
    url.toString(),
    // The preload script provides access to nodes API's without enabling full
    // node integration (which could become a security risk.) Use with caution
    // though, as you can easily give access to the filesystem and allow someone
    // to accidentally run `rm -rf /` on a user's system.
    preload,
  )
  .catch((err) => {
    throw err;
  });
