CREATE OR REPLACE PROCEDURE log_event(
    event_name TEXT DEFAULT 'Unknown',
    event_level TEXT DEFAULT 'INFO',
    event_source TEXT DEFAULT 'System'
)
LANGUAGE plpgsql AS $$
BEGIN
    RAISE NOTICE 'Event: %, Level: %, Source: %', event_name, event_level, event_source;
END;
$$;

CALL log_event(
    event_name := 'Login Attempt',
    event_source := 'Mobile App'
); -- Sẽ dùng 'INFO' cho event_level


CREATE OR REPLACE FUNCTION get_event_summary(
    event_name TEXT DEFAULT 'Unknown',
    event_level TEXT DEFAULT 'INFO',
    event_source TEXT DEFAULT 'System'
) RETURNS TEXT AS $$
BEGIN
    RETURN FORMAT('Event: %s, Level: %s, Source: %s', event_name, event_level, event_source);
END;
$$ LANGUAGE plpgsql;

SELECT get_event_summary(
    event_name := 'File Upload',
    event_source := 'Mobile App'
); -- Sẽ dùng giá trị mặc định 'INFO' cho event_level

