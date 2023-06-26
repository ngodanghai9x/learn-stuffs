create database QLSV
use QLSV
go
--drop database QLSV
create table SinhVien
(
	maSV int identity primary key,
	tenSV nvarchar(50) not null,
	GT nvarchar(5) default N'Nữ',
	ngaySinh date constraint chk_nSinh check (ngaySinh < getdate()),
	que nvarchar(50) not null,
	lop char(10),
)
create table MonHoc
(
	maMH int identity primary key,
	tenMH nvarchar(30) unique,
	DVHT int check (DVHT between 2 and 9),
)
create table KetQua
(
	maSV int constraint FK_maSV foreign key references SinhVien(maSV),
	maMH int constraint FK_maMH foreign key references MonHoc(maMH),
	diem float check (diem between 0 and 10),
	constraint PK_KQ primary key (maSV,maMH),
)    
--delete SinhVien
--drop table SinhVien
--drop table MonHoc
--drop table KetQua
select * from SinhVien 
select * from KetQua
select * from MonHoc
select mamh,diem from KetQua where maMH=1
-- Buổi 3    SETDATEFORMAT DMY ,    AVG(CAST(Diem as float)) as Diemtb
--	Thực hiện câu lệnh update để sửa điểm môn ‘Toán cao cấp’ của sinh viên mã 1 từ 5 sang 6
--update v_diem_sinhvien set Điểm = 6 where [Tên Môn Học]=N'Toán cao cấp' and [Mã Sinh Viên]=1

--+ Xem thông tin về bảng: sp_help <tên bảng>
--+ Đổi tên bảng: exec sp_rename <tên cũ> <tên mới>
-- EXEC SP_Rename ‘<tên bảng.tên cột>’, ‘tên mới”, ‘COLUMN’

--ALTER Table <tên_bảng>
--	ADD Constraint <tên_ràng_buộc>  <Loại_ràng_buộc> (tên cột)// FK thêm references <tên bảng> (tên cột)


--câu 1: Cho biết mã môn học, tên môn học,  điểm thi  tất cả các môn của sinh viên tên Thức
select mh.maMH, mh.tenMH, kq.diem
from MonHoc as mh, KetQua as kq
where kq.maMH=mh.maMH and kq.maSV in ( select sv.maSV
										from SinhVien as sv
										where sv.tenSV like N'% Thức' )

--câu 2: Cho biết mã môn học, tên môn và điểm thi ở những môn mà sinh viên tên Dung phải thi lại (điểm<5)
select mh.maMH,tenMH,diem
from MonHoc mh join KetQua kq on mh.maMH=kq.maMH
where kq.diem<5 and kq.maSV  in ( select sv.maSV
									from SinhVien as sv
									where sv.tenSV like N'% Dung' )
--câu 3: Cho biết mã sinh viên, tên những sinh viên đã thi ít nhất là 1 trong 3 môn Lý thuyết Cơ sở dữ liệu, Tin học đại cương, mạng máy tính.
select sv.maSV, sv.tenSV,mh.maMH
from  SinhVien sv, KetQua kq, MonHoc mh
where sv.maSV=kq.maSV and kq.maMH=mh.maMH and ((kq.maMH=2 or kq.maMH=3) and kq.diem between 0 and 10)

-- câu 4. Cho biết mã môn học, tên môn mà sinh viên có mã số 1 chưa có điểm 
select mh.maMH,mh.tenMH
from MonHoc mh
except ( select mh.maMH,mh.tenMH
		from MonHoc mh, KetQua kq, SinhVien sv
		where mh.maMH=kq.maMH and kq.maSV=sv.maSV and sv.maSV=3)
--câu 5. Cho biết điểm cao nhất môn 1 mà các sinh viên đạt được
select sv.maSV,sv.tenSV,kq.maMH
from  SinhVien sv, KetQua kq
where sv.maSV=kq.maSV and kq.maMH=1 and kq.diem in (select MAX(kq.diem) 
													from KetQua kq
													where kq.maMH=1)

--câu 6. Cho biết mã sinh viên, tên những sinh viên có điểm thi môn 2 không thấp nhất khoa
select sv.maSV,sv.tenSV,kq.maMH
from  SinhVien sv, KetQua kq
where sv.maSV=kq.maSV and kq.maMH=2 and kq.diem > (select min(kq.diem) 
													from KetQua kq
													where kq.maMH=2)

--câu 7. Cho biết mã sinh viên và tên những sinh viên có điểm thi môn 1 lớn hơn điểm thi môn 1 của sinh viên có mã số 3
select sv.maSV,sv.tenSV,kq.maMH
from  SinhVien sv, KetQua kq
where sv.maSV=kq.maSV and kq.maMH=1 and kq.diem > (select kq.diem 
													from KetQua kq,SinhVien sv
													where kq.maSV=sv.maSV and kq.maMH=1 and kq.maSV=3)

--câu 8. Cho biết số sinh viên phải thi lại môn Toán Cao cấp 
-- in ra thông tin
select sv.maSV,sv.tenSV,kq.maMH
from  SinhVien sv, KetQua kq
where sv.maSV=kq.maSV and kq.maMH=1 and kq.diem<4

-- đếm số sinh viên
select maMH,count(maSV) as N'Số Sinh Viên'
from KetQua
where maMH=1 and diem<4
group by maMH

--câu 9. Đối với mỗi môn, cho biết tên môn và số sinh viên phải thi lại môn đó mà số sinh viên thi lại >=2
select maMH, count(maSV) as N'Số Sinh Viên'
	from KetQua
	where diem<4
	group by (maMH)
	having count(maSV)>=2

--câu 10. Cho biết mã sinh viên, tên và lớp của sinh viên đạt điểm cao nhất môn Tin đại cương
select sv.maSV,sv.tenSV,sv.lop
from SinhVien sv,KetQua kq
where sv.maSV=kq.maSV and kq.diem in ( select Max(kq.diem)
										from KetQua kq
										where kq.maMH=3)

--câu 11. Đối với mỗi lớp, lập bảng điểm gồm mã sinh viên, tên sinh viên và điểm trung bình chung học tập. 
select sv.maSV,sv.tenSV,lop,round(sum(diem*DVHT)/sum(DVHT),2) as dtb
from (SinhVien sv join KetQua kq on sv.maSV=kq.maSV) join MonHoc mh on kq.maMH=mh.maMH
group by sv.maSV,sv.tenSV,lop
order by lop

--câu 12. Đối với mỗi lớp, cho biết mã sinh viên và tên những sinh viên phải thi lại từ 2 môn trở lên
select sv.maSV,tenSV,lop,count(sv.maSV) as 'So sv thi lai'
from SinhVien sv,KetQua kq
where kq.maSV=sv.maSV and diem<4 and lop='L01'
group by sv.maSV,tenSV,lop
having count(sv.maSV)>=1 --2 môn k có tên kiểm tra từ 1 môn

--câu 13. Cho biết mã số và tên của những sinh viên tham gia thi tất cả các môn.
select sv.maSV,sv.tenSV,count(maMH) as N'Số môn đã học'
from  SinhVien sv, KetQua kq
where sv.maSV=kq.maSV and (kq.diem between 0 and 10)
group by sv.maSV,tenSV
having count(maMH)=(select count(maMH) from MonHoc)

--câu 14. Cho biết mã sinh viên và tên của sinh viên có điểm trung bình chung học tập >=6
select sv.maSV,tenSV,round(sum(diem*DVHT)/sum(DVHT),2) as dtb
from (SinhVien sv join KetQua kq on sv.maSV=kq.maSV) join MonHoc mh on kq.maMH=mh.maMH
group by sv.maSV,tenSV
having round(sum(diem*DVHT)/sum(DVHT),2) >=6

--15.Cho biết mã sinh viên và tên những sinh viên phải thi lại ở ít nhất là những môn mà sinh viên có mã số 3 phải thi lại
select sv.maSV,tenSV
from (SinhVien sv join KetQua kq on sv.maSV=kq.maSV) join MonHoc mh on kq.maMH=mh.maMH
where diem<4 and sv.maSV!=3 and tenMH in (select tenMH
										from (SinhVien sv join KetQua kq on sv.maSV=kq.maSV) 
										join MonHoc mh on kq.maMH=mh.maMH
										where sv.maSV=3 and diem<4 )
group by sv.maSV,tenSV

--16.*Cho mã sv và tên của những sinh viên có hơn nửa số điểm  >=5. 
select b1.maSV,b1.tenSV
	from ( select sv.maSV,tenSV,count(sv.maSV) as TongMon -- tổng số môn
				from SinhVien sv join KetQua kq on sv.maSV=kq.maSV
				group by sv.maSV,tenSV ) as b1,
		 ( select sv.maSV,tenSV,count(sv.maSV) as MonQua -- số môn qua
				from SinhVien sv join KetQua kq on sv.maSV=kq.maSV
				where diem>=5
				group by sv.maSV,tenSV ) as b2
	where b1.maSV=b2.maSV and MonQua>TongMon/2

--17.	*Cho danh sách tên và mã sinh viên có điểm trung bình chung lớn hơn điểm trung bình của toàn khóa. 
select sv.maSV,tenSV,round(sum(diem*DVHT)/sum(DVHT),2)  --CAST(Diem as float)
	from (KetQua kq join SinhVien sv on kq.maSV=sv.maSV) join MonHoc mh on mh.maMH=kq.maMH
	group by sv.maSV,tenSV
	having sum(diem*DVHT)/sum(DVHT)>( select sum(diem*DVHT)/sum(DVHT)
										from KetQua kq join MonHoc mh on kq.maMH=mh.maMH )

select round(sum(diem*DVHT)/sum(DVHT),2)
from KetQua kq join MonHoc mh on kq.maMH=mh.maMH

--18.	*Cho danh sách mã sinh viên, tên sinh viên có điểm môn Tin đại cương cao nhất của mỗi lớp.
select maSV,tenSV,b1.lop
	from (select lop,max(diem) as Max_Diem
			from (SinhVien sv join KetQua kq on sv.maSV=kq.maSV) join MonHoc mh on kq.maMH=mh.maMH
			where tenMH=N'Tin đại cương'
			group by lop) as b1,
		 (select sv.maSV,tenSV,lop,diem
			from (SinhVien sv join KetQua kq on sv.maSV=kq.maSV) join MonHoc mh on kq.maMH=mh.maMH
			where tenMH=N'Tin đại cương') as b2
	where b1.lop=b2.lop and diem=Max_Diem

select lop,diem 
	from SinhVien sv, KetQua kq
	where kq.maMH=3 --and diem in (select max(diem) from KetQua where maMH=3)
	order by (lop)

--19.*Cho danh sách tên và mã sinh viên có điểm trung bình chung lớn hơn điểm trung bình của lớp sinh viên đó theo học.		
select b2.maSV,b2.tenSV
	from (select lop,round(sum(diem*DVHT)/sum(DVHT),3) as DTBlop
			from (SinhVien sv join KetQua kq on sv.maSV=kq.maSV) join MonHoc mh on kq.maMH=mh.maMH
			group by lop) as b1,
		 (select sv.maSV,tenSV,lop,round(sum(diem*DVHT)/sum(DVHT),3) as DTBsv
			from (SinhVien sv join KetQua kq on sv.maSV=kq.maSV) join MonHoc mh on kq.maMH=mh.maMH
			group by sv.maSV,tenSV,lop) as b2
	where b1.lop=b2.lop and DTBsv>DTBlop
--check	
select sv.maSV,mh.maMH,diem,DVHT --round(sum(diem*DVHT)/sum(DVHT),3)--
from (SinhVien sv join KetQua kq on sv.maSV=kq.maSV) join MonHoc mh on kq.maMH=mh.maMH	
where lop='L01'	
---------------------------------------------------------------------------------------------------------------
                     -- TẠO VIEW
--1.Lấy ra danh sách sinh viên nữ học môn Toán Cao Cấp và điểm thi tương ứng. 
create view c1
as
select sv.maSV,tenSV,GT,tenMH,diem
from SinhVien sv join KetQua kq on sv.maSV=kq.maSV join MonHoc mh on mh.maMH=kq.maMH
where tenMH=N'Toán Cao Cấp' and GT=N'Nữ'

--2.Cho biết số sinh viên thi đỗ môn toán cao cấp
create view c2
as
select count(sv.maSV) as N'Số SV đỗ Toán cao cấp'
from SinhVien sv join KetQua kq on sv.maSV=kq.maSV join MonHoc mh on mh.maMH=kq.maMH
where tenMH=N'Toán Cao Cấp' and diem>=5
group by tenMH

--3.Lấy ra tên sinh viên và điểm trung bình của các sinh viên theo từng lớp
create view c3
as
select sv.maSV,tenSV,lop,round(sum(diem*DVHT)/sum(DVHT),2) as DTB
from SinhVien sv join KetQua kq on sv.maSV=kq.maSV join MonHoc mh on mh.maMH=kq.maMH
group by sv.maSV,tenSV,lop
order by lop desc

--4.Cho biết số sinh viên thi lại của từng môn
create view c4
as
select mh.maMH,tenMH,count(sv.maSV) as N'Số Sinh Viên Không Qua Môn'
from SinhVien sv join KetQua kq on sv.maSV=kq.maSV join MonHoc mh on mh.maMH=kq.maMH
where diem<4
group by mh.maMH,tenMH

--5.* Cho biết mã số và tên môn của những môn học mà tất cả các sinh viên đều đạt điểm >=2
create view c5
as
select b1.maMH,b1.tenMH,b1.SL
from 
	(select mh.maMH,tenMH,count(sv.maSV) as SL
	from SinhVien sv join KetQua kq on sv.maSV=kq.maSV join MonHoc mh on mh.maMH=kq.maMH
	where diem>=2
	group by mh.maMH,tenMH) as b1,
	(select mh.maMH,tenMH,count(sv.maSV) as SL
	from SinhVien sv join KetQua kq on sv.maSV=kq.maSV join MonHoc mh on mh.maMH=kq.maMH
	group by mh.maMH,tenMH) as b2
where b1.maMH=b2.maMH and b1.SL=b2.SL

--6.* Cho biết mã số và tên những sinh viên có điểm trung bình chung học tập cao hơn điểm trung bình chung của mỗi lớp.
create view c6 
as
	(select sv.maSV,tenSV,lop,round(sum(diem*DVHT)/sum(DVHT),2) as DTB
	from SinhVien sv join KetQua kq on sv.maSV=kq.maSV join MonHoc mh on mh.maMH=kq.maMH
	group by sv.maSV,tenSV,lop) as b1

	(select lop,round(sum(diem*DVHT)/sum(DVHT),2) as DTB
	from SinhVien sv join KetQua kq on sv.maSV=kq.maSV join MonHoc mh on mh.maMH=kq.maMH
	group by lop) as b2
where b1.maMH=b2.lop and b1.SL=b2.SL

--7.Cho biết mã số và tên nhưng sinh viên có hơn một nửa số điểm >=5
--8.Cho biết mã số và số điểm lớn hơn 7 của những sinh viên có hơn một nửa số điểm là >=7

GO 
insert SinhVien(tenSV,GT,ngaySinh,que,lop)
values (N'Trần Bảo Trọng','Nam','1995-12-14',N'Hà Giang','L02')
insert SinhVien(tenSV,ngaySinh,que,lop)
values (N'Lê Thùy Dương','1997-05-12',N'Hà Nội','L03')
insert SinhVien(tenSV,GT,ngaySinh,que,lop)
values (N'Trần Phương Thảo','Nam','1996-03-30',N'Quảng Ninh','L01')
insert SinhVien(tenSV,GT,ngaySinh,que,lop)
values (N'Lê Trường An','Nam','1995-11-20',N'Ninh Bình','L04')
insert SinhVien(tenSV,ngaySinh,que,lop)
values (N'Phạm Thị Hương Giang','1990-02-21',N'Hòa Bình','L02')
insert SinhVien(tenSV,GT,ngaySinh,que,lop)
values (N'Trần Anh Bảo','Nam','1995-12-14',N'Quảng Ninh','L01')
insert SinhVien(tenSV,ngaySinh,que,lop)
values (N'Lê Thùy Dung','1997-05-12',N'Hà Nội','L03')
insert SinhVien(tenSV,GT,ngaySinh,que,lop)
values (N'Phạm Trung Tính','Nam','1996-03-30',N'Hà Giang','L02')
insert SinhVien(tenSV,GT,ngaySinh,que,lop)
values (N'Lê An Hải','Nam','1995-11-20',N'Ninh Bình','L04')
insert SinhVien(tenSV,ngaySinh,que,lop)
values (N'Phạm Thị Hương Giang','1990-02-21',N'Hòa Bình','L02')
insert SinhVien(tenSV,GT,ngaySinh,que,lop)
values (N'Đoàn Duy Thức','Nam','1994-04-12',N'Hà Nội','L01')
insert SinhVien(tenSV,GT,ngaySinh,que,lop)
values (N'Dương Tuấn Thông','Nam','1991-04-12',N'Nam Định','L03')
insert SinhVien(tenSV,GT,ngaySinh,que,lop)
values (N'Lê Thành Đạt','Nam','1993-04-15',N'Phú Thọ','L04')
insert SinhVien(tenSV,ngaySinh,que,lop)
values (N'Nguyễn Hằng Nga','1993-05-25',N'Hà Nội','L01')
insert SinhVien(tenSV,ngaySinh,que,lop)
values (N'Trần Thanh Nga','1994-06-20',N'Phú Thọ','L03')
insert SinhVien(tenSV,GT,ngaySinh,que,lop)
values (N'Trần Trọng Hoàng','Nam','1995-12-14',N'Hà Giang','L02')
insert SinhVien(tenSV,GT,ngaySinh,que,lop)
values (N'Nguyễn Mai Hoa','Nữ','1997-05-12',N'Hà Nội','L03')
insert SinhVien(tenSV,GT,ngaySinh,que,lop)
values (N'Lê Thúy An','Nam','1998-03-23',N'Hà Nội','L01')
GO
insert MonHoc(tenMH,DVHT) values (N'Toán cao cấp',3)
insert MonHoc(tenMH,DVHT) values (N'Mạng máy tính',3)
insert MonHoc(tenMH,DVHT) values (N'Tin đại cương',4)
GO
insert KetQua values (1,1,8)
insert KetQua values (1,2,5)
insert KetQua values (1,3,7)
insert KetQua values (2,1,9)
insert KetQua values (2,2,5)
insert KetQua values (2,3,2)
insert KetQua values (3,1,4)
insert KetQua values (3,2,2)
insert KetQua(maSV,maMH) values (3,3)
insert KetQua values (4,1,1)
insert KetQua values (5,1,4)
insert KetQua values (6,1,2)
insert KetQua values (6,2,7)
insert KetQua values (6,3,9)
insert KetQua values (7,1,4)
insert KetQua values (7,2,5)
insert KetQua values (7,3,8)
insert KetQua values (8,1,9)
insert KetQua values (8,2,8)
insert KetQua values (9,1,7)
insert KetQua values (9,2,7)
insert KetQua values (9,3,5)
insert KetQua values (10,1,3)
insert KetQua values (10,3,6)
insert KetQua values (11,1,6)
insert KetQua values (12,1,8)
insert KetQua values (12,2,7)
insert KetQua values (12,3,5)
insert KetQua values (13,1,6),(13,2,5),(13,3,5)
insert KetQua values (14,1,8),(14,2,9),(14,3,7)
insert KetQua values (15,1,3),(15,2,6),(15,3,4)
