create database QLMB
use QLMB 
go
create table CHUYENBAY
(
	maCB char(5) primary key,
	gaDi varchar(50) not null,
	gaDen varchar(50) not null,
	doDai int not null, 
	gioDi time not null,
	gioDen time not null,
	chiPhi int not null,
)
create table MAYBAY
(
	maMB int primary key,
	hieu varchar(50) not null,
	tamBay int not null,
)
create table NHANVIEN
(
	maNV char(9) primary key,
	ten varchar(50) not null,
	luong int not null,
)
create table CHUNGNHAN
(
	maNV char(9) constraint FK_NV foreign key references NhanVien,
	maMB int constraint FK_MB foreign key references MayBay,
	constraint PK_CN primary key (maNV,maMB)
-- constraint FK_NV foreign key (maNV) references NhanVien
)
--drop table CHUNGNHAN
--alter table CHUNGNHAN add constraint PK_CN primary key (maNV,maMB)
--alter table CHUNGNHAN add constraint FK_MaNVCN foreign key(MaNV) references NHANVIEN(MaNV)
--alter table CHUNGNHAN add constraint FK_MaMBCN foreign key(MaMB) references MAYBAY(MaMB)
select * from NHANVIEN
select * from MAYBAY
select * from CHUYENBAY
select * from CHUNGNHAN
---Chèn vào bảng nhân viên:
insert into NhanVien (maNV,ten,luong)
values('AT140400',N'Tran Van Son',120433),('AT140401',N'Doan Thi Mai',178345),('AT140402',N'Ton Van Quy',153972)
	 ,('AT140403',N'Quan Can Ly',256481),('AT140404',N'La Que',2432442),('AT140405',N'Nguyen Thi Cam',2432442)
	 ,('AT140406',N'Le Van Luat',120000),('AT140407',N'Mai Quoc Minh',1300000),('AT140408',N'Nguyen Thi Quynh',143000)
	 ,('AT140409',N'Nguyen Vinh Bao',1235784),('AT140410',N'Tran Thi Hoai An',2431122)
--Chèn vào bảng chuyenbay
--drop table CHUYENBAY
insert CHUYENBAY
values('VN431','SGN','CAH',3693,'05:55','06:55',236)
insert CHUYENBAY
values('VN320','SGN','DAD',2798,'06:00','07:10',221)
insert CHUYENBAY
values('VN464','SGN','DLI',2002,'07:20','08:05',225)
insert CHUYENBAY
values('VN216','SGN','DIN',4170,'10:30','14:20',262)
insert CHUYENBAY
values('VN280','SGN','HPH',11979,'06:00','08:00',1279)
insert CHUYENBAY
values('VN254','SGN','HUI',8765,'18:40','20:00',781)
insert CHUYENBAY
values('VN338','SGN','BMV',4081,'15:25','16:25',375)
insert CHUYENBAY
values('VN440','SGN','BMV',4081,'18:30','19:30',426)
insert CHUYENBAY
values('VN651','DAD','SGN',2798,'19:30','08:00',221)
insert CHUYENBAY
values('VN276','DAD','CXR',1283,'09:00','12:00',203)
insert CHUYENBAY
values('VN374','HAN','VII',510,'11:40','13:25',120)
insert CHUYENBAY
values('VN375','VII','CXR',510,'14:15','16:00',181)
insert CHUYENBAY
values('VN269','HAN','CXR',1262,'14:10','15:50',202)
insert CHUYENBAY
values('VN315','HAN','DAD',134,'11:45','13:00',112)

--Chèn vào bảng maybay
insert MAYBAY
VALUES(747,'Boeing 747_400',13488)
insert MAYBAY
VALUES(737,'Boeing 737_800',5413)
insert MAYBAY
VALUES(340,'Airbus A340-300',11392)
insert MAYBAY
VALUES(757,'Boeing 757_500',6416)
insert MAYBAY
VALUES(777,'Boeing 777_300',10306)
insert MAYBAY
VALUES(767,'Boeing 767_400ER',10360)
insert MAYBAY
VALUES(320,'Airbus A320',4168)
insert MAYBAY
VALUES(319,'Airbus A319',2888)
insert MAYBAY
VALUES(727,'Boeing 727',2406)
insert MAYBAY
VALUES(154,'Tupolev',6565)
--Chèn vào bảng chunhnhan
insert CHUNGNHAN
values('AT140402',747)
insert CHUNGNHAN
values('AT140402',737)
insert CHUNGNHAN
values('AT140402',757)
insert CHUNGNHAN
values('AT140402',777)
insert CHUNGNHAN
values('AT140402',767)
insert CHUNGNHAN
values('AT140409',319)
insert CHUNGNHAN
values('AT140409',340)
insert CHUNGNHAN
values('AT140409',320)
insert CHUNGNHAN
values('AT140408',319)
insert CHUNGNHAN
values('AT140406',154)
insert CHUNGNHAN
values('AT140406',319)
insert CHUNGNHAN
values('AT140403',320)
insert CHUNGNHAN
values('AT140403',319)
insert CHUNGNHAN
values('AT140403',747)
--xem thong tin
select * from NHANVIEN
select * from MAYBAY
select * from CHUNGNHAN
select * from CHUYENBAY
--tạo view
--view cả 4 bảng
create view v4B--(maCB,gaDi,gaDen,doDai,chiPhi,maMB,hieu,tamBay,maNV,ten,luong)
as
select cb.maCB,gaDi,gaDen,doDai,chiPhi,mb.maMB,hieu,tamBay,nv.maNV,ten,luong
from CHUYENBAY cb,CHUNGNHAN cn, MAYBAY mb, NHANVIEN nv
where cn.maMB=mb.maMB and cn.maNV=nv.maNV and doDai<=tamBay
select * from v4B
--view 3 bảng k có CHUYENBAY
create view v3B
as
select mb.maMB,hieu,tamBay,nv.maNV,ten,luong
from CHUYENBAY cb,CHUNGNHAN cn, MAYBAY mb, NHANVIEN nv
where cn.maMB=mb.maMB and cn.maNV=nv.maNV

--1.	Cho biết thông tin về các nhân viên có lương nhỏ hơn 10000
select * from NHANVIEN where luong<10000

--2.	Cho biết thông tin về các chuyến bay có độ dài đường bay nhỏ hơn 10000km và lớn hơn 8000km
select * from CHUYENBAY where doDai<10000 and doDai>8000

--3.	Cho biết thông tin về các chuyến bay xuất phát từ Sài Gòn (SGN) đi Ban Mê Thuột (BMV)
select * from CHUYENBAY where gaDi='SGN' and gaDen='BMV'

--4.	Có bao nhiêu chuyến bay xuất phát từ Sài Gòn (SGN)
select count(maCB) as N'Số chuyến bay xuất phát từ SG' from CHUYENBAY where gaDi='SGN'

--5.	Có bao nhiêu loại máy bay Boeing
select count(maMB) as N'So loai may bay Boeing' from MAYBAY where (hieu like 'Boeing&')

--6.	Cho biết tổng số lương phải trả cho các nhân viên
select sum(luong) as N'Tong luong' from NHANVIEN 

--7.	Cho biết mã số và tên của các phi công lái máy bay Boeing
select distinct nv.maNV,ten
from (NHANVIEN nv join CHUNGNHAN cn on nv.maNV=cn.maNV ) join MAYBAY mb on cn.maMB=mb.maMB
where mb.hieu like 'Boeing%'

--8.	Cho biết mã số và tên của các phi công có thể lái được máy bay có mã số là 747
select distinct nv.maNV,ten
from (NHANVIEN nv join CHUNGNHAN cn on nv.maNV=cn.maNV ) join MAYBAY mb on cn.maMB=mb.maMB
where mb.maMB=747

--9.	Cho biết mã số của các loại máy bay mà nhân viên có họ Nguyễn có thể lái
--khong phai ai cung dc chung nhan lai may bay
select mb.maMB,hieu,ten
from (NHANVIEN nv join CHUNGNHAN cn on nv.maNV=cn.maNV ) join MAYBAY mb on cn.maMB=mb.maMB
where ten like N'Nguyen%'

--10.	Cho biết mã số của các phi công vừa lái được Boeing vừa lại được Airbus A320
select distinct b1.maNV,b2.ten
from  ( select distinct nv.maNV,ten,hieu
		from (NHANVIEN nv join CHUNGNHAN cn on nv.maNV=cn.maNV ) join MAYBAY mb on cn.maMB=mb.maMB
		where mb.hieu like 'Boeing%' ) as b1,
	  ( select distinct nv.maNV,ten,hieu
		from (NHANVIEN nv join CHUNGNHAN cn on nv.maNV=cn.maNV ) join MAYBAY mb on cn.maMB=mb.maMB
		where  mb.hieu like 'Airbus A320') as b2
where b1.maNV=b2.maNV

--11.Cho biết các loại máy bay có thể thực hiện được chuyến bay VN280
select mb.maMB,hieu,tamBay,doDai
from ((NHANVIEN nv join CHUNGNHAN cn on nv.maNV=cn.maNV ) join MAYBAY mb on cn.maMB=mb.maMB) 
		join CHUYENBAY on tamBay>=doDai
where maCB='VN280'

--12.Cho biết các chuyến bay có thể thực hiện bởi máy bay Airbus A320
select mb.maMB,hieu,tamBay,doDai
from ((NHANVIEN nv join CHUNGNHAN cn on nv.maNV=cn.maNV ) join MAYBAY mb on cn.maMB=mb.maMB) 
		join CHUYENBAY on tamBay>=doDai
where hieu='Airbus A320%'

--13.Với mỗi loại máy bay có phi công lái, cho biết mã số, loại máy bay và tổng số phi công có thể lái loại máy bay đó
select mb.maMB,mb.hieu,count(cn.maNV) as SoPhiCong
from ((NHANVIEN nv join CHUNGNHAN cn on nv.maNV=cn.maNV ) join MAYBAY mb on cn.maMB=mb.maMB) 
group by mb.maMB,mb.hieu

--14.Giả sử một hành khách muốn đi thẳng từ ga A đến ga B rồi quay trở về ga A. Cho biết các đường bay nào 
--   có thể đáp ứng yêu cầu này.
select MaCB,GaDi,GaDen,DoDai,ChiPhi
from CHUYENBAY
where GaDi = 'SGN' AND GaDen ='DAD'
union
select MaCB,GaDi,GaDen,DoDai,ChiPhi
from CHUYENBAY
WHERE GaDi='DAD' AND GaDen ='SGN'

--15.Với mỗi ga có chuyến bay xuất phát từ đó, cho biết có bao nhiêu chuyến bay khởi hành từ ga đó và cho biết 
--  tổng chi phí phải trả chi phi công lái các chuyến bay khởi hành từ ga đó.
select gaDi,sum(chiPhi) as TongChiPhi,count(maCB) as SoChuyenBay
from CHUYENBAY
group by gaDi

--16.Với mỗi ga xuất phát, cho biết có bao nhiêu chuyến bay có thể khởi hành trước 12:00 
select gaDi,count(maCB) as SoChuyenBay
from CHUYENBAY
where gioDi<'12:00'
group by gaDi

--17.Với mỗi phi công có thể lái nhiều hơn 3 loại máy bay, cho biết mã số phi công và tầm bay lớn nhất của 
--   các loại máy bay mà phi công đó có thể lái
select b1.maNV,maxTamBay,loaiMB as N'Số loại MB có thể lái' 
from (select nv.maNV,count(cn.maMB) as loaiMB
	from ((NHANVIEN nv join CHUNGNHAN cn on nv.maNV=cn.maNV ) join MAYBAY mb on cn.maMB=mb.maMB) 
	group by nv.maNV
	having count(cn.maMB)>=3) as b1,
	 (select nv.maNV,max(tamBay) as maxTamBay
	from ((NHANVIEN nv join CHUNGNHAN cn on nv.maNV=cn.maNV ) join MAYBAY mb on cn.maMB=mb.maMB) 
	group by nv.maNV) as b2
where b1.maNV=b2.maNV
--18.Cho biết mã số của các phi công có thể lái được nhiều loại máy bay nhất
select nv.maNV,count(cn.maMB) as soLoaiMB
from ((NHANVIEN nv join CHUNGNHAN cn on nv.maNV=cn.maNV ) join MAYBAY mb on cn.maMB=mb.maMB) 
group by nv.maNV 
having count(cn.maMB) >= (select max(loaiMB)
						from (select nv.maNV,count(cn.maMB) as loaiMB
							from ((NHANVIEN nv join CHUNGNHAN cn on nv.maNV=cn.maNV ) join MAYBAY mb on cn.maMB=mb.maMB) 
							group by nv.maNV ) as b1)

--19.Cho biết mã số của các phi công có thể lái được ít loại máy bay nhất.
select nv.maNV,count(cn.maMB) as soLoaiMB
from ((NHANVIEN nv join CHUNGNHAN cn on nv.maNV=cn.maNV ) join MAYBAY mb on cn.maMB=mb.maMB) 
group by nv.maNV 
having count(cn.maMB) <= (select min(loaiMB)
						from (select nv.maNV,count(cn.maMB) as loaiMB
							from ((NHANVIEN nv join CHUNGNHAN cn on nv.maNV=cn.maNV ) join MAYBAY mb on cn.maMB=mb.maMB) 
							group by nv.maNV ) as b1)

--20.Tìm các chuyến bay có thể được thực hiện bởi tất cả các loại máy bay Boeing
select hieu,tamBay,doDai
	from CHUYENBAY cb,MAYBAY mb
	where doDai<=tamBay and hieu like 'Boeing%'
	group by maCB
--21.Tìm các chuyến bay có thể được lái bởi các phi công có lương lớn hơn 100.000
select cb.maCB,tamBay,doDai,nv.maNV,luong
from ((CHUYENBAY cb join MAYBAY mb on cb.doDai<=mb.tamBay) join CHUNGNHAN cn on cn.maMB=mb.maMB)
		join NHANVIEN nv on nv.maNV=cn.maNV
where luong>100000

--22.Cho biết tên các phi công có lương nhỏ hơn chi phí thấp nhất của đường bay từ Sài Gòn (SGN) đến Buôn mê Thuột (BMV)
select distinct nv.maNV,ten,luong
from ((CHUYENBAY cb join MAYBAY mb on cb.doDai<=mb.tamBay) join CHUNGNHAN cn on cn.maMB=mb.maMB)
		join NHANVIEN nv on nv.maNV=cn.maNV
where gaDi='SGN' and gaDen='BMV' and luong/1000 <= (select minCP
												from (select gaDi,gaDen,min(chiPhi) as minCP
														from ((CHUYENBAY cb join MAYBAY mb on cb.doDai<=mb.tamBay) join CHUNGNHAN cn on cn.maMB=mb.maMB)
																join NHANVIEN nv on nv.maNV=cn.maNV
														where gaDi='SGN' and gaDen='BMV'
														group by gaDi,gaDen) as b1 )

--23.Cho biết mã số của các phi công có lương cao nhất
--24.Cho biết mã số của các nhân viên có lương cao thứ nhì
--25.Cho biết tên và lương của các nhân viên không phải là phi công và có lương lớn hơn lương trung bình
--   của tất cả các phi công.
--26.Cho biết tên các phi công có thể lái các máy bay có tầm bay lớn hơn 4.800km nhưng không có chứng nhận 
--   lái máy bay Boeing
--27.Cho biết tên các phi công lái ít nhất 3 loại máy bay có tầm xa hơn 3200km
--28.Với mỗi nhân viên, cho biết mã số, tên nhân viên và tổng số loại máy bay Boeing mà nhân viên đó có thể lái
--29.Với mỗi loại máy bay,  cho biết loại máy bay và tổng số phi công có thể lái loại máy bay đó.
--30.Với mỗi chuyến bay, cho biết mã số chuyến bay và tổng số phi công không thể lái chuyến đó.
--31.Với mỗi loại máy bay, cho biết loại máy bay và tổng số chuyến bay không thể thực hiện bởi loại máy bay đó.
--32.Với mỗi chuyến bay, hãy cho biết mã số chuyến bay và tổng số loại máy bay có thể thực hiện chuyến bay đó
--33.Với mỗi loại máy bay, hãy cho biết loại máy bay và tổng số phi công có lương lớn hơn 100.000 
--   có thể lái loại máy bay đó.
--34.Với mỗi loại máy bay có tầm bay trên 3200km, cho biết tên của loại máy bay và lương trung bình 
--   của các phi công có thể lái loại máy bay đó.
--35.Với mỗi phi công, cho biết mã số, tên phi công và tổng số chuyến bay xuất phát từ Sài Gòn mà phi công đó có thể lái
--36.Một hành khách muốn đi từ Hà Nội (HAN) đến nha trang (CXR) mà không phải đổi chuyến bay quá một lần. 
--   Cho biết mã chuyếnbay, thời gian khời hành từ Hà nội nếu hành khách muốn đến Nha Trang trước 16:00
--37.Cho biết thông tin của các đường bay mà tất cả các phi công có thể bay trên đường bay đó đều có lương lớn hơn 100000

--38.Cho biết tên các phi công chỉ lái các loại máy bay có tầm xa hơn 3200km và một trong số đó là Boeing
select distinct nv.maNV,ten,hieu,tamBay 
from (NHANVIEN nv join CHUNGNHAN cn on nv.maNV=cn.maNV) join MAYBAY mb on mb.maMB=cn.maMB
where tamBay>3200 and hieu like 'Boeing%'

--39.Tìm các phi công có thể lái tất cả các loại máy bay Boeing.
select distinct nv.maNV,ten 
from (NHANVIEN nv join CHUNGNHAN cn on nv.maNV=cn.maNV) join MAYBAY mb on mb.maMB=cn.maMB
where hieu like 'Boeing%'
