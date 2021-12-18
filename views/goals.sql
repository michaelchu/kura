DROP VIEW IF EXISTS goals_and_progress;
CREATE VIEW goals_and_progress AS
SELECT g.user_id,
       g.interval,
       date_trunc('month', t.exit_date)::DATE as period,
       t.root,
       t.strategy,
       sum(t.realized_pnl)                    as current,
       g.value                                as goal
FROM closed_positions t
         INNER JOIN goals g on t.root = g.symbol and g.interval = 'MONTHLY'
GROUP BY g.user_id, date_trunc('month', t.exit_date), t.root, t.strategy, g.value, g.interval
UNION
SELECT g.user_id,
       g.interval,
       date_trunc('week', t.exit_date)::DATE as period,
       t.root,
       t.strategy,
       sum(t.realized_pnl)                   as current,
       g.value                               as goal
FROM closed_positions t
         INNER JOIN goals g on t.root = g.symbol and g.interval = 'WEEKLY'
GROUP BY g.user_id, date_trunc('week', t.exit_date), g.interval, t.root, t.strategy, g.value
