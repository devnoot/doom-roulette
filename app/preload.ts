// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

// import { contextBridge, ipcRenderer } from "electron";

// contextBridge.exposeInMainWorld('electron', {
//   store: {
//     get(key: string) {
//       return ipcRenderer.sendSync('store-get', key)
//     },
//     set(key: string, val: any) {
//       ipcRenderer.send('store-set', key, val)
//     }
//   }
// })