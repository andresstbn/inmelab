const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
    'api',
    {
        initCommunication: () => ipcRenderer.invoke('init-communication'),
        getCurrentWeight: () => ipcRenderer.invoke('get-weight')
    }
)