WITH open_positons as (
    SELECT t.root,
           t.symbol,
           t.expiration,
           t.strike,
           t.type,
           sum(t.quantity) as quantity,
           t.strategy
    from trades t
    group by t.root, t.symbol, t.expiration, t.strategy, t.strike, t.type
    having sum(quantity) <> 0
)

SELECT t.account_id,
       t.trade_date,
       t.action,
       op.symbol,
       op.root,
       op.expiration,
       op.type,
       op.strike,
       t.quantity,
       t.price,
       t.fee,
       t.strategy,
       t.asset_type,
       current_date - t.trade_date as days_in_trade
from open_positons op
         INNER JOIN transactions t on t.symbol = op.symbol
