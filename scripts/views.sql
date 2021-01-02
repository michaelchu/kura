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

CREATE OR REPLACE VIEW transactions_by_account as
SELECT transactions.id,
       a.name                       as Account,
       action,
       commission,
       expiration,
       option_type,
       quantity,
       strike,
       price,
       trade_date,
       underlying_symbol            as "symbol",
       CASE
           WHEN option_type IS NOT NULL THEN
               price * quantity * 100
           ELSE
               price * quantity end as amount,
       CASE
           WHEN option_type is not null THEN
               price * quantity * 100 + commission
           ELSE
               price * quantity + commission
           END                      as amount_with_comm
from transactions
         INNER JOIN accounts a on transactions.account_id = a.id
ORDER BY trade_date DESC;
