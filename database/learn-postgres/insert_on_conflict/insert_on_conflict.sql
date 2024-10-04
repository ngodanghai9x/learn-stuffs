INSERT INTO
    trader (pair, maker, balance, pnl)
VALUES
    ('BTC/USD', 'Binance', 1000, 200),
    ('ETH/USD', 'Coinbase', 500, 150) ON CONFLICT (pair, maker) DO
UPDATE
SET
    balance = trader.balance + EXCLUDED.balance, -- Cộng thêm balance từ bản ghi mới
    pnl = trader.pnl; -- Giữ nguyên pnl từ bản ghi cũ
