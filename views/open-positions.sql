DROP VIEW IF EXISTS open_positions;
CREATE OR REPLACE VIEW open_positions AS
WITH open_pos as (
    SELECT symbol,
           display as strategy_name,
           strategy,
           root,
           expiration,
           type,
           strike,
           asset_type,
           account_id
    from trades
             INNER JOIN strategies on strategies.name = trades.strategy
    group by symbol, strategy, strategies.display, root, expiration, type, strike, asset_type, account_id
    having sum(quantity) <> 0
),
     open_avgs as (
         SELECT op.symbol,
                op.strategy_name,
                op.strategy,
                op.root,
                round(weighted_avg(adjusted_price, quantity)::NUMERIC, 2) as avg_price,
                op.expiration,
                op.type,
                op.strike,
                op.asset_type,
                op.account_id
         from trades
                  INNER JOIN open_pos op on op.symbol = trades.symbol
         group by op.symbol, op.strategy_name, op.strategy, op.root, op.expiration, op.type, op.strike, op.asset_type,
                  op.account_id
     )

SELECT oa.symbol,
       oa.strategy_name,
       oa.strategy,
       oa.root,
       oa.avg_price,
       sum(t.total_cost) as book_cost,
       sum(t.quantity)   as quantity,
       oa.expiration,
       oa.type,
       oa.strike,
       oa.asset_type,
       oa.account_id,
       a.name,
       t.user_id
from open_avgs oa
         INNER JOIN trades t on t.symbol = oa.symbol
         INNER JOIN accounts a on t.account_id = a.id
GROUP BY oa.symbol, oa.strategy_name, oa.strategy, oa.root, oa.avg_price, oa.expiration, oa.type, oa.strike,
         oa.asset_type,
         oa.account_id, a.name, t.user_id;

