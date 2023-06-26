
use mysql;

update user set password=password('root') where user='root';
alter user 'root'@'localhost' identified by 'root';

use demo_regex;

alter schema `demo_regex`  default collate utf8mb4_vietnamese_ci ;
alter database demo_regex character set utf8mb4 collate utf8mb4_unicode_ci;

alter table user add constraint fk_acc_id foreign key (account_id) references account(id);

alter table user add column phone varchar(25) after name;
alter table user add column created_at timestamp not null default current_timestamp;
alter table user add column modified_at timestamp not null default current_timestamp;

alter table account modify column password varchar(255);
alter table user modify column phone varchar(25);

alter table `demo_regex`.`user` 
change column `name` `name` varchar(255) character set 'utf8mb4' collate 'utf8mb4_vietnamese_ci' not null ;

update demo_regex.user
set `phone` = 1234567890
where `id` = "2";

"student_teacher_id"	"teacher_id"	"student_id"
"s1_t1"             	"t1"	        "s1"

UPDATE student_teacher SET student_id = 
(case when student_teacher_id = "s1_t1" then CONCAT(student_teacher_id, '@', student_id) END) 
WHERE student_teacher_id = "s1_t1";

drop table demo_regex.account;
