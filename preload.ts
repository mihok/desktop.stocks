// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('versions', { ...process.versions });
