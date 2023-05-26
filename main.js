
const { app,shell,ipcMain, BrowserWindow, } = require('electron')
const path = require('path')
function createWindow () {
   const  win = new BrowserWindow({
    width: 1920,
    height: 1080,
    center:true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    }
  })

  

  win.loadFile('index.html')

}




app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})




app.on('web-contents-created', (e, contents) => {
  e.preventDefault()
  contents.on('will-navigate', (e, url) => {
    if (url !== contents.getURL()) e.preventDefault(), shell.openExternal(url) ,contents.close();
  });
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})


