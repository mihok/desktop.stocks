import { IpcMainEvent } from 'electron';

// This file handles the functions to call when certain events are received by the ipc renderer.
import path from 'path';
import fs from 'fs';

const configPath = path.join(__dirname, '../config.json');

// Creates config file if it doesn't already exist.
//
// Config must be mirrored in the client app for passing config payloads from client<->server.
//
// TODO: Move the initConfig to another file / share between client / server?
// TODO: Convert *sync to async/await file ops.
function initConfig (event: IpcMainEvent) {
  let config = null;

  // If there is no configuration, we'll create a blank one.
  if (!fs.existsSync(configPath)) {
    const fd = fs.openSync(configPath, 'w');

    const initialConfig = {};

    fs.writeSync(fd, JSON.stringify(initialConfig, null, '  '), 0, 'utf8');
    fs.closeSync(fd);
  }

  config = JSON.parse(fs.readFileSync(configPath).toString());
  event.sender.send('config', config);
}

// Handle changing the settings via front end `config.index` reducer
// writes to file and then sends payload to front end via ipc event.
function updateSettings(event: IpcMainEvent, payload: any) {
  fs.writeFile(configPath, JSON.stringify(payload, null, 2), (err) => {
    if (err) throw err;
    event.sender.send('config', payload)
  });
}

module.exports = {
  initConfig,
  updateSettings
};
