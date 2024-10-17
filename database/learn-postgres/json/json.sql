CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    attributes JSONB
);

INSERT INTO products (name, attributes)
VALUES 
('Product 1', '{"color": "red", "size": "M", "in_stock": true}'),
('Product 2', '{"color": "blue", "size": "L", "in_stock": false}');
INSERT INTO products (name, attributes)
VALUES 
('Product 3', '{"dimensions": {"length": 10, "width": 5}, "in_stock": true}');
INSERT INTO products (name, attributes)
VALUES ('Product 4', '{"tags": ["new", "sale", "popular"]}');

CREATE INDEX products_attributes_color_jsonb_idx1 ON products ((attributes->>'color'));
CREATE INDEX products_attributes_color_jsonb_idx2 ON products USING gin((attributes->'color') jsonb_ops);
CREATE INDEX products_attributes_jsonb_idx ON products USING gin(attributes jsonb_path_ops);


-- get a field
SELECT name, attributes->>'color' AS color
FROM products;

SELECT name, attributes->'dimensions'->>'length' AS length
FROM products;

-- condition on a field
SELECT * 
FROM products
WHERE attributes->>'color' = 'red';

SELECT * 
FROM products
WHERE attributes @> '{"in_stock": true}';

SELECT * 
FROM products
-- WHERE attributes->'dimensions'->>'length' = '10';
WHERE (attributes->'dimensions'->>'length')::INT = '10';

-- update a field
UPDATE products
SET attributes = jsonb_set(attributes, '{color}', '"new color: green"')
WHERE name = 'Product 1';

-- add a new field
UPDATE products
SET attributes = jsonb_set(attributes, '{material}', '"cotton"', true)
WHERE name = 'Product 1';

-- delete a field
UPDATE products
SET attributes = attributes - 'material'
WHERE name = 'Product 1';

-- INSERT INTO products (name, attributes)
-- VALUES ('Product 4', '{"tags": ["new", "sale", "popular"]}');

SELECT * 
FROM products
-- WHERE attributes->'tags' @> '["new"]';
WHERE attributes->'tags' @> '["new","popular"]';

-- unwind array in json: Truy cập từng phần tử trong mảng
SELECT name, jsonb_array_elements(attributes->'tags') AS tag
FROM products
WHERE name = 'Product 4';


