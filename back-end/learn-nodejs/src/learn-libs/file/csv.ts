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
  // const inputPath = join(__dirname, '..', '..', 'assert', 'data.csv');
  const inputPath = `/home/gem/Downloads/import_domains_template2.csv`;
  const labelColumnMap: Record<string, { name: string }> = {};
  // || {
  //   'Full Name': { name: 'full_name' },
  //   Type: { name: 'type' },
  //   Group: { name: 'group' },
  //   Domain: { name: 'domain' },
  //   Email: { name: 'email' },
  //   Department: { name: 'department' },
  //   Telephone: { name: 'telephone' },
  //   Role: { name: 'role' },
  // };
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
        const columnName = labelColumnMap[label]?.name;
        data[columnName] = record[label];
      });
      insertData.push(data);
      rawData.push(record);
      console.log('🚀 ~ .on ~ recordlength:', record['Customer ID']?.length);
    })
    .on('end', async () => {
      console.log('🚀 Done read stream.', { rawData, insertData });

      // write
      const outputPath = join(
        __dirname,
        '..',
        '..',
        'assert_output',
        `data_${new Date().getTime()}.csv`,
      );
      const outputPath2 = join(
        __dirname,
        '..',
        '..',
        'assert_output',
        `data2_${new Date().getTime()}.csv`,
      );

      console.log('🚀 outputPath:', {
        outputPath,
        outputPath2,
      });
      writeFile(outputPath, rawData);
      // writeFile(outputPath, insertData);
      // writeFile2(outputPath2, insertData);

      // end
    })
    .on('error', function (error) {
      console.log(`🚀 createReadStream error: ${error.message}`);
    });
}

run();

export const importChildrenTable = async (tableName, file) =>
  new Promise(async (resolve, reject) => {
    const columns = [];
    const labelColumnMap = new Map();
    columns?.forEach((column) => {
      labelColumnMap.set(column.label, column);
    });
    const inserted = [];
    const { createReadStream, ...fileInfo } = file;
    let fileSize = 0;
    const stream = createReadStream();
    stream
      .on('data', (chunk) => {
        fileSize += chunk.length;
        if (fileSize > MAX_SIZE) {
          reject(new Error(trans.exception.maxSize?.replace('{fileSize}', '${MAX_SIZE} MB')));
          stream.destroy();
        }
      })
      .pipe(
        csvParser({
          separator: ',',
          // mapHeaders: ({ header, index }) => {
          //     const label = escapeString(header);
          //     const columnName = escapeString(labelColumnMap.get(label)?.name);
          //     return columnName || header;
          // },
        }),
      )
      .on('data', (record) => {
        const data = {};
        Object.keys(record).forEach((_label) => {
          const label = escapeString(_label);
          const col = labelColumnMap.get(label) || labelColumnMap.get(label.replace(/"/gi, ''));
          const columnName = escapeString(col?.name);
          if (columnName) {
            data[columnName] = record[_label];
          }
        });

        if (Object.keys(data).length) {
          inserted.push(data);
        }
      })
      .on('end', async () => {
        const output = await ChildrenTable.create(inserted);
        const outputIds = output?.map((item) => item?._id);
        console.log('Done insert:', {
          insert0: inserted[0],
          fileInfo,
          input: inserted?.length,
          output: output?.length || output,
          fileSize,
        });

        if (!output || !output?.length) {
          reject(new Error(`fail`));
        }

        resolve({ fileInfo, importedNum: output?.length ?? 0 });
        stream.destroy();
      })
      .on('error', function (error) {
        reject(new Error('Something went wrong'));
        stream.destroy();
      });
  });

async function parseCsv<T>(
  inputPath: string,
  headers: string[],
  // labelColumnMap: Record<string, { name: string }>
): Promise<T[]> {
  // const labelColumnMap: Record<string, { name: string }> = {};
  // || {
  //   'Full Name': { name: 'full_name' },
  //   Type: { name: 'type' },
  //   Group: { name: 'group' },
  //   Domain: { name: 'domain' },
  //   Email: { name: 'email' },
  //   Department: { name: 'department' },
  //   Telephone: { name: 'telephone' },
  //   Role: { name: 'role' },
  // };
  return new Promise(async (resolve, reject) => {
    const stream = createReadStream(inputPath, 'utf8');
    const insertData: T[] = [];
    const rawData: T[] = [];
    const parser = parse({
      separator: ',',
      headers,
      skipLines: 1,
    });
    const debug = true;

    // read
    stream
      .pipe(parser)
      .on('data', (record) => {
        // const data: any = {};
        // Object.keys(record).forEach((label) => {
        //   const columnName = labelColumnMap[label]?.name;
        //   data[columnName] = record[label];
        // });
        // insertData.push(data);
        rawData.push(record);

      })
      .on('end', async () => {
        debug && console.log('🚀 Done read stream.', { rawData, insertData });

        // write

        // if (!rawData || !rawData?.length) {
        //   reject(new BadRequestException('abc.csv_file_empty'));
        // }

        // resolve(insertData);
        resolve(rawData);
        stream.destroy();
      })
      .on('error', function (error) {
        console.error(`ParseCsvError: ${error.message}`);
        stream.destroy();
        reject(error);
      });
  });
}
