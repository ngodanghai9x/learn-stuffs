/* eslint-disable @typescript-eslint/no-var-requires */
// const moment: any = require('dayjs');
// const moment = require('moment-timezone');
// import moment = require('moment-timezone');
import moment = require('dayjs');

const Utc = require('dayjs/plugin/utc');
const Timezone = require('dayjs/plugin/timezone'); // dependent on utc plugin
const AdvancedFormat = require('dayjs/plugin/advancedFormat');
// import AdvancedFormat from 'dayjs/plugin/advancedFormat' // ES 2015

// use plugin
if (moment.extend) {
    moment.extend(Utc);
    moment.extend(Timezone);
    moment.extend(AdvancedFormat);
}

process.env.TZ = 'UTC';

enum DateFormat {
    Date = 'YYYY-MM-DD',
    Time = 'HH:mm:ss',
    TimeMs = 'HH:mm:ss.SSS',

    DateTimeWithTz = 'YYYY-MM-DDTHH:mm:ssZ', // Corrected format for UTC timezone

    DateTime = 'YYYY-MM-DDTHH:mm:ss',
    DateTimeUtc = 'YYYY-MM-DDTHH:mm:ss[Z]', // Format for strict ISO UTC with Z literal

    DateTimeMs = 'YYYY-MM-DDTHH:mm:ss.SSS', // ISO format in Python
    DateTimeMsUtc = 'YYYY-MM-DDTHH:mm:ss.SSS[Z]', // ISO format in JavaScript
}

console.log('dayjs', DateFormat, [
    moment().format(DateFormat.DateTimeWithTz),
    moment().format(DateFormat.DateTime),
    moment().format(DateFormat.DateTimeUtc),
    moment().format(DateFormat.DateTimeMs),
    moment().format(DateFormat.DateTimeMsUtc),
    // dayjs().format(DateFormat.DateTimeMs)
]);
