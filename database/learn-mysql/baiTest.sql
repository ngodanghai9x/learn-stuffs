--- Em lam tren sql server
-- Tao CSDL
-- create database Cau9

-- Tao bang user-profile
create table user_profile (
	id INT PRIMARY KEY AUTO_INCREMENT,
	username varchar(50) NOT NULL UNIQUE,
	password varchar(50)  null,
	fullname varchar(50)  null,
	avatar varchar(250),
	birthday date,
	created_time date null
);

-- Tao bang friend
create table friend (
	id INT primary key AUTO_INCREMENT,
	sender_id int  null,
	receiver_id int  null,
	status varchar(50)  null
);

-- Tao bang message
create table message (
	id int primary key AUTO_INCREMENT,
	sender_id int  null,
	receiver_id int  null,
	type varchar(50)  null,
	content varchar(500)  null,
	status varchar(50)  null
);

-- them record vao bang user_profile
insert into user_profile(username, password, fullname, avatar, birthday, created_time)
	values('abc123', '123', 'Nguyen Van A', '123', '06-04-1999', '11-3-2022');
insert into user_profile(username, password, fullname, avatar, created_time)
	values('xyz456', '456', 'Nguyen Van B', '456', '10-3-2022');
insert into user_profile(username, password, fullname, birthday, created_time)
	values('art159', '159', 'Nguyen Van C', '03-15-1999', '9-2-2022');
insert into user_profile(username, password, fullname, avatar, birthday, created_time)
	values('jkl258', '258', 'Nguyen Van D', '258', '04-29-1999', '03-11-2022');

-- them record vao bang friend
insert into friend (sender_id,receiver_id,status) values(1, 2, 'pending');
insert into friend (sender_id,receiver_id,status) values(2, 3, 'accepted');
insert into friend (sender_id,receiver_id,status) values(2, 4, 'accepted');
insert into friend (sender_id,receiver_id,status) values(4, 1, 'accepted');

-- them record vao bang message
insert into message (sender_id,receiver_id,TYPE,content,status, a) values(1, 2, 'text', 'hello', 'sent', '3-11-2022');
insert into message (sender_id,receiver_id,TYPE,content,status, a) values(2, 3, 'image', 'abcxyz.jpg', 'pending_read', '3-9-2022');
insert into message (sender_id,receiver_id,TYPE,content,status, a) values(2, 4, 'video', 'hi.mp3', 'read', '4-5-2022');
insert into message (sender_id,receiver_id,TYPE,content,status, a) values(4, 1, 'text', 'chao', 'sent', '7-20-2022');

-- Lấy id, username, fullname, avatar: của các user có id = 2, 3
select id, username, fullname, avatar
from user_profile
where id=2 or id = 3

-- Lấy các bạn bè của user co id = 2

select user_profile.id , user_profile.username, user_profile.fullname, user_profile.avatar  
from   friend inner join user_profile on friend.receiver_id = user_profile.id
where  friend.status = 'accepted' and (friend.receiver_id  = 2 or friend.sender_id = 2)

-- lay tin nhac cua user co id = 2 voi mot ban be nao do (id = 3)
select message.id message_id, friend.id friend_id, friend.sender_id, friend.receiver_id, message.type, message.status, message.content, message.created_time  
from friend inner join message 
on (friend.sender_id = message.sender_id and friend.receiver_id = message.receiver_id)
where (message.sender_id = 2 or message.receiver_id = 2) and (message.sender_id = 3 or message.receiver_id = 3)

-- lấy top 10 thằng có nhiều bạnn nhất
SELECT  up.*, COUNT(*) AS abc FROM user_profile up 
JOIN friend f1 ON up.id = f1.sender_id
JOIN friend f2 ON up.id = f2.sender_id
WHERE f1.`status` = 'accepted' AND f2.`status` = 'accepted'
GROUP BY up.id
ORDER BY abc DESC
LIMIT 10;