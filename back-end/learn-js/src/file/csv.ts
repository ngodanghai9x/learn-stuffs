// @ts-nocheck
import parse from 'csv-parser';
import { stringify } from 'csv-stringify';
import fs from 'fs';
import { join } from 'path';

// var parse = require('csv-parse');
// var stringify = require('csv-stringify');

function writeFile(outputPath: string, data: any[]) {
  stringify(
    data,
    {
      header: true,
    },
    async (_err, output) => {
      await fs.writeFile(outputPath, output, 'utf8', (outputData) => {
        console.log('🚀 Done write file.', outputData);
      });
    },
  );
}

function writeFile2(outputPath: string, data: any[]) {
  const stringifier = stringify({ header: true });
  data.forEach((row) => {
    stringifier.write(row);
  });
  const writableStream = fs.createWriteStream(outputPath, 'utf8');
  stringifier
    .pipe(writableStream)
    .on('error', function (error) {
      console.log(`🚀 createWriteStream error: ${error.message}`);
    })
    .on('end', async () => {
      console.log('🚀 Finished writing stream');
    });
}

function run() {
  const inputPath = join(__dirname, '..', 'assert', 'data.csv');
  const labelColumnMap: any = {};
  const headers = [
    'Full Name',
    'Type',
    'Group',
    'Domain',
    'Email',
    'Department',
    'Telephone',
    'Role',
  ];
  headers.forEach((label) => {
    labelColumnMap[label] = { name: label.toLowerCase().replace(/\s/, '_') };
  });
  console.log('🚀 input:', {
    labelColumnMap,
    inputPath,
  });

  const insertData: any[] = [];
  const rawData: any[] = [];
  const parser = parse({ columns: true, separator: ',' }, (_err: any, records: any) => {
    console.log(`records`, records);
  });
  // const parser = csv({ separator: ',' });

  // read
  fs.createReadStream(inputPath, 'utf8')
    .pipe(parser)
    .on('data', (record) => {
      const data: any = {};
      Object.keys(record).forEach((label) => {
        const columnName = labelColumnMap[label].name;
        data[columnName] = record[label];
      });
      insertData.push(data);
      rawData.push(record);
    })
    .on('end', async () => {
      console.log('🚀 Done read stream.', { rawData, insertData });

      // write
      const outputPath = join(__dirname, '..', 'assert_output', `data_${new Date().getTime()}.csv`);
      const outputPath2 = join(
        __dirname,
        '..',
        'assert_output',
        `data2_${new Date().getTime()}.csv`,
      );

      console.log('🚀 outputPath:', {
        outputPath,
        outputPath2,
      });
      writeFile(outputPath, insertData);
      writeFile2(outputPath2, insertData);

      // end
    })
    .on('error', function (error) {
      console.log(`🚀 createReadStream error: ${error.message}`);
    });
}

run();
