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

-- Tạo thêm các phân vùng khác tương tự
