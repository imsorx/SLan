const electron = require('electron')
const url = require('url')
const path = require('path')

const {
    app,
    BrowserWindow
} = electron



app.on('ready', function () {
    let mainWindow = new BrowserWindow({
        width: 290,
        height: 510,
        frame: false,
        transparent: true
    })

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, './src/render.html'),
        protocol: 'file:',
        slashes: true
    }))

    mainWindow.webContents.openDevTools();

})