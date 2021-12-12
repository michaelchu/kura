DROP VIEW IF EXISTS open_positions_cb;
CREATE OR REPLACE VIEW open_positions_cb AS
WITH open_positions as (
    SELECT symbol, strategy, sum(quantity)
    from trades
    GROUP BY symbol, strategy
    having sum(quantity) <> 0
),
     total_stock as (
         SELECT s.display     as strategy,
                t.root,
                sum(quantity) as total_quantity,
                a.name,
                account_id
         from open_positions op
                  INNER JOIN trades t on (t.symbol = op.symbol and t.strategy = op.strategy) or
                                         (t.root = op.symbol and t.strategy = op.strategy)
                  INNER JOIN accounts a on t.account_id = a.id
                  INNER JOIN strategies s on op.strategy = s.name
         where op.strategy = 'covered_call'
           and t.asset_type = 'stock'
         group by s.display, t.root, a.name, account_id, asset_type
     ),
     total_cost as (
         SELECT s.display       as strategy,
                t.root,
                sum(total_cost) as total_cost,
                a.name,
                account_id
         from open_positions op
                  INNER JOIN trades t on (t.symbol = op.symbol and t.strategy = op.strategy) or
                                         (t.root = op.symbol and t.strategy = op.strategy)
                  INNER JOIN accounts a on t.account_id = a.id
                  INNER JOIN strategies s on op.strategy = s.name
         where op.strategy = 'covered_call'
         group by s.display, t.root, a.name, account_id
     )

SELECT ts.strategy, ts.root, ROUND((total_cost / total_quantity), 2) as cost_basis, ts.account_id, ts.name
from total_stock ts
         INNER JOIN total_cost tc on ts.strategy = tc.strategy and tc.account_id = ts.account_id;


