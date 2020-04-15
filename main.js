const path = require('path');
const url = require('url');
const { app, BrowserWindow, Menu, dialog} = require('electron');
let mainWindow
let options = 
{
  title : "Custom title bar", 
  defaultPath : __dirname,
  buttonLabel : "Custom button",
  filters :[
   {name: 'Movies', extensions: ['mkv', 'avi', 'mp4']},
   {name: 'Custom File Type', extensions: ['as']},
   {name: 'All Files', extensions: ['*']}
  ],
  properties: ['openFile','multiSelections']
 }


const template = 
[
    {
        label: 'File',
        submenu:
        [
            {
                role: 'close'
            },
            { role: 'toggledevtools' },
            {
                label: 'Open File',
                click: () =>
                {
                    console.log('Clicked');
                    dialog.showOpenDialog(options).then((fPathObj)=>
                    {
                      mainWindow.webContents.send('message',fPathObj.filePaths);
                      console.log('Sended');
                    });
                }
            }
        ]
    }
]

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
  mainWindow.loadFile('index.html')
}
app.whenReady().then(createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})