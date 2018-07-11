const electron  = require('electron');
const {BrowserWindow}  = require('electron');
const countdown = require('./countdown.js');
const path = require('path');

const ipc =electron.ipcMain;

const app = electron.app;
const Menu = electron.Menu;
const Tray = electron.Tray;

let browserWin;
app.on('ready',()=>{
    console.log("On Ready");
    browserWin = new BrowserWindow({width:"400px",height:"400px"})
    browserWin.loadURL(`file://${__dirname}/app.html`);
    browserWin.on('closed',()=>{
        console.log("Window Closed.");
        browserWin = null;
    });
    let template = [
        {
            label: electron.app.getName(),
            submenu:[
                {
                    label:`About us`,
                    click:_=>{
                        console.log('clicked about');
                    },
                    role:'about',
                    checked:true
                },
                {
                    type:'separator'
                },
                {
                    label:'Quit',
                    click:_=>{
                        app.quit()
                    },
                    accelerator: 'Cmd+Q'
                }
            ]
        }
    ]
    const menu=Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
    const tray=new Tray(path.join('src','16.png'));
    tray.setContextMenu(menu);
    tray.setToolTip("My Society App");
})

ipc.on('countdown-start',_=>{
    countdown(count=>{
        browserWin.webContents.send('countdown',count);
    })
});