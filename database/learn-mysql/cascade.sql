-- ON UPDATE
-- Tùy chọn. Cho biết sẽ làm gì với dữ liệu con khi dữ liệu mẹ được cập nhật. Có các lựa chọn NO ACTION, CASCADE, SET NULL và SET DEFAULT.

-- NO ACTION
-- Dùng với ON DELETE hoặc ON UPDATE, nghĩa là không làm gì với dữ liệu con khi dữ liệu mẹ bị xóa hoặc cập nhật.

-- CASCADE
-- Dùng với ON DELETE hoặc ON UPDATE, nghĩa là dữ liệu con bị xóa hoặc cập nhật khi dữ liệu mẹ bị xóa hoặc cập nhật.

-- SET NULL
-- Dùng với ON DELETE hoặc ON UPDATE, nghĩa là dữ liệu con được đặt là NULL khi dữ liệu mẹ bị xóa hoặc cập nhật.

-- SET DEFAULT
-- Dùng với ON DELETE hoặc ON UPDATE, nghĩa là dữ liệu con được đặt thành giá trị mặc định khi dữ liệu mẹ bị xóa hoặc cập nhật.


CREATE TABLE user (
  id int NOT NULL AUTO_INCREMENT,
  email varchar(255) NOT NULL,
  full_name varchar(255) NULL,
  password varchar(64) NULL COMMENT 'SHA-256 CHAR(64)',
  is_active tinyint NOT NULL DEFAULT 1,
  role_id int NOT NULL,
  UNIQUE INDEX IDX_e12875dfb3b1d92d7d7c5377e2 (email),
  PRIMARY KEY (id)
) ENGINE = InnoDB;

CREATE TABLE role (
  id int NOT NULL AUTO_INCREMENT,
  role_name varchar(255) NOT NULL,
  PRIMARY KEY (id)
) ENGINE = InnoDB;

ALTER TABLE
  user
ADD
  CONSTRAINT FK_fb2e442d14add3cefbdf33c4561 FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE ON UPDATE NO ACTION;

INSERT INTO
  `role` (`id`, `role_name`)
VALUES
  ('1', 'admin'),
  ('2', 'dev');

INSERT INTO
  `user` (`email`, `full_name`, `password`, `role_id`)
VALUES
  (
    'admin1@gemvietnam.com',
    'Admin',
    '$2b$10$jG4Ph.7EtSw7Fro5IIftoupmf.gigjjA6A9fNZO330eHBLbtR/Mt6',
    1
  ),
  (
    'admin2@gemvietnam.com',
    'Admin',
    '$2b$10$jG4Ph.7EtSw7Fro5IIftoupmf.gigjjA6A9fNZO330eHBLbtR/Mt6',
    1
  ),
  (
    'dev1@gemvietnam.com',
    'dev1',
    '$2b$10$jG4Ph.7EtSw7Fro5IIftoupmf.gigjjA6A9fNZO330eHBLbtR/Mt6',
    2
  ),
  (
    'dev2@gemvietnam.com',
    'dev2',
    '$2b$10$jG4Ph.7EtSw7Fro5IIftoupmf.gigjjA6A9fNZO330eHBLbtR/Mt6',
    2
  );