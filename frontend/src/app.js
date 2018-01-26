import { app, BrowserWindow } from 'electron';

if (require('electron-squirrel-startup')) {
    app.quit();
}

let mainWindow;

const createWindow = () => {

};

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
