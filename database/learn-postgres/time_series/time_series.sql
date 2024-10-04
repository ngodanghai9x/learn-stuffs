CREATE TABLE time_series_data (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP NOT NULL,
    price DECIMAL
);

-- Chèn dữ liệu mẫu
INSERT INTO
    time_series_data (timestamp, price)
VALUES
    ('2024-09-13 12:00:01', 100),
    ('2024-09-13 12:00:04', 101),
    ('2024-09-13 12:00:08', 102),
    ('2024-09-13 12:04:59', 103),
    ('2024-09-13 12:05:00', 104),
    ('2024-09-13 15:59:59', 105),
    ('2024-09-13 16:00:00', 106),
    ('2024-09-20 12:00:00', 107);

SELECT
    timestamp,
    TO_TIMESTAMP(
        FLOOR(
            EXTRACT(
                epoch
                FROM
                    timestamp
            ) / 5
        ) * 5
    ) AS rounded_to_5_sec,
    date_trunc('second', timestamp) - INTERVAL '1 second' * (
        EXTRACT(
            second
            FROM
                timestamp
        ) :: int % 5
    ) AS rounded_to_5_sec_v2,
    price
FROM
    time_series_data;

-- timestamp	rounded_to_5_sec	price
-- 2024-09-13 12:00:01	2024-09-13 12:00:00	100
-- 2024-09-13 12:00:04	2024-09-13 12:00:00	101
-- 2024-09-13 12:00:08	2024-09-13 12:00:05	102
-- 2024-09-13 12:04:59	2024-09-13 12:04:55	103
-- 2024-09-13 12:05:00	2024-09-13 12:05:00	104
SELECT
    timestamp,
    date_trunc('minute', timestamp) - INTERVAL '1 minute' * (
        EXTRACT(
            minute
            FROM
                timestamp
        ) :: int % 5
    ) AS rounded_to_5_min,
    price
FROM
    time_series_data;

-- timestamp	rounded_to_5_min	price
-- 2024-09-13 12:00:01	2024-09-13 12:00:00	100
-- 2024-09-13 12:00:04	2024-09-13 12:00:00	101
-- 2024-09-13 12:00:08	2024-09-13 12:00:00	102
-- 2024-09-13 12:04:59	2024-09-13 12:00:00	103
-- 2024-09-13 12:05:00	2024-09-13 12:05:00	104
-- ======================================
WITH temp_tb_txn AS (
    SELECT
        timestamp AS raw_timestamp,
        DATE_TRUNC('MINUTE', timestamp) AS rounded_timestamp,
        txn_hash,
        base_amount,
        price_usd as priceUsd,
        ROW_NUMBER() OVER (
            PARTITION BY timestamp
            ORDER BY
                timestamp ASC
        ) AS rn_open2,
        RANK() OVER (
            PARTITION BY DATE_TRUNC('MINUTE', timestamp)
            ORDER BY
                timestamp ASC
        ) AS rank_open,
        ROW_NUMBER() OVER (
            PARTITION BY DATE_TRUNC('MINUTE', timestamp)
            ORDER BY
                timestamp ASC
        ) AS row_num_open,
        ROW_NUMBER() OVER (
            PARTITION BY DATE_TRUNC('MINUTE', timestamp)
            ORDER BY
                timestamp DESC
        ) AS row_num_close
    FROM
        history_txn
    WHERE
        pool_id IN ('BEt8jdFtc1cyiLC1ofakF22ayTyU4D6fLtHFmzUujGeU')
        AND price_usd > 0
        AND price_usd * base_amount > 0.0001
        AND type IN ('buy', 'sell')
        AND block_date = '2024-10-02'
        AND timestamp >= '2024-10-02T03:39:39.000Z'
        AND timestamp < '2024-10-03T03:39:39.000Z'
)
SELECT
    rounded_timestamp AS timestamp,
    MAX(
        CASE
            WHEN row_num_open = 1 THEN priceUsd
        END
    ) AS open,
    MAX(priceUsd) AS high,
    MIN(priceUsd) AS low,
    MAX(
        CASE
            WHEN row_num_close = 1 THEN priceUsd
        END
    ) AS close,
    SUM(priceUsd * base_amount) AS volume,
    STRING_AGG(txn_hash, ', ') as txn_hash
FROM
    temp_tb_txn as t
GROUP BY
    rounded_timestamp
ORDER BY
    rounded_timestamp DESC
LIMIT
    100;