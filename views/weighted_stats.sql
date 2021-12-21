-- Weighted Average
CREATE OR REPLACE FUNCTION _rolling_avg(accumulator double precision[], value numeric, weight numeric)
RETURNS double precision[] AS $$
DECLARE
    mean_x double precision := accumulator[1];
    n bigint := accumulator[2]::bigint;
    mean_y double precision := value;
    m bigint := weight;
BEGIN
    IF weight = 0 THEN -- Do nothing
        RETURN accumulator;
    ELSE
        RETURN ARRAY[mean_x - (m*mean_x - m*mean_y)/(n + m), n + m];
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION _final_weighted_avg(accumulator double precision[])
RETURNS double precision AS $$
BEGIN
    RETURN accumulator[1];
END;
$$ LANGUAGE plpgsql;

CREATE AGGREGATE weighted_avg(numeric, numeric) (
    SFUNC=_rolling_avg,
    STYPE=double precision[],
    FINALFUNC=_final_weighted_avg,
    INITCOND='{0, 0}' -- First value is mean, second is N
);
