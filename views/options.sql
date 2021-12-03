SELECT regexp_matches(symbol, '^(.+)([0-9]{6})([PC])([0-9]+)$') as block
from transactions
where asset_type = 'option';