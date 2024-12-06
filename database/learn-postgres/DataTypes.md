
# PostgreSQL Data Types

This document lists the PostgreSQL data types, their value ranges, and examples.

## Numeric Types

| Type       | Description                           | Value Range                                             | Example       |
|------------|---------------------------------------|---------------------------------------------------------|---------------|
| `smallint` | 2-byte integer                        | -32,768 to 32,767                                       | 12345         |
| `integer`  | 4-byte integer                        | -2,147,483,648 to 2,147,483,647                         | 123456789     |
| `bigint`   | 8-byte integer                        | -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 | 1234567890123 |
| `decimal`  | User-specified precision, exact       | Up to 131072 digits before the decimal point            | 123.45        |
| `numeric`  | Same as `decimal`                     | Same as `decimal`                                       | 98765.4321    |
| `real`     | 4-byte floating-point number          | 6 decimal digits precision                              | 1.23e10       |
| `double precision` | 8-byte floating-point number  | 15 decimal digits precision                             | 1.23456789e50 |

## Character Types

| Type           | Description                 | Value Range                  | Example               |
|----------------|-----------------------------|------------------------------|-----------------------|
| `char(n)`      | Fixed-length string         | Up to 1GB                    | 'abc' (n = 3)         |
| `varchar(n)`   | Variable-length string      | Up to 1GB                    | 'hello world'         |
| `text`         | Unlimited-length string     | Up to 1GB                    | 'any text data'       |

## Date/Time Types

| Type           | Description               | Value Range                         | Example               |
|----------------|---------------------------|-------------------------------------|-----------------------|
| `date`         | Calendar date            | 4713 BC to 5874897 AD               | '2024-11-20'          |
| `timestamp`    | Date and time            | 4713 BC to 294276 AD                | '2024-11-20 10:30:00' |
| `timestamptz`  | Timestamp with time zone | 4713 BC to 294276 AD                | '2024-11-20 10:30:00+00' |
| `time`         | Time of day              | 00:00:00 to 24:00:00                | '13:45:30'            |
| `timetz`       | Time with time zone      | 00:00:00+/-14:00 to 24:00:00+/-14:00| '13:45:30+05:30'      |
| `interval`     | Time interval            | +/- 178000000 years                 | '1 year 2 months'     |

## Boolean Type

| Type    | Description  | Value Range           | Example |
|---------|--------------|-----------------------|---------|
| `boolean` | True/False | `true`, `false`, `null` | `true`  |

## JSON Types

| Type      | Description                     | Example                           |
|-----------|---------------------------------|-----------------------------------|
| `json`    | Text-based JSON data           | '{"key": "value"}'               |
| `jsonb`   | Binary JSON data               | '{"key": "value"}'               |

## Array Types

| Type        | Description             | Example                     |
|-------------|-------------------------|-----------------------------|
| `int[]`     | Array of integers       | `{1,2,3}`                   |
| `text[]`    | Array of text           | `{'hello','world'}`         |

## Special Types

| Type        | Description                  | Value Range              | Example |
|-------------|------------------------------|--------------------------|---------|
| `uuid`      | Universally unique identifier | 128-bit UUID             | `550e8400-e29b-41d4-a716-446655440000` |
| `bytea`     | Binary data                  | Sequence of bytes        | `\xDEADBEEF` |
| `xml`       | XML data                     | Valid XML format         | `<tag>value</tag>` |
| `cidr`      | IPv4 or IPv6 network address | Valid CIDR format        | `192.168.0.0/24` |
| `inet`      | IP address                   | Valid IPv4 or IPv6 address | `192.168.0.1` |

---

## Notes
- Value ranges for numeric types are approximate and may depend on hardware limitations.
- Character types like `text` are effectively unlimited in practical applications but are subject to storage limits.
- Arrays and JSON types allow complex and flexible data structures.

