DROP VIEW IF EXISTS transaction_costs;
CREATE OR REPLACE VIEW transaction_costs AS
with base as (
    SELECT t.id,
           symbol,
           trade_date,
           price,
           fee,
           CASE
               WHEN asset_type = 'option' THEN
                   (price * quantity * 100) + fee
               when asset_type = 'stock' THEN
                   (price * quantity) + fee
               END                                                    as total_cost,
           account_id,
           quantity,
           asset_type,
           action,
           a2.label                                                   as action_name,
           strategy,
           s.display                                                  as strategy_name,
           a.name                                                     as account_name,
           a.user_id,
           regexp_matches(t.symbol, '^(.+)([0-9]{6})([PC])([0-9]+)$') as block
    from transactions t
             inner join strategies s on t.strategy = s.name
             inner join accounts a on t.account_id = a.id
             inner join actions a2 on t.action = a2.name
)

SELECT id,
       symbol,
       trade_date,
       price,
       fee,
       total_cost,
       account_id,
       quantity,
       asset_type,
       action,
       action_name,
       strategy,
       strategy_name,
       account_name,
       user_id,
       CONCAT(base.block[1], ' ', to_char(to_date(base.block[2], 'YYMMDD'), 'DD Mon YY'), ' ', base.block[4],
              ' ',
              base.block[3]) as display
from base;

