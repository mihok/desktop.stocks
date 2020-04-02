import { app, Menu, MenuItemConstructorOptions } from 'electron';

const template: MenuItemConstructorOptions[] = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Preferences',
        click() {
          throw new Error('Not Implemented');
          return;
        }
      },
      { type: 'separator' },
      {
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        role: 'quit',
        click() {
          app.quit();
        }
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { type: 'separator' }
    ]
  },
];

// Assign menu
function buildMenu() {
  Menu.setApplicationMenu( Menu.buildFromTemplate( template ) );
}

module.exports = buildMenu;
