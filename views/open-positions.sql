DROP VIEW IF EXISTS open_positions;
CREATE OR REPLACE VIEW open_positions AS
WITH open_positions AS (
    SELECT trades.root,
           trades.strategy,
           trades.asset_type,
           sum(trades.quantity) AS sum
    FROM trades
    GROUP BY trades.root, trades.strategy, trades.asset_type
    HAVING sum(trades.quantity) <> 0
)
SELECT s.display AS strategy,
       t.trade_date,
       t.root,
       t.action,
       t.quantity,
       t.expiration,
       t.type,
       t.strike,
       t.total_cost,
       t.asset_type,
       a.name,
       t.account_id
FROM open_positions op
         JOIN trades t
              ON (t.root = op.root AND t.strategy = op.strategy and t.asset_type = op.asset_type)
         JOIN accounts a ON t.account_id = a.id
         JOIN strategies s ON op.strategy = s.name
ORDER BY t.root, t.trade_date DESC;