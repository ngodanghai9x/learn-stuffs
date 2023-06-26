SELECT @@system_time_zone, @@global.time_zone, @@session.time_zone;
SELECT TIMEDIFF(NOW(), UTC_TIMESTAMP) as GMT_TIME_DIFF;