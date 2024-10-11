INSERT INTO
    trader (pool_id, trader_address, balance, pnl)
VALUES
    ('BTC/USD', 'Binance', 1000, 200),
    ('ETH/USD', 'Coinbase', 500, 150) ON CONFLICT (pool_id, trader_address) DO
UPDATE
SET
    balance = trader.balance + EXCLUDED.balance, -- Cộng thêm balance từ bản ghi mới
    pnl = trader.pnl; -- Giữ nguyên pnl từ bản ghi cũ
