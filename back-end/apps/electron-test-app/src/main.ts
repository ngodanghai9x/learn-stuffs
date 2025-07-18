import {
    app,
    BrowserWindow,
    ipcMain,
    dialog,
    clipboard,
    nativeImage,
    Tray,
    Menu,
    autoUpdater,
    globalShortcut,
} from 'electron';
import path from 'path';
import { mouse, keyboard, Button, Key, Point } from '@nut-tree-fork/nut-js';
import './ipcMain';

let tray: Tray | null = null;

function createWindow() {
    const window = new BrowserWindow({
        width: 1000,
        height: 600,
        icon: path.join(__dirname, '../assets/favicon.ico'),
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            // nodeIntegrationInWorker: true,
            nodeIntegration: false,
        },
        title: 'Haind App Control',
        autoHideMenuBar: true,
    });

    window.minimizable = true;
    window.center();
    // window.maximize();
    window.loadFile(path.join(__dirname, '../pages/setting/index.html'));
    // window.loadFile(path.join(__dirname, '../pages/home/index.html'));

    // if (
    //     tray ||
    //     (!app.getLoginItemSettings().wasOpenedAtLogin && !process.argv.includes('--startup')) ||
    //     (readFileSync(path.join(process.resourcesPath, 'autoLaunchType.txt'), 'utf8') ||
    //         'foreground') !== 'background'
    // ) {
    //     window.show();
    // } else {
    //     tray = new Tray(path.join(__dirname, 'assets/favicon.ico'));
    //     tray.setToolTip('Remote Control');
    //     tray.setContextMenu(
    //         Menu.buildFromTemplate([
    //             {
    //                 label: 'Show',
    //                 click: () => {
    //                     window.show();
    //                     window.setSkipTaskbar(false);
    //                     tray?.destroy();
    //                     tray = null;
    //                 },
    //             },
    //             {
    //                 label: 'Exit',
    //                 click: () => {
    //                     window.webContents
    //                         .executeJavaScript("localStorage.getItem('settings');")
    //                         .then((settings) => {
    //                             if (!(JSON.parse(settings) || {}).runInBackgroundOnClose)
    //                                 return tray?.destroy(), (tray = null);
    //                             app.quit();
    //                         });
    //                 },
    //             },
    //         ]),
    //     );
    // }

    return window;
}

app.disableHardwareAcceleration();

app.whenReady().then(() => {
    const window = createWindow();

    ipcMain.handle('calling', async (_, peerId) => {
        console.log('🚀 ~ ipcMain.handle ~ peerId:', peerId);
        // const { stream, screen } = await captureScreen();
        window.webContents.send('start-capture', peerId);
        return 200;
    });
    // app.on('activate', () => {
    //     if (!BrowserWindow.getAllWindows().length) createWindow();
    // });

    globalShortcut.register('F12', () => {
        const focusedWindow = BrowserWindow.getFocusedWindow();
        focusedWindow?.webContents.toggleDevTools();
    });
});
