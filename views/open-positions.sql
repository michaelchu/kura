DROP VIEW IF EXISTS open_positions;
CREATE OR REPLACE VIEW open_positions AS
WITH grouped_trades_open as (
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
    where action = 'BTO'
       or action = 'STO'
    group by symbol, action, strategy, root, expiration, type, strike, asset_type, account_id
),
     grouped_trades_closed as (
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
         where action <> 'BTO'
           and action <> 'STO'
         group by symbol, action, strategy, root, expiration, type, strike, asset_type, account_id
     ),
     agg_trades as (
         SELECT *
         from grouped_trades_open
         UNION ALL
         SELECT *
         from grouped_trades_closed
     )

SELECT symbol,
       strategy,
       root,
       sum(quantity) as quantity,
       expiration,
       type,
       strike,
       asset_type,
       account_id,
       u.id          as user_id
FROM agg_trades
         INNER JOIN accounts a ON agg_trades.account_id = a.id
         INNER JOIN users u on a.user_id = u.id
group by symbol, strategy, root, expiration, type, strike, asset_type, account_id, u.id
having sum(quantity) <> 0;
