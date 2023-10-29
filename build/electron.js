'use strict';

const { app, BrowserWindow } = require('electron');
const path = require('path');

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
		show: false,
    width: 980,
    height: 820,
		autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true,
    },
		// подключение иконки
		icon: path.join(__dirname, '../img/favicon.png')
  });


	mainWindow.on('ready-to-show', () => {
		mainWindow.show();
	});

  mainWindow.loadFile('index.html');

});


  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

