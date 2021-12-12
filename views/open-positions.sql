DROP VIEW IF EXISTS open_positions;
CREATE OR REPLACE VIEW open_positions AS
WITH open_positions as (
    SELECT symbol, strategy, sum(quantity)
    from trades
    GROUP BY symbol, strategy
    having sum(quantity) <> 0
)

SELECT t.strategy,
       trade_date,
       root,
       t.action,
       expiration,
       type,
       strike,
       total_cost,
       asset_type,
       a.name,
       account_id
from open_positions op
         INNER JOIN trades t on (t.symbol = op.symbol and t.strategy = op.strategy) or
                                (t.root = op.symbol and t.strategy = op.strategy)
         INNER JOIN accounts a on t.account_id = a.id
ORDER BY root, trade_date DESC;