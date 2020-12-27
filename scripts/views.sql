-- Options Income by symbol, month and year
CREATE VIEW options_income_by_symbol_month as
SELECT DATE_TRUNC('month', trade_date)            as month,
       underlying_symbol,
       account_id,
       sum((quantity * price * 100) + commission) as amount
from transactions
WHERE option_type is not null
GROUP BY underlying_symbol, DATE_TRUNC('month', trade_date), account_id;

CREATE VIEW options_income_by_symbol_year as
SELECT DATE_TRUNC('year', trade_date)             as year,
       underlying_symbol,
       account_id,
       sum((quantity * price * 100) + commission) as amount
from transactions
WHERE option_type is not null
GROUP BY underlying_symbol, DATE_TRUNC('year', trade_date), account_id;
