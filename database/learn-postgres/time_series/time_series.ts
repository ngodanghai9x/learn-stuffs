export enum EOHLC {
    ONE_SECOND = 1, // 1 second
    FIVE_SECONDS = 5, // 5 second
    ONE_MINUTE = 60, // 60 seconds
    FIVE_MINUTES = 5 * 60, // 300 seconds
    FIFTEEN_MINUTES = 15 * 60, // 900 seconds
    ONE_HOUR = 60 * 60, // 3600 seconds
    TWO_HOURS = 2 * 60 * 60, // 7200 seconds
    FOUR_HOURS = 4 * 60 * 60, // 14400 seconds
    EIGHT_HOURS = 8 * 60 * 60, // 28800 seconds
    TWELVE_HOURS = 12 * 60 * 60, // 43200 seconds
    ONE_DAY = 24 * 60 * 60, // 86400 seconds
    THREE_DAYS = 3 * 24 * 60 * 60, // 259200 seconds
    ONE_WEEK = 7 * 24 * 60 * 60, // 604800 seconds
    ONE_MONTH = 30 * 24 * 60 * 60, // Approx. 2592000 seconds, typically used in financial charts
}


export const TIME_BUCKET_MAPPING = {
    [EOHLC.ONE_SECOND]: "date_trunc('second', timestamp)",
    [EOHLC.FIVE_SECONDS]: "date_trunc('second', timestamp) - INTERVAL '1 second' * (EXTRACT(second FROM timestamp)::int % 5)",
    [EOHLC.FIVE_SECONDS + 1]: 'TO_TIMESTAMP(FLOOR(EXTRACT(epoch FROM timestamp) / 5) * 5)',
    [EOHLC.ONE_MINUTE]: "date_trunc('minute', timestamp)",
    [EOHLC.FIVE_MINUTES]: "date_trunc('minute', timestamp) - INTERVAL '1 minute' * (EXTRACT(minute FROM timestamp)::int % 5)",
    [EOHLC.FIFTEEN_MINUTES]: "date_trunc('minute', timestamp) - INTERVAL '1 minute' * (EXTRACT(minute FROM timestamp)::int % 15)",
    [EOHLC.ONE_HOUR]: "date_trunc('hour', timestamp)",
    [EOHLC.TWO_HOURS]: "date_trunc('minute', timestamp) - INTERVAL '1 minute' * (EXTRACT(minute FROM timestamp)::int % 120)",
    [EOHLC.FOUR_HOURS]: "date_trunc('minute', timestamp) - INTERVAL '1 minute' * (EXTRACT(minute FROM timestamp)::int % 240)",
    [EOHLC.EIGHT_HOURS]: "date_trunc('minute', timestamp) - INTERVAL '1 minute' * (EXTRACT(minute FROM timestamp)::int % 480)",
    [EOHLC.TWELVE_HOURS]: "date_trunc('minute', timestamp) - INTERVAL '1 minute' * (EXTRACT(minute FROM timestamp)::int % 720)",
    [EOHLC.ONE_DAY]: "date_trunc('day', timestamp)",
    [EOHLC.THREE_DAYS]: "date_trunc('minute', timestamp) - INTERVAL '1 minute' * (EXTRACT(minute FROM timestamp)::int % 4320)",
    [EOHLC.ONE_WEEK]: "date_trunc('minute', timestamp) - INTERVAL '1 minute' * (EXTRACT(minute FROM timestamp)::int % 10080)",
    [EOHLC.ONE_MONTH]: "date_trunc('minute', timestamp) - INTERVAL '1 minute' * (EXTRACT(minute FROM timestamp)::int % 43200)",
};