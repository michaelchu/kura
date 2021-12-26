DROP VIEW IF EXISTS dashboard_stats;
CREATE OR REPLACE VIEW dashboard_stats AS
WITH total_pnl as (
    SELECT SUM(realized_pnl) * -1 as total_pnl, user_id
    from closed_positions
    GROUP BY user_id
),
     total_fees as (
         SELECT SUM(fee) as total_fees, user_id
         from transactions
                  INNER JOIN accounts a on transactions.account_id = a.id
         group by user_id
     ),
     avg_pnl as (
         SELECT round(AVG(realized_pnl), 2) * -1 as avg_pnl, user_id
         from closed_positions
         GROUP BY user_id
     ),
     win_count as (
         SELECT COUNT(*) as win_count, user_id
         from closed_positions
         WHERE realized_pnl < 0
         GROUP BY user_id
     ),
     total_closed_pos as (
         SELECT COUNT(*) as total_count, user_id
         from closed_positions
         GROUP BY user_id
     )

SELECT total_pnl, total_fees, avg_pnl, win_count / total_count * 100 as win_rate, total_pnl.user_id
from total_pnl
         INNER join total_fees ON total_pnl.user_id = total_fees.user_id
         INNER join avg_pnl ON total_pnl.user_id = avg_pnl.user_id
         INNER join win_count ON total_pnl.user_id = win_count.user_id
         INNER join total_closed_pos ON total_pnl.user_id = total_closed_pos.user_id


