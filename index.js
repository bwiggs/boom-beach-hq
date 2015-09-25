'use strict';
const app = require('app');
const BrowserWindow = require('browser-window');
const Menu = require('menu');
var MenuItem = require('menu-item');

// report crashes to the Electron project
require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

var appName = app.getName();
let menuTemplate = [
  {
    label: 'BoomBeach HQ',
    submenu: [
      {
        label: 'About ' + appName,
        role: 'about'
      },
      {
        type: 'separator'
      },
      {
        label: 'Preferences'
      },
      { type: 'separator' },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click: function() { app.quit(); }
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Upgrades',
        click: function() { require('shell').openExternal('https://github.com/bwiggs/boom-beach-hq') }
      },
    ]
  }
  {
    label: 'Help',
    submenu: [
      {
        label: 'Home Page',
        click: function() { require('shell').openExternal('https://github.com/bwiggs/boom-beach-hq') }
      },
      { type: 'separator' },
      {
        label: 'Github Issues',
        click: function() { require('shell').openExternal('https://github.com/bwiggs/boom-beach-hq/issues') }
      }
    ]
  }
]
var appMenu = Menu.buildFromTemplate(menuTemplate);


// prevent window being GC'd
let mainWindow;

function createMainWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    'title-bar-style': 'hidden'
  });

  win.loadUrl(`file://${__dirname}/app/index.html`);
  win.on('closed', onClosed);
  Menu.setApplicationMenu(appMenu);

  return win;
}

function onClosed() {
  // deref the window
  // for multiple windows store them in an array
  mainWindow = null;
}

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate-with-no-open-windows', function () {
  if (!mainWindow) {
    mainWindow = createMainWindow();
  }
});

app.on('ready', function () {
  mainWindow = createMainWindow();
});
