DROP VIEW IF EXISTS closed_positions;
CREATE VIEW closed_positions as
WITH grouped_trades as (
    SELECT symbol,
           action,
           strategy,
           root,
           max(trade_date) as trade_date,
           sum(quantity)   as quantity,
           sum(total_cost) as total_cost,
           sum(fee)        as fees,
           expiration,
           type,
           strike,
           asset_type,
           account_id
    from trades
    group by symbol, action, strategy, root, expiration, type, strike, asset_type, account_id
)

SELECT s.display                      as strategy,
       s.name                         as strategy_name,
       t.symbol,
       t.root,
       t.expiration,
       t.trade_date                   as entry_date,
       t2.trade_date                  as exit_date,
       t2.trade_date - t.trade_date   as days_in_trade,
       t.total_cost                   as original_cost,
       t2.total_cost                  as exit_cost,
       (t2.fees + t.fee)              as total_fees,
       (t2.total_cost + t.total_cost) as realized_pnl,
       a.name
from trades t
         INNER JOIN grouped_trades t2
                    on t.symbol = t2.symbol and t.strategy = t2.strategy and t.account_id = t2.account_id
         inner join accounts a on t.account_id = a.id
         inner join strategies s on t.strategy = s.name
where (t.action = 'BTO' or t.action = 'STO')
  and (t2.action <> 'BTO' and t2.action <> 'STO');
