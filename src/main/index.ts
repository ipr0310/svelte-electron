import {
  app,
  shell,
  BrowserWindow,
  Tray,
  nativeImage,
  Menu,
  ipcMain,
  dialog,
  clipboard,
  Notification
} from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { runServer } from './app'
import { createDatabase } from './app/db/create'
import childProcess from 'child_process'

import icon from '../../resources/icon.png?asset'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadURL('http://localhost:4915/')
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // IPC test
  ipcMain.on('ping', () => {
    console.log('pong')

    new Notification({
      title: 'Ping',
      body: `Pong - ${process.env['ELECTRON_RENDERER_URL']}`
    }).show()
  })

  // Dialog test
  ipcMain.on('dialog', async () => {
    await dialog
      .showOpenDialog({ properties: ['openFile', 'dontAddToRecent'] })
      .then((response) => {
        const filePath = `"${response.filePaths[0]}"`

        clipboard.writeText(filePath)

        childProcess.exec(`${filePath} -game -bad -modded`)

        new Notification({
          title: 'Opened File',
          body: filePath
        }).show()
      })
  })

  // Set Tray Settings
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio', checked: true },
    { label: 'Item2', type: 'radio', checked: true },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio', checked: true }
  ])

  const tray = new Tray(nativeImage.createFromPath(icon))
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)

  // Make a change to the context menu
  contextMenu.items[3].checked = true

  // Call this again for Linux because we modified the context menu
  tray.setContextMenu(contextMenu)

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createDatabase()

  runServer()

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
