create database demo_regex;
use demo_regex;

create table user (
	id int not null primary key auto_increment,
	name varchar(255) not null,
--    phone varchar(15),
    sex tinyint(4), -- 0: female, 1: male, 2: bi
	website varchar(255),
	email varchar(255),
	birthday date,
    decription varchar(2048),
    account_id int not null
);
collate='utf8mb4_vietnamese_ci';

create table account (
	id int not null primary key auto_increment,
	username varchar(50) not null,
	password varchar(50) not null,
    created_at timestamp default current_timestamp,
    modified_at timestamp default current_timestamp
);
collate='utf8mb4_vietnamese_ci';

alter table user add constraint fk_acc_id foreign key (account_id) references account(id);
alter table user add column phone varchar(25) after name;

insert into account (username, password) values ('haind3','123456');
insert into account (username, password) values ('admin','123456');
insert into user (name,phone,website,email,description,sex) values ('ngô đăng hải','0975336798','','dmtuan1@yopmail.com','','0');

describe user;
describe account;

-- SQL injection
-- ' or 1=1 -- -
select * from account where username = 'admin' or 1=1;
select * from account where username='admin or 1=1' and password='1234';
select * from account where username='admin' and password=123456;
