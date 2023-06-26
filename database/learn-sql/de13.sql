create database QLBH
use QLBH
go
create table HOADON
(
soHD char(5) primary key,
ngayHD date,
tenKH nvarchar(30),
diaChi nvarchar(30),
sdt nvarchar(30),
)
create table HANG
(
maH char(5) primary key,
tenH nvarchar(30),
dvi int,
donGia int,
sl int,
)
create table CHITIETHD
(
soHD char(5) not null,
maH char(5) not null,
giaBan int,
sl int,
giamGia int,
)
alter table CHITIETHD
--add constraint PK primary key (soHD,maH);
--add constraint FK1 foreign key (soHD) references HOADON(soHD);
--add constraint FK2 foreign key (maH) references Hang(maH);
check constraint all