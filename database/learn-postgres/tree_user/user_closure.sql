CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR
);

CREATE TABLE user_closure (
    ancestor INT NOT NULL,       -- ID của tổ tiên
    descendant INT NOT NULL,    -- ID của hậu duệ
    depth INT NOT NULL,          -- Độ sâu từ ancestor tới descendant
    isActivate BOOLEAN DEFAULT TRUE,          -- Độ sâu từ ancestor tới descendant
    PRIMARY KEY (ancestor, descendant),
    FOREIGN KEY (ancestor) REFERENCES users(id),
    FOREIGN KEY (descendant) REFERENCES users(id)
);
-- DEPTH = 0
INSERT INTO users (name) VALUES ('User A'); -- ID = 1
INSERT INTO user_closure (ancestor, descendant, depth) 
VALUES (1, 1, 0); -- Tổ tiên và hậu duệ là chính nó, độ sâu = 0

-- DEPTH = 1
-- SELECT MAX(depth) FROM user_closure WHERE 
INSERT INTO users (name) VALUES ('User B'); -- ID = 2
INSERT INTO user_closure (ancestor, descendant, depth)
SELECT ancestor, 2, depth + 1 FROM user_closure WHERE descendant = 1 -- Từ cha (User A)
UNION ALL
SELECT 2, 2, 0; -- Bản thân nó

-- DEPTH = 2
INSERT INTO users (name) VALUES ('User C'); -- ID = 3
INSERT INTO user_closure (ancestor, descendant, depth)
SELECT ancestor, 3, depth + 1 FROM user_closure WHERE descendant = 2 -- Từ cha (User B)
UNION ALL
SELECT 3, 3, 0; -- Bản thân nó


-- 1. Lấy tất cả con cháu của User A (ID = 1):
SELECT u.*
FROM users u
INNER JOIN user_closure uc ON u.id = uc.descendant
WHERE uc.ancestor = 1;
-- Kết quả: User A, User B, User C.

-- 2. Lấy tất cả cha tổ tiên của User C (ID = 3):
SELECT u.*
FROM users u
INNER JOIN user_closure uc ON u.id = uc.ancestor
WHERE uc.descendant = 3;
-- Kết quả: User A, User B, User C.

-- 3. Lấy độ sâu quan hệ giữa User A và User C:
SELECT depth
FROM user_closure
WHERE ancestor = 1 AND descendant = 3;
-- Kết quả: 2 (Quan hệ sâu 2 cấp từ User A đến User C).

-- Cancel subcription:
-- Update to false is activate
-- Get parent: 
    SELECT ancestor 
    FROM user_closure 
    WHERE descendant = 2 AND depth = 1;
-- Chuyển con của User 2 thành con của cha User 2:
    INSERT INTO user_closure (ancestor, descendant, depth)
    SELECT parent_closure.ancestor, child_closure.descendant, parent_closure.depth + child_closure.depth + 1
    FROM user_closure parent_closure
    JOIN user_closure child_closure ON parent_closure.descendant = 2
    WHERE parent_closure.depth >= 0 AND child_closure.depth > 0;


