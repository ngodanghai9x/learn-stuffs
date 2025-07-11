import chokidar from 'chokidar';
import * as fg from 'fast-glob';
import * as klaw from 'klaw';

klaw('/home/gem/Documents/MyRepo')
    .on('data', (item) => {
        // console.log(item.path, item.stats.isFile());
    })
    .on('error', (err) => {
        console.warn(`Cannot access: ${err.path}: ${err.message}`);
    });



// const PATH =
//     '/home/gem/Documents/MyRepo/learn-stuffs/back-end/learn-nodejs/src/learn-libs/eventFileFindFile';

// const watcher = chokidar.watch(PATH, {
//     persistent: true,
//     ignoreInitial: true,
// });
// const searchFile = async (prefix = '[1]') => {
//     // Nếu muốn tìm thêm file .jpg cùng thư mục:
//     const jpgs = await fg(['**'], {
//         cwd: '/home/gem/Documents/WorkRepo',
//         caseSensitiveMatch: false,
//         objectMode: false,
//     });
//     console.log(prefix, 'Found jpgs:', jpgs);
// };
// searchFile('[0]');

// watcher
//     // .on('add', async (path) => {
//     //     console.log(`New file: ${path}`);
//     //     // await searchFile();
//     // })
//     .on('all', (event, path) => {
//         console.log(event, path);
//     });
// // .on('change', (path) => console.log(`File ${path} has been changed`))
// // .on('unlink', (path) => console.log(`Deleted: ${path}`));
