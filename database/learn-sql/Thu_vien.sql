create database Thu_vien
use Thu_vien 
create table BANDOC
(
maBD char(5) primary key,--identity(1,1)
hoTenBD nvarchar(40) not null,
ngaySinh date constraint chk_nSinh check (ngaySinh < getdate()),
lop varchar(10) not null,
queQuan nvarchar(40) not null,
sdt int unique,
)
create table SACH
(
maS char(5) primary key,
tenS nvarchar(40) not null,
theLoai nvarchar(40) not null,
tacGia nvarchar(40) not null,
namXB int not null,
nhaXB nvarchar(40) not null,
)

create table PHIEUMUON
(
maBD char(5) constraint FK_maBD foreign key references BANDOC,
maS char(5) constraint FK_maS foreign key references SACH,
ngayMuon date not null,
ngayHenTra date ,--constraint chk_nHenTra check datediff(day,ngayMuon,ngayHenTra) between 0 and 5,
traSach int default 0 constraint check_trasach check(TraSach=0 or TraSach=1),
constraint PK_PMuon primary key (maBD,maS)
)
select * from BANDOC
select * from SACH
select * from PHIEUMUON
--drop table PHIEUMUON
--drop table BanDOC
-------------------------------------------------------------------------
-- truy vấn
--1.	Xem bạn có mã bạn đọc là BD003 đã mượn những quyển sách nào ( in mã sách và tên sách)
select pm.maBD,tenS
from PHIEUMUON pm join SACH s on pm.maS=s.maS
where maBD='BD003'

--2.	Có bao nhiêu cuốn thiểu thuyết(lập trình) đã được mượn vào tháng 9/2018 
select tenS,ngayMuon,count(tenS) as N'Số lượng sách'--,count(s.maS)
from PHIEUMUON pm join SACH s on pm.maS=s.maS
where ngayMuon like '2018-09%'
group by tenS,ngayMuon

--3.	Hiện thị về việc mượn sách của những độc giả quê ở Hà nội
select *
from PHIEUMUON pm inner join BANDOC bd on bd.maBD=pm.maBD
where queQuan=N'Hà Nội'

--4.	Hiển thị mã bạn đọc và tên của các bạn cùng mượn sách có mã là T123(SH001)
select bd.maBD,bd.hoTenBD,maS
from PHIEUMUON pm join BANDOC bd on bd.maBD=pm.maBD
where maS='SH001' --and ngayMuon='%' 

--5.	Hiển thị danh sách bạn đọc quê ở Bắc Ninh và chưa trả sách 
select *
from PHIEUMUON pm inner join BANDOC bd on bd.maBD=pm.maBD
where queQuan=N'Hà Nội' and traSach=0

--6.	Hiển thị bạn đọc quê ở Hà nội mượn nhiều sách nhất 
select bd.maBD,bd.hoTenBD,bd.queQuan
from BANDOC bd, (select bd.maBD,bd.hoTenBD,queQuan,count(maS) as SL
				from PHIEUMUON pm join BANDOC bd on bd.maBD=pm.maBD
				where queQuan=N'Hà Nội' 
				group by bd.maBD,bd.hoTenBD,queQuan) as b2
where bd.maBD=b2.maBD and bd.queQuan=N'Hà Nội' and b2.SL>= (select max(SL)
															from (select bd.maBD,bd.hoTenBD,queQuan,count(maS) as SL
																from PHIEUMUON pm join BANDOC bd on bd.maBD=pm.maBD
																where queQuan=N'Hà Nội' 
																group by bd.maBD,bd.hoTenBD,queQuan) as b1
															group by b1.queQuan)
group by bd.maBD,bd.hoTenBD,bd.queQuan

--7.	Tính số lượng sách của mỗi thể loại có trong thư viện
select theLoai,count(maS) as 'SL'
from Sach s
group by theLoai

--8.	Hiển thị các cuốn sách được in ở nhà xuất bản giáo dục trước năm 2010
select *
from Sach s
where nhaXB=N'NXB Giáo Dục' and namXB<2010

--9.	Hiển thị các bạn có mã bạn đọc nhưng chưa mượn sách bao giờ
select maBD,hoTenBD
from BANDOC
except (select pm.maBD,hoTenBD
		from (PHIEUMUON pm join BANDOC bd on bd.maBD=pm.maBD))

--10.	Hiển thị các bạn mượn nhiều hơn hoặc bằng 2 quyển sách
select pm.maBD,hoTenBD,count(s.maS) as 'soSachMuon'
from (PHIEUMUON pm join BANDOC bd on bd.maBD=pm.maBD) join Sach s on s.maS=pm.maS
group by pm.maBD,hoTenBD
having count(s.maS)>=2

--11.	Hiển thị các bạn mượn nhiều hơn hoặc bằng 3 quyển sách thuộc thể loại “Lập trình” vào tháng 8/2019
select pm.maBD,hoTenBD,count(s.maS) as 'soSachMuon'
from (PHIEUMUON pm join BANDOC bd on bd.maBD=pm.maBD) join Sach s on s.maS=pm.maS
where pm.ngayMuon like '2019-09%' and theLoai=N'KHTN'
group by pm.maBD,hoTenBD
having count(s.maS)>=2

--12.	 Hiển thị tổng số sách đã được mượn ở Thư viện 
select count(maS)
from PHIEUMUON pm

--13.	 Hiện thị mã và tên bạn đọc mượn sách nhiều hơn bạn có mã số là BN123(BD001)
select b2.maBD,b2.hoTenBD,b2.soSachMuon
from (select pm.maBD,hoTenBD,count(pm.maS) as soSachMuon
		from PHIEUMUON pm inner join BANDOC bd on bd.maBD=pm.maBD
		where pm.maBD='BD001'
		group by pm.maBD,hoTenBD) as b1,
	 (select pm.maBD,hoTenBD,count(pm.maS) as soSachMuon
		from PHIEUMUON pm inner join BANDOC bd on bd.maBD=pm.maBD
		group by pm.maBD,hoTenBD) as b2
where b2.soSachMuon>b1.soSachMuon

select b1.MaBD,hotenBD
from (select pm.MaBD,hotenBD,count(pm.MaS) as SL 
		from PHIEUMUON AS PM,BANDOC AS bd
		where pm.MaBD = bd.maBD
		group by pm.MaBD,hotenBD) as b1
where b1.SL > (select count(PM.MaS) as SL
				from PHIEUMUON as pm
				where pm.MaBD = N'BD001')

--14.	 Hiển thị mã và tên cuốn sách được mượn nhiều nhất,ít nhất ở Thư viện năm 2019
select s.maS,s.tenS
from PHIEUMUON pm join SACH s on pm.maS=s.maS,(select s.maS,tenS,count(s.maS) as SL 
											from PHIEUMUON pm join SACH s on pm.maS=s.maS
											where year(pm.Ngaymuon) ='2019'
											group by s.maS,tenS) as b2
where year(pm.Ngaymuon) ='2019' and s.maS=b2.maS 
		and SL =(select  max(SL) as maxSL --,min(SL) as minSL --muốn hiện cả min,max thì thêm or SL=minSL
				from (select s.maS,tenS,count(s.maS) as SL 
						from PHIEUMUON pm join SACH s on pm.maS=s.maS
						where year(pm.Ngaymuon) ='2019'
						group by s.maS,tenS) as b1)
group by s.maS,s.tenS

--15.	Cho danh sách các bạn đọc mượn sách quá hạn tính đến ngày hiện tại
select bd.maBD,hoTenBD,traSach
from PHIEUMUON pm join BANDOC bd on bd.maBD=pm.maBD
--where datediff(day,ngayHenTra,getdate())<0 and traSach=0
where DATEDIFF(day,pm.Ngaymuon,GETDATE())>5 and TraSach = 0
--SELECT DATEDIFF(day, '2019/09/01', '2019/04/28');-- tgian sau trừ tgian trc

insert into BANDOC
values ('BD001',N'Tran Van Son','1999-2-24','12',N'Hà Tĩnh',N'09000506')
insert into BANDOC
values ('BD002',N'Doan Thi Mai','2000-2-24','11',N'Hà Nội',N'09000507')
insert into BANDOC
values ('BD003',N'Ton Van Quy','2001-2-24','10',N'Hà Nội',N'09000508')
insert into BANDOC
values ('BD004',N'Quan Can Ly','2000-2-24','11',N'Cao Bằng',N'09000509')
insert into BANDOC
values ('BD005',N'Nguyen Thi Cam','2001-2-24','12',N'Nghệ An',N'09000510')
insert into BANDOC
values ('BD006',N'Le Van Luat','2001-2-24','10',N'Thanh Hóa',N'09000511')
insert into BANDOC
values ('BD007',N'Mai Quoc Minh','1999-2-24','12',N'Nghệ An',N'09000512')
insert into BANDOC
values ('BD008',N'Nguyen Thi Quynh','1999-2-24','12',N'Hà Nội',N'09000513')
insert into BANDOC
values ('BD009',N'Nguyen Vinh Bao','2000-2-24','11',N'Hà Nội',N'09000514')
insert into BANDOC
values ('BD010',N'Tran Thi Hoai An','2001-2-24','10',N'Hà Nội',N'09000515')
insert into BANDOC
values ('BD011',N'Ngo Dang Hai','1999-6-15','10',N'Hà Nội',N'09000516')

--------------------------------------------------------------------------------
--Chèn vào bảng SACH
insert SACH
values ('SH001',N'Java',N'Lập trình','Ngo Dang Hai',1999,N'ĐHQGHN')
insert SACH
values ('SH002',N'C/C++',N'Lập trình','Ngo Dang Hai',1989,N'ĐHQGHN')
insert SACH
values ('SH003',N'PHP',N'Lập trình','Ngo Dang Hai',1995,N'NXB Thông Tin')
insert SACH
values ('SH004',N'Toán',N'KHTN','Ngo Dang Hai',1996,N'NXB Giáo Dục')
insert SACH
values ('SH005',N'Lý',N'KHTN','Ngo Dang Hai',1990,N'NXB Giáo Dục')
insert SACH
values ('SH006',N'Hóa',N'KHTN','Ngo Dang Hai',1994,N'NXB Giáo Dục')
insert SACH
values ('SH007',N'Sinh',N'KHTN','Ngo Dang Hai',1989,N'NXB Giáo Dục')
insert SACH
values ('SH008',N'Sử',N'KHXH','Ngo Dang Hai',1999,N'NXB Giáo Dục')
insert SACH
values ('SH009',N'Địa',N'KHXH','Ngo Dang Hai',1989,N'NXB Giáo Dục')
insert SACH
values ('SH0010',N'Văn',N'KHXH','Ngo Dang Hai',1994,N'NXB Giáo Dục')
insert SACH
values ('SH0011',N'GDCD',N'KHXH','Ngo Dang Hai',1995,N'NXB Giáo Dục')

-----------------------------------------------------------------------------
--Chèn vào bảng PHIEUMUON
insert PHIEUMUON
values('BD001','SH001','2019-08-26','2019-09-02',0)
insert PHIEUMUON
values('BD002','SH002','2019-08-26','2019-09-02',1)
insert PHIEUMUON
values('BD003','SH004','2019-08-26','2019-09-02',0)
insert PHIEUMUON
values('BD004','SH004','2018-09-22','2018-09-27',0)
insert PHIEUMUON
values('BD005','SH005','2018-09-22','2018-09-27',1)
insert PHIEUMUON
values('BD006','SH006','2019-08-26','2019-09-02',0)
insert PHIEUMUON
values('BD007','SH007','2019-09-19','2019-09-24',1)
insert PHIEUMUON
values('BD008','SH006','2019-09-19','2019-09-24',0)
insert PHIEUMUON
values('BD008','SH008','2019-09-26','2019-10-02',0)
insert PHIEUMUON
values('BD008','SH007','2019-09-22','2019-09-27',1)
insert PHIEUMUON
values('BD009','SH001','2018-09-25','2018-09-30',1)