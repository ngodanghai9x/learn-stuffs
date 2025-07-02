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
import { exec, spawn } from 'child_process';
import os from 'os';
import { networkInterfaces } from 'os';
import { readFileSync } from 'fs';

// (Tùy chọn) cấu hình tốc độ di chuyển chuột, delay,...
keyboard.config.autoDelayMs = 100;
mouse.config.mouseSpeed = 100;

// ------------- ULTIS -----------------
function getSystemInfo() {
    const osType = os.type(); // 'Linux', 'Windows_NT', 'Darwin'
    const hostname = os.hostname(); // Tên máy
    const nets = os.networkInterfaces();

    const allInterfaces = Object.values(nets).flat();

    const found = allInterfaces.find(
        (net) =>
            net &&
            net.family === 'IPv4' &&
            !net.internal &&
            net.mac &&
            net.mac !== '00:00:00:00:00:00',
    );

    const macAddress = found?.mac ?? 'unknown';

    return {
        osType,
        hostname,
        macAddress,
    };
}
async function handleInputMessage(msg: any) {
    if (msg.type === 'mouse_move') {
        await mouse.move([new Point(msg.x, msg.y)]);
    }

    if (msg.type === 'mouse_click') {
        const button =
            msg.button === 'left'
                ? Button.LEFT
                : msg.button === 'right'
                ? Button.RIGHT
                : Button.MIDDLE;
        await mouse.click(button);
    }

    if (msg.type === 'key_down') {
        const key = Key[msg.key.toUpperCase()];
        if (key) {
            await keyboard.type(key);
        } else {
            console.warn(`Unknown key: ${msg.key}`);
        }
    }
}

export const sleep = (msec: number) => new Promise((resolve) => setTimeout(resolve, msec));

// console.log(getSystemInfo());

// ------------- ULTIS -----------------

let tray: Tray | null = null;

function createWindow() {
    const window = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    window.minimizable = true;
    window.center();
    // window.maximize();
    window.loadFile(path.join(__dirname, '../public/index.html'));

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
}

app.disableHardwareAcceleration();

app.whenReady().then(() => {
    createWindow();

    // app.on('activate', () => {
    //     if (!BrowserWindow.getAllWindows().length) createWindow();
    // });

    globalShortcut.register('F12', () => {
        const focusedWindow = BrowserWindow.getFocusedWindow();
        focusedWindow?.webContents.toggleDevTools();
    });
});

ipcMain.handle('send-key', async (_, text: string) => {
    await sleep(1000);
    console.log('🚀 ~ ipcMain.handle ~ text:', text);
    await keyboard.type(text);
});

ipcMain.handle('test-action', async (_, action: string) => {
    try {
        const platform = os.platform(); // 'win32', 'linux', 'darwin'
        console.log('🚀 ~ ipcMain.handle ~ platform:', { platform, action });

        switch (action) {
            case 'notepad':
                if (platform === 'win32') {
                    exec('notepad');
                } else if (platform === 'linux') {
                    exec('gedit'); // hoặc 'xed', tùy distro
                } else if (platform === 'darwin') {
                    exec('open -a TextEdit');
                }
                break;

            case 'url':
                if (platform === 'win32') {
                    exec('start https://google.com');
                } else if (platform === 'linux') {
                    exec('xdg-open https://google.com');
                } else if (platform === 'darwin') {
                    exec('open https://google.com');
                }
                break;

            case 'fake-shutdown':
                if (platform === 'win32') {
                    exec('msg * "Fake shutdown triggered!"');
                } else if (platform === 'linux') {
                    exec(`notify-send "Shutdown" "Đây là shutdown giả 😅"`);
                } else if (platform === 'darwin') {
                    exec(
                        'osascript -e \'display notification "Fake shutdown" with title "Electron"\'',
                    );
                }
                break;

            case 'terminal':
                if (platform === 'win32') {
                    exec('start cmd /k echo helloworld');
                } else if (platform === 'linux') {
                    exec('echo $DISPLAY', (err, stdout) => console.log('DISPLAY =', stdout));
                    exec('which gnome-terminal', (err, stdout, stderr) => {
                        console.log('PATH =', stdout || stderr);
                    });

                    exec(`gnome-terminal -- bash -c "echo helloworld; exec bash"`); // hoặc x-terminal-emulator
                    spawn('gnome-terminal', ['--', 'bash', '-c', 'echo helloworld; exec bash'], {
                        detached: true,
                        stdio: 'ignore',
                    }).unref();

                    // spawn('x-terminal-emulator', ['-e', 'bash', '-c', 'echo hello; exec bash'], {
                    //     detached: true,
                    //     stdio: 'ignore',
                    // }).unref();
                    // exec(`x-terminal-emulator -e "bash -c 'echo helloworld; exec bash'"`);
                } else if (platform === 'darwin') {
                    exec(
                        `osascript -e 'tell application "Terminal" to do script "echo helloworld"'`,
                    );
                }
                break;
        }
    } catch (error) {
        console.log('🚀 ~ ipcMain.handle ~ error:', error);
    }
});

ipcMain.handle('get-system-info', () => {
    const result = getSystemInfo();

    return result;
});
