DROP VIEW IF EXISTS pnl_chart;
CREATE OR REPLACE VIEW pnl_chart AS
WITH base as (
    SELECT to_char(generate_series(date_trunc('month', (now() - interval '5 month')),
                                   (date_trunc('month', now()) + interval '1 month - 1 day')::date,
                                   interval '1 month')::DATE, 'MM') as period,
           0                                                        as realized_pnl,
           strategy,
           user_id
    from closed_positions
    group by user_id, strategy
),
     series as (
         SELECT to_char(exit_date, 'MM') as period,
                sum(realized_pnl)        as realized_pnl,
                strategy,
                user_id
         from closed_positions cp
         where cp.exit_date >= date_trunc('month', now() - interval '5 month')::DATE
           and cp.exit_date <= now()
         group by to_char(exit_date, 'MM'), to_char(exit_date, 'Mon'), cp.strategy, user_id
         order by to_char(exit_date, 'MM'), to_char(exit_date, 'Mon'), cp.strategy, user_id
     )
        ,
     all_base as (
         SELECT *
         from base
         UNION ALL
         SELECT *
         from series
     )

SELECT period, sum(realized_pnl) as realized_pnl, strategy, user_id
FROM all_base
GROUP BY period, strategy, user_id
ORDER BY period, strategy;
