DROP VIEW IF EXISTS transaction_costs;
CREATE VIEW transaction_costs AS
SELECT transactions.id,
       symbol,
       trade_date,
       price,
       fee,
       CASE
           WHEN asset_type = 'option' THEN
               (price * quantity * 100) + fee
           when asset_type = 'stock' THEN
               (price * quantity) + fee
           END   as total_cost,
       account_id,
       quantity,
       asset_type,
       action,
       a2.label  as action_name,
       strategy,
       s.display as strategy_name,
       a.name    as account_name
from trades
         inner join strategies s on trades.strategy = s.name
         inner join accounts a on trades.account_id = a.id
         inner join actions a2 on trades.action = a2.name