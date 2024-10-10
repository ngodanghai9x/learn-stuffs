-- === RANGE PARTITION ===
-- Tạo Sequence (nếu chưa tồn tại)
CREATE SEQUENCE IF NOT EXISTS reward_metrics_id_seq;

-- Tạo Bảng Chính (Partitioned Table)
CREATE TABLE IF NOT EXISTS "reward_metrics" (
    "id" BIGINT NOT NULL DEFAULT nextval('reward_metrics_id_seq'::regclass) PRIMARY KEY,
    "type" VARCHAR NOT NULL,
    "rewarder_user_id" BIGINT NULL,
    "rewarded_user_id" BIGINT NULL,
    "volume" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "metadata" JSONB NULL,
    "created_at" timestamp(6) DEFAULT now() NOT NULL,
    CONSTRAINT "FK__users_rewarder_user_id" FOREIGN KEY ("rewarder_user_id") REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT "FK__users_rewarded_user_id" FOREIGN KEY ("rewarded_user_id") REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION,
    CONSTRAINT "FK__trades_trade_id" FOREIGN KEY ("trade_id") REFERENCES "trades" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION
) PARTITION BY RANGE (created_at);

-- Tạo Bảng Con (Partitions) cho năm 2024
CREATE TABLE IF NOT EXISTS reward_metrics_2024_01 PARTITION OF "reward_metrics"
    FOR VALUES FROM ('2024-01-01 00:00:00') TO ('2024-02-01 00:00:00');

CREATE TABLE IF NOT EXISTS reward_metrics_2024_02 PARTITION OF "reward_metrics"
    FOR VALUES FROM ('2024-02-01 00:00:00') TO ('2024-03-01 00:00:00');

CREATE TABLE IF NOT EXISTS reward_metrics_2024_03 PARTITION OF "reward_metrics"
    FOR VALUES FROM ('2024-03-01 00:00:00') TO ('2024-04-01 00:00:00');

-- === HASH PARTITION ===
CREATE TABLE trader (
    name TEXT,
    poolId VARCHAR,  -- cột poolId là chuỗi (string)
    balance NUMERIC,
    pnl NUMERIC,
    sold NUMERIC,
    created_at TIMESTAMP
) PARTITION BY HASH (poolId);

-- Với Hash Partitioning, bạn cần xác định số lượng phân vùng, và PostgreSQL sẽ tự động phân phối dữ liệu 
-- giữa các phân vùng dựa trên giá trị băm của poolId.
-- Ví dụ: chia bảng thành 8 phân vùng:

CREATE TABLE trader_part_0 PARTITION OF trader
    FOR VALUES WITH (MODULUS 8, REMAINDER 0);

CREATE TABLE trader_part_1 PARTITION OF trader
    FOR VALUES WITH (MODULUS 8, REMAINDER 1);

CREATE TABLE trader_part_2 PARTITION OF trader
    FOR VALUES WITH (MODULUS 8, REMAINDER 2);

CREATE TABLE trader_part_3 PARTITION OF trader
    FOR VALUES WITH (MODULUS 8, REMAINDER 3);

CREATE TABLE trader_part_4 PARTITION OF trader
    FOR VALUES WITH (MODULUS 8, REMAINDER 4);

CREATE TABLE trader_part_5 PARTITION OF trader
    FOR VALUES WITH (MODULUS 8, REMAINDER 5);

CREATE TABLE trader_part_6 PARTITION OF trader
    FOR VALUES WITH (MODULUS 8, REMAINDER 6);

CREATE TABLE trader_part_7 PARTITION OF trader
    FOR VALUES WITH (MODULUS 8, REMAINDER 7);

-- Giải thích:
-- MODULUS 8: Chỉ định rằng bảng sẽ được chia thành 8 phân vùng.
-- REMAINDER: Mỗi phân vùng sẽ lưu trữ các giá trị poolId có giá trị băm tương ứng với phần dư cụ thể khi chia giá trị băm cho 8.

-- === MIXED PARTITION ===
-- Tạo bảng chính với partitioning theo range
CREATE TABLE trader (
    name TEXT NOT NULL,
    poolId TEXT NOT NULL,
    balance NUMERIC NULL,
    pnl NUMERIC NULL,
    sold NUMERIC NULL,
    created_at TIMESTAMP DEFAULT now() NOT NULL,
    poolCreatedAt TIMESTAMP DEFAULT now() NOT NULL
) PARTITION BY RANGE (poolCreatedAt);

-- Tạo partition theo năm 2023
CREATE TABLE trader_2023 PARTITION OF trader
    FOR VALUES FROM ('2023-01-01') TO ('2024-01-01')
    PARTITION BY HASH (poolId);

-- Tạo partition hash cho năm 2023, hash theo poolId với module 10
CREATE TABLE trader_2023_hash_0 PARTITION OF trader_2023
    FOR VALUES WITH (MODULUS 10, REMAINDER 0);

CREATE TABLE trader_2023_hash_1 PARTITION OF trader_2023
    FOR VALUES WITH (MODULUS 10, REMAINDER 1);

-- Tương tự cho các giá trị từ 2 đến 9
CREATE TABLE trader_2023_hash_2 PARTITION OF trader_2023
    FOR VALUES WITH (MODULUS 10, REMAINDER 2);

-- Lặp lại cho tất cả các năm bạn muốn phân vùng
CREATE TABLE trader_2024 PARTITION OF trader
    FOR VALUES FROM ('2024-01-01') TO ('2025-01-01')
    PARTITION BY HASH (poolId);

CREATE TABLE trader_2024_hash_0 PARTITION OF trader_2024
    FOR VALUES WITH (MODULUS 10, REMAINDER 0);

-- Và tiếp tục cho các phần còn lại...

-- Bạn có thể tiếp tục thêm partition theo năm và hash theo poolId cho các năm tiếp theo.


