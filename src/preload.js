const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
    'api',
    {
        initCommunication: (port) => ipcRenderer.invoke('init-communication', port),
        getCurrentWeight: () => ipcRenderer.invoke('get-weight'),
        portsList: () => ipcRenderer.invoke('list-ports')
    }
)