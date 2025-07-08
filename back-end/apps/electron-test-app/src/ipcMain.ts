import { mouse, keyboard, Button, Key, Point } from '@nut-tree-fork/nut-js';
import { exec, spawn } from 'child_process';
import os from 'os';
import { getSystemInfo, sleep } from './ultis';
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

// (Tùy chọn) cấu hình tốc độ di chuyển chuột, delay,...
keyboard.config.autoDelayMs = 100;
mouse.config.mouseSpeed = 100;

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
                        'osascript -e \'display notification "Fake shutdown" with title "HaindApp"\'',
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

ipcMain.handle('get-system-info', async () => {
    const result = getSystemInfo();

    return result;
});
