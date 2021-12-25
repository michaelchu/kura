DROP VIEW IF EXISTS trades CASCADE;
CREATE VIEW trades as
WITH options as (
    SELECT t.strategy,
           s.display                                                            as strategy_name,
           t.symbol,
           t.action,
           ac.label                                                             as action_name,
           t.asset_type,
           t.trade_date,
           t.fee,
           t.price,
           t.quantity,
           a.name                                                               as account_name,
           a.id                                                                 as account_id,
           u.id                                                                 as user_id,
           sum((t.price::numeric * t.quantity::numeric * 100) + t.fee::numeric) as total_cost,
           regexp_matches(t.symbol, '^(.+)([0-9]{6})([PC])([0-9]+)$')           as block
    from transactions t
             INNER JOIN accounts a on t.account_id = a.id
             INNER JOIN actions ac on ac.name = t.action
             INNER JOIN users u on a.user_id = u.id
             INNER JOIN strategies s on t.strategy = s.name
    where asset_type = 'option'
    group by t.strategy, s.name, t.symbol, t.asset_type, t.trade_date, t.price, t.strategy, t.quantity, a.name, t.fee,
             t.action,
             ac.label,
             a.id, u.id
)
SELECT options.trade_date,
       options.symbol,
       CONCAT(options.block[1], ' ', to_char(to_date(options.block[2], 'YYMMDD'), 'DD Mon YY'), ' ', options.block[4],
              ' ',
              options.block[3])                    as display,
       options.action,
       options.action_name,
       options.strategy,
       options.strategy_name,
       options.block[1]                            as root,
       options.quantity,
       options.price,
       options.total_cost / 100 / options.quantity as adjusted_price,
       options.fee,
       options.total_cost,
       to_date(options.block[2], 'YYMMDD')         as expiration,
       options.block[3]                            as type,
       options.block[4]                            as strike,
       options.asset_type,
       options.account_name,
       options.account_id,
       options.user_id
from options
UNION
SELECT trade_date,
       t.symbol,
       t.symbol                                       as display,
       t.action,
       ac.label                                       as action_name,
       t.strategy,
       s.display                                      as strategy_name,
       t.symbol                                       as root,
       t.quantity,
       t.price,
       sum((t.price * t.quantity) + fee) / t.quantity as adjusted_price,
       t.fee,
       sum((t.price * t.quantity) + fee)              as total_cost,
       null                                           as expiration,
       null                                           as type,
       null                                           as strike,
       asset_type,
       a.name                                         as account_name,
       a.id                                           as account_id,
       u.id                                           as user_id
from transactions t
         INNER JOIN accounts a on t.account_id = a.id
         INNER JOIN actions ac on ac.name = t.action
         INNER JOIN users u on a.user_id = u.id
         INNER JOIN strategies s on t.strategy = s.name
where asset_type = 'stock'
group by t.strategy, t.symbol, t.asset_type, t.trade_date, t.price, t.strategy, s.name, t.quantity, t.fee,
         t.action, ac.label,
         a.name, a.id, u.id
order by root, strategy, trade_date desc;