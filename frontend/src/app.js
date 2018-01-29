import { app, BrowserWindow } from 'electron';

if (require('electron-squirrel-startup')) {
    app.quit();
}

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow();
    mainWindow.on('closed', () => {
        mainWindow = null;
    })
};

app.on('ready', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
