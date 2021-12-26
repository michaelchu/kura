DROP VIEW IF EXISTS pnl_comp_chart;
CREATE OR REPLACE VIEW pnl_comp_chart AS
WITH base as (
    SELECT generate_series(date_trunc('month', min(exit_date)),
                           (date_trunc('month', max(exit_date)) + interval '1 month - 1 day')::date,
                           interval '1 day')::DATE as exit_date,
           0                                       as realized_pnl,
           user_id
    from closed_positions
    group by user_id
),
     series as (
         SELECT base.exit_date,
                sum(base.realized_pnl + coalesce(cp.realized_pnl, 0)) as grouped_realized_pnl,
                base.user_id
         from base
                  left join closed_positions cp on cp.exit_date = base.exit_date
         where base.exit_date >= date_trunc('month', now() - interval '1 month')::DATE
           and base.exit_date <= now()
         group by base.exit_date, base.user_id
         order by base.exit_date, base.user_id
     )
SELECT exit_date,
       SUM(grouped_realized_pnl) OVER (PARTITION BY ea_month ORDER BY exit_date) as cumulated_pnl,
       CASE
           WHEN extract(MONTH from exit_date) = extract(MONTH from now()) THEN 'CURRENT_MONTH'
           ELSE 'PREVIOUS_MONTH' END                                             as period,
       extract(DAY from exit_date)                                               as day,
       user_id
from (SELECT exit_date,
             SUM(grouped_realized_pnl)   as grouped_realized_pnl,
             to_char(exit_date, 'Month') AS ea_month,
             user_id
      from series
      GROUP BY exit_date, to_char(exit_date, 'Month'), user_id) as sub
ORDER BY exit_date;