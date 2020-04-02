import { app, BrowserWindow } from 'electron';

import path from 'path';
import url from 'url';

const DEFAULT_HEIGHT = 768;
const DEFAULT_WIDTH = 1024;
// TODO: Currently this assumes there will be an 'index.html' file in the 
// directory above, this might not be the most atomic? /shrug
const DEFAULT_URL = (new url.URL(path.join(__dirname, '../index.html'), 'file:/')).toString();

export interface WebPreferences {
  devTools: boolean
  preload?: string
}

export class Window {

  // Default URI to load, this can be a file:///
  url: string = DEFAULT_URL;

  // Default height of the application
  height: number = DEFAULT_HEIGHT;

  // Default width of the application
  width: number = DEFAULT_WIDTH;

  // Preload script to load (that will have node access)
  preload: string = '';

  // Window object
  window: BrowserWindow | null;

  // Shortcut function to create an instance of Window.
  static create ( preload?: string, urlPath?: string, width?: number, height?: number ) {

    const w = new Window();

    if (typeof urlPath !== 'undefined') {
      w.url = urlPath as string;
    }

    if (typeof width !== 'undefined') {
      w.width = width as number;
    }

    if (typeof height !== 'undefined') {
      w.height = height as number;
    }

    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    app.on('activate', w.onReady.bind(w));

    // Quit when all windows are closed.
    app.on('window-all-closed', w.onClosed);

    // Build the window when Electron is ready.
    return app.whenReady()
      .then(w.onReady.bind(w));

  }

  async _initWindow () {
    // Keep a global reference of the window object, if you don't, the window will
    // be closed automatically when the JavaScript object is garbage collected.

    const webPreferences: WebPreferences = {
        devTools: process.env.NODE_ENV !== 'dev' ? false : true,
    };

    // Have we defined a preload script?
    if (!this.preload.length) {
      webPreferences.preload = this.preload;
    }

    this.window = new BrowserWindow({
      autoHideMenuBar: true,
      backgroundColor: '#222',
      center: true,
      darkTheme: true,
      height: this.height,
      titleBarStyle: 'hidden',
      webPreferences,
      width: this.width,
    });

    await this.window.loadURL(this.url);

    if(process.env.NODE_ENV === 'dev') {
      this.window.webContents.openDevTools();
    }

    this.window.on('closed', this.onClosed);

    // Setup IPC handling
    // this.configureIpc();

    // Build out the application menu
    // buildMenu();

    this.window.setMenuBarVisibility(false);
  }

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  async onReady () {

    // TODO: This will potentially stop multiple windows allowed?
    // Only re-create if we dont have a window.
    if (!this.window && BrowserWindow.getAllWindows().length === 0) {
      await this._initWindow();
    }
  }

  // Handle when closing windows.
  async onClosed () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }

    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    this.window = null;
  }
};

export default Window;
