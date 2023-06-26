create database buoi7
use buoi7
-- hàm và thủ tục
go
create table A
( 
hai date default getdate(),
khanh int unique,
tung int primary key
)

drop table a
insert A(khanh,tung) values (2,2)
select * from A
-----------------------------------------
create table NhanVien
(
maNV char(5) primary key,
hoTen nvarchar(40),
diaChi nvarchar(40),
sdt int,
ngaySinh nvarchar(40),
gt nvarchar(5),
hsl float,
)
create table Hang
(
maHang char(5) primary key,
tenHang nvarchar(40),
nhaSX nvarchar(40),
tgianBH date,
)
create table KhachHang
(
maKH char(5) primary key,
tenKH nvarchar(40),
cmt int,
diaChi nvarchar(40),
sdt int,
email nvarchar(40),
)
create table HoaDonXuat
(
maHD char(5) primary key,
maKH char(5) constraint FK_HDX1 foreign key references KhachHang,
ngayLapHD date,
maNV char(5) constraint FK_HDX2 foreign key references NhanVien,
phgThucTT nvarchar(40),
)
create table CT_HoaDon
(
maHD char(5) constraint FK_CTHD1 foreign key references HoaDonXuat,
maHang char(5) constraint FK_CTHD2 foreign key references Hang,
slgMua int,
donGia float,
constraint PK_CTHD primary key (maHD,maHang)
)
--manv int,hoten,diachi,sdt int,ngaysinh,gt,hsl
insert into NHANVIEN values (1,N'tran bao trong',N'ha giang',0123456789,'1995/12/14','nam',1)
insert into NHANVIEN values (2,N'le thuy duong' ,N'ha noi'  ,0536489276,'1997/05/12','nu',2)
insert into NHANVIEN values (3,N'tran phuong thao',N'quang ninh',0658324758,'1996/03/30','nu',3)
insert into NHANVIEN values (4,N'pham anh bao',N'hao binh',0958864723,'1994/06/20','nam',1)
insert into NHANVIEN values (5,N'tran bao trong',N'an giang',0453268875,'1998/03/23','nam',2)
--mahang int,tenhang,nhasx,tgianbaohanh
insert into HANG values (1,N'sach a1',N'A','2020/01/20')
insert into HANG values (2,N'sach a2',N'B','2020/02/19')
insert into HANG values (3,N'sach a3',N'C','2020/03/18')
insert into HANG values (4,N'sach a4',N'D','2020/04/17')
insert into HANG values (5,N'sach a5',N'A','2020/05/19')
--makh int,tenkh,cmt,diachi,sdt,email
insert into KHACHHANG values(1,N'le thuy duong',123,N'ha noi',46548546,N'hkhk@gmail.com')
insert into KHACHHANG values(2,N'tran an dung',45665,N'ha giang',86464646,N'ytfg@gmail.com')
insert into KHACHHANG values(3,N'nguyen anh vien',987,N'an giang',13546521,N'hkhkj@gmail.com')
insert into KHACHHANG values(4,N'ha cao hung',64446,N'cao bang',654631353,N'ếdrg@gmail.com')
insert into KHACHHANG values(5,N'nguyen van gioi',9124756,N'lang son',684653513,N'kjhkj@gmail.com')
--mahd,makh,ngaylaphoadon,manv,phuongthucthanh toan
insert into HOADONXUAT values(9,1,'2020/06/20',5,N'Q')
insert into HOADONXUAT values(8,2,'2020/05/20',4,N'W')
insert into HOADONXUAT values(7,3,'2020/04/20',3,N'E')
insert into HOADONXUAT values(6,4,'2020/03/20',2,N'W')
insert into HOADONXUAT values(5,5,'2020/02/20',1,N'Q')
--mahd,mahang,soluongmua,dongia
insert into CT_HOADON values (9,1,10,10000)
insert into CT_HOADON values (8,2,11,20000)
insert into CT_HOADON values (7,3,12,30000)
insert into CT_HOADON values (6,4,13,40000)
insert into CT_HOADON values (5,5,14,50000)
-----------------------------------------------------------
select * from NHANVIEN
select * from HANG
select * from KHACHHANG
select * from HOADONXUAT
select * from CT_HOADON
--Viết các hàm và thủ tục để:

--1. Tính tổng tiền đã mua hàng của một khách hàng nào đó theo mã KH
--thủ tục
create procedure p1 (@maKH char(5))
--with   RECOMPILE| ENCRYPTION | RECOMPILE, ENCRYPTION 
---	RECOMPILE: cho phép dịch lại mỗi khi được gọi
---	ENCRYPTION: cho phép mã hóa thủ tục => không xem được nội dung của thủ tục nữa 
as
select sum(donGia*slgMua) as Tong_tien
from KhachHang kh join HoaDonXuat hd on kh.maKH=hd.maKH join CT_HoaDon chd on chd.maHD=hd.maHD
where kh.maKH=@maKH

exec p1 1
--hàm
create function f1 (@maKH char(5))
returns float
as
begin
declare @tien float
select @tien=sum(donGia*slgMua)
from KhachHang kh join HoaDonXuat hd on kh.maKH=hd.maKH join CT_HoaDon chd on chd.maHD=hd.maHD
where kh.maKH=@maKH
return @tien
end

select * from CT_HoaDon where donGia= dbo.f1(1)
select * from  dbo.f1(1)

create view v_f1
as
select * from  dbo.f1(1)
with check option
drop view v_f1


--2. Cho biết tổng số tiền hàng đã mua của một hóa đơn nào đó
--thủ tục
create procedure p2 
@maHD char(5)
as
select hd.maHD,sum(donGia*slgMua) as Tong_tien
from KhachHang kh join HoaDonXuat hd on kh.maKH=hd.maKH join CT_HoaDon chd on chd.maHD=hd.maHD
where hd.maHD=@maHD
group by hd.maHD

exec p2 5
--hàm
create function f2 (@maHD char(5))
returns float
as
begin
declare @tongTien float
select @tongTien=sum(donGia*slgMua)
from KhachHang kh join HoaDonXuat hd on kh.maKH=hd.maKH join CT_HoaDon chd on chd.maHD=hd.maHD
where hd.maHD=@maHD
--group by hd.maHD
return @tongTien
end

exec f2 'HD002'
--3. Cho biết tổng số tiền hàng đã bán của một tháng nào đó.
--thủ tục
create proc p3 (@thang int)
as
select sum(slgMua*donGia) as TongTien
from CT_HoaDon hd1 join HoaDonXuat hd2 on hd1.maHD=hd2.maHD
where month(ngayLapHD)=@thang

exec p3 3
--hàm
create function f3 (@thang int)
returns float
as
begin
declare @tongTien float
select @tongTien=sum(slgMua*donGia)
from CT_HoaDon hd1 join HoaDonXuat hd2 on hd1.maHD=hd2.maHD
where month(ngayLapHD)=@thang
return @tongTien
end

--4. Cho biết họ tên của nhân viên có tuổi cao nhất
--thủ tục
create proc p4
as
select hoTen
from NhanVien
where datediff(DAY,ngaySinh,getdate()) =(select max(dsTuoi)
										from (select maNV,datediff(DAY,ngaySinh,getdate()) as dsTuoi
											from NhanVien nv 
											 ) as b1) --group by maNV
exec p4
--hàm
create function f4 (@gt nvarchar(5))
returns Table
as
--begin
return
(select hoTen
from NhanVien
where gt=@gt and
		datediff(DAY,ngaySinh,getdate()) =(select max(dsTuoi)
										from (select maNV,datediff(DAY,ngaySinh,getdate()) as dsTuoi
											from NhanVien nv 
											where gt=@gt
											 ) as b1) )--group by maNV 
--end
select * from dbo.f4(N'nu')