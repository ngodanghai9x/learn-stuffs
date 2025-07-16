import { writeFile, readFile } from 'fs/promises';
// import { writeFile, readFile } from 'fs';

export function dummyBlockingIO(prefix = '') {
    let dummy = 0;
    for (let i = 0; i < 800_000_000; i++) {
        dummy++;
        if (dummy > 9_000_000) {
            // console.log(`[${prefix}] ~ --:`, dummy);
            dummy--;
        }
        if (dummy < 10_000) {
            // console.log(`[${prefix}] ~ ++:`, dummy);
            dummy++;
        }
        if (dummy < 0) {
            console.log(`[${prefix}] ~ 00:`, dummy);
        }
        // console.log(`[worker] saveFile loop ${i}`);
    }
    console.log(`[${prefix}] ~ dummy:`, dummy);
}

export async function saveFile({ path, content }: { path: string; content: string }) {
    dummyBlockingIO('SAVE');
    await writeFile(path, Buffer.from(content, 'base64'));
    return { status: 'done', path };
}

export async function getFile({ path }: { path: string }) {
    dummyBlockingIO('GET');
    const content = await readFile(path, 'utf8');
    return { status: 'done', content };
}
