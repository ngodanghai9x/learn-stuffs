CREATE SEQUENCE IF NOT EXISTS haind_metrics_id_seq;

CREATE TABLE IF NOT EXISTS "haind_metrics" (
    "id" BIGINT NOT NULL DEFAULT nextval('haind_metrics_id_seq' :: regclass) PRIMARY KEY,
    "click_count" BIGINT NOT NULL DEFAULT '0',
    "claimed_count" BIGINT NOT NULL DEFAULT '0',
    "transactions_count" BIGINT NOT NULL DEFAULT '0',
    "total_volume_usd" DOUBLE PRECISION NOT NULL DEFAULT '0',
    "metadata" JSONB NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
);

SELECT pg_get_serial_sequence('haind_metrics', 'id') AS sequence_name;
SELECT setval('haind_metrics_id_seq', (SELECT MAX(id) FROM haind_metrics), TRUE);