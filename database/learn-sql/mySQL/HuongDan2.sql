use master;
 -- conver by tools
if exists (select name from sys.databases where name=N'Quanlysinhvien') then
drop database Quanlysinhvien
end if;
 

create database Quanlysinhvien

use Quanlysinhvien;
 

-- SQLINES LICENSE FOR EVALUATION USE ONLY
create table Sinhvien
(
Masv int not null primary key auto_increment,
Tensv nvarchar(50) not null,
Gioitinh nvarchar(5),
Ngaysinh nvarchar(50),
Que nvarchar(50),
Lop nvarchar(5)
);

-- SQLINES LICENSE FOR EVALUATION USE ONLY
create table Monhoc
(
Mamh int not null primary key auto_increment,
Tenmh nvarchar(50),
DVHT int
);

-- SQLINES LICENSE FOR EVALUATION USE ONLY
create table Ketqua
(
Masv int,
Mamh int,
Diem int,
constraint check_Diem check (Diem between 0 and 10),
constraint primary_key primary key (Masv, Mamh),
constraint khoaNgoai_SV_KQ foreign key (Masv) references Sinhvien (Masv),
constraint khoaNgoai_MH_KQ foreign key (Mamh) references Monhoc (Mamh)
);

insert Sinhvien
values	(N'Phạm Trung Tính', 'Nam', '03/30/1996', N'Quảng Ninh', 'L01'),
		(N'Trần Bảo Trọng', 'Nam', '12/14/1995', N'Hà Giang', 'L02'),
		(N'Lê Thùy Dung', N'Nữ', '05/12/1997', N'Hà Nội', 'L03'),
		(N'Lê Trường An', 'Nam', '11/20/1995', N'Ninh Bình', 'L04'),
		(N'Phạm Thị Hương Giang', N'Nữ', '2/21/1999', N'Hòa Bình', 'L02'),
		(N'Đoàn Duy Thức', 'Nam', '4/12/1994', N'Hà Nội', 'L01'),
		(N'Dương Tuấn Thông', 'Nam', '4/12/1991', N'Nam Định', 'L03'),
		(N'Lê Thành Đạt', 'Nam', '4/15/1993', N'Phú Thọ', 'L04')

insert Monhoc
values	(N'Toán cao cấp', 3),
		(N'Mạng máy tính', 3),
		(N'Tin học đại cương', 4),
		(N'Hệ quản trị cơ sở dữ liệu', 2),
		(N'Cơ sở dữ liệu', 2)

insert Ketqua
values	(1,1,8),(1,2,5),(2,2,1),
		(3,2,7),(4,2,3),(1,3,7),
		(2,1,9),(4,1,2),(3,1,4),
		(2,3,2),(5,1,4),(6,1,2),
		(6,3,9),(6,2,7),(6,5,10)

-- SQLINES LICENSE FOR EVALUATION USE ONLY
select * from Sinhvien
-- SQLINES LICENSE FOR EVALUATION USE ONLY
select * from Monhoc
-- SQLINES LICENSE FOR EVALUATION USE ONLY
select * from Ketqua

/* SQLINES DEMO ***  mã số, tên, điểm thi tất cả các môn của sv: abc*/
-- SQLINES LICENSE FOR EVALUATION USE ONLY
select mh.Mamh, Tenmh, Diem
from Sinhvien sv, Monhoc mh, Ketqua kq
where sv.Masv = kq.Masv and mh.Mamh = kq.Mamh and Tensv = N'Phạm Trung Tính'

/* SQLINES DEMO ***  mã số, tên môn và điểm thi ở những môn mà sinh viên abc phải thi lại (điểm<5)*/
-- SQLINES LICENSE FOR EVALUATION USE ONLY
select mh.Mamh, Tenmh, Diem
from Sinhvien sv, Monhoc mh, Ketqua kq
where sv.Masv = kq.Masv and mh.Mamh = kq.Mamh and Tensv = N'Đoàn Duy Thức' and Diem < 5

/* SQLINES DEMO ***  mã số, tên những sinh viên đã thi ít nhất là 1 trong 3 môn Cơ sở dữ liệu, cấu trúc dữ liệu, mạng máy tính.*/
-- SQLINES LICENSE FOR EVALUATION USE ONLY
select sv.Masv, Tensv
from Sinhvien sv, Monhoc mh, Ketqua kq
where sv.Masv = kq.Masv and mh.Mamh = kq.Mamh and Tenmh in (N'Cơ sở dữ liệu', N'Cấu trúc dữ liệu', N'Mạng máy tính')

/* SQLINES DEMO ***  mã số, tên những môn mà sinh viên có mã số 1 chưa có điểm */
(select Mamh, Tenmh
from Monhoc mh)
except
(select mh.Mamh, Tenmh
from Sinhvien sv, Monhoc mh, Ketqua kq
where sv.Masv = kq.Masv and mh.Mamh = kq.Mamh and sv.Masv = 1)

/* SQLINES DEMO ***  mã số, tên những sinh viên có điểm thi môn 1 không thấp nhất khoa*/
-- SQLINES LICENSE FOR EVALUATION USE ONLY
select sv.Masv, Tensv
from Sinhvien sv, Monhoc mh, Ketqua kq
where sv.Masv = kq.Masv and mh.Mamh = kq.Mamh and mh.Mamh = 1 and Diem > (select MIN(Diem) from Ketqua where Mamh = 1)

/* SQLINES DEMO ***  mã số và tên những sinh viên có điểm thi môn 1 lớn hơn điểm thi môn 1 của sinh viên 3*/
-- SQLINES LICENSE FOR EVALUATION USE ONLY
select sv.Masv, Tensv
from Sinhvien sv, Monhoc mh, Ketqua kq
where sv.Masv = kq.Masv and mh.Mamh = kq.Mamh and mh.Mamh = 1 and Diem > (select Diem from Ketqua where Mamh = 1 and Masv = 3)


/* SQLINES DEMO ***  số sinh viên phải thi lại môn Cơ sở dữ liệu */
-- SQLINES LICENSE FOR EVALUATION USE ONLY
select COUNT(*) as N'Số sv thi lại'
from Monhoc mh, Ketqua kq
where mh.Mamh = kq.Mamh and Tenmh = N'Mạng máy tính' and Diem < 5

/* SQLINES DEMO *** �i mỗi môn, cho biết tên môn và số sinh viên phải thi lại môn đó mà số sinh viên thi lại >=2*/
-- SQLINES LICENSE FOR EVALUATION USE ONLY
select Tenmh, COUNT(Diem) as N'Số sv thi lại'
from Monhoc mh, Ketqua kq
where mh.Mamh = kq.Mamh and Diem < 5
group by Tenmh
having COUNT(Diem) > 2

/* SQLINES DEMO ***  điểm cao nhất môn 1 mà các sinh viên đạt được*/
-- SQLINES LICENSE FOR EVALUATION USE ONLY
select MAX(Diem) as N'Điểm cao nhất môn 1'
from Ketqua
where Mamh = 1

/* SQLINES DEMO *** t mã số, tên và lớp của sinh viên đạt điểm cao nhất môn Lý thuyết cơ sở dữ liệu  */
-- SQLINES LICENSE FOR EVALUATION USE ONLY
select sv.Masv, Tensv, Lop
from Sinhvien sv, Monhoc mh, Ketqua kq, (select MAX(Diem) as maxDiem from Monhoc mh, Ketqua kq where mh.Mamh = kq.Mamh and Tenmh = N'Cơ sở dữ liệu') a
where sv.Masv = kq.Masv and mh.Mamh = kq.Mamh and Tenmh = N'Cơ sở dữ liệu' and Diem = a.maxDiem

/* SQLINES DEMO *** t sinh viên có điểm trung bình chung >=5 */
-- SQLINES LICENSE FOR EVALUATION USE ONLY
select Tensv, AVG(CAST(Diem as double)) as Diemtb
from Sinhvien sv, Ketqua kq
where sv.Masv = kq.Masv
group by Tensv
having AVG(CAST(Diem as double)) >= 5

/* SQLINES DEMO *** ��m từng môn của sv để check lại điểm */
-- SQLINES LICENSE FOR EVALUATION USE ONLY
select Tensv, Tenmh, Diem
from Sinhvien sv, Monhoc mh, Ketqua kq
where sv.Masv = kq.Masv and mh.Mamh = kq.Mamh
/* SQLINES DEMO *** �i sinh viên cho biết mã số, tên và điểm trung bình chung học tập của sinh viên đó*/
-- SQLINES LICENSE FOR EVALUATION USE ONLY
select sv.Masv, Tensv, AVG(CAST(Diem as double)) as Diemtb
from Sinhvien sv, Ketqua kq
where sv.Masv = kq.Masv
group by sv.Masv, Tensv

/* SQLINES DEMO *** ới mỗi lớp, lập bảng điểm gồm mã số, tên sinh viên và điểm trung bình chung học tập. 
		   Sắp xếp danh sách theo chiều giảm dần của điểm trung bình chung học tập và chiều tăng dần của họ tên*/
-- SQLINES LICENSE FOR EVALUATION USE ONLY
select sv.Masv, Tensv, AVG(CAST(Diem as double)) as Diemtb
from Sinhvien sv, Ketqua kq
where sv.Masv = kq.Masv and Lop = 'L03' /* SQLINES DEMO *** đổi tên lớp */
group by sv.Masv, Tensv
order by Diemtb desc, Tensv asc

/* SQLINES DEMO *** �t mã số và số điểm lớn hơn 7 của những sinh viên có hơn một nửa số điểm là >=7 */
-- SQLINES LICENSE FOR EVALUATION USE ONLY
SELECT distinct MaSV,COUNT(MaMH) as N'SỐ LƯỢNG'
FROM  KetQua as kg
WHERE Diem > 7
GROUP BY MaSV
HAVING COUNT(MaMH) >= (select COUNT(distinct MaMH)/2 from KetQua where Diem >= 7 )
/* SQLINES DEMO *** �t mã số và tên nhưng sinh viên có hơn một nửa số điểm >=5*/
-- SQLINES LICENSE FOR EVALUATION USE ONLY
select sv.Masv, Tensv
from Sinhvien sv, Ketqua kq
where sv.Masv = kq.Masv and Diem >= 5
having COUNT(Diem) > 50 PERCENT */ chua lam duoc */
-- SQLINES LICENSE FOR EVALUATION USE ONLY
SELECT distinct sv.MaSV,Ho_Ten ,COUNT(MaMH) as N'SỐ LƯỢNG'

FROM  sinhvien as sv,KetQua as kg
WHERE sv.MaSV = kg .MaSV 
GROUP BY sv.MaSV ,Ho_Ten 
HAVING COUNT(MaMH) >= (select COUNT(distinct MaMH)/2 from KetQua where Diem >= 5 )

/* SQLINES DEMO *** ới mỗi lớp, cho biết mã số và tên nhưng sinh viên phải thi lại từ 2 môn trở lên*/
-- SQLINES LICENSE FOR EVALUATION USE ONLY
select sv.Masv, Tensv
from Sinhvien sv, Ketqua kq
where sv.Masv = kq.Masv and Diem < 5 and Lop = 'L04' /* SQLINES DEMO *** đổi tên lớp */
group by sv.Masv, Tensv
having COUNT(Diem) > 2

/* SQLINES DEMO *** �t mã số và tên những môn học mà tất cả các sinh viên đều đạt điểm >=5*/
-- SQLINES LICENSE FOR EVALUATION USE ONLY
select mh.Mamh, Tenmh
from Monhoc mh, Ketqua kq 
where mh.Mamh = kq.Mamh and Diem >= 5/* chua lam duoc*/

-- SQLINES LICENSE FOR EVALUATION USE ONLY
SELECT distinct mh.MaMH ,TenMH 
FROM MonHoc as mh, KetQua as kg
WHERE mh.MaMH = kg.MaMH  and kg.MaMH not in (select MaMH from KetQua where Diem < 5)

/* SQLINES DEMO *** �t mã số và tên của sinh viên có điểm trung bình chung học tập >=8 */
-- SQLINES LICENSE FOR EVALUATION USE ONLY
select sv.Masv, Tensv
from Sinhvien sv, Ketqua kq
where sv.Masv = kq.Masv
group by sv.Masv, Tensv
having AVG(CAST(Diem as double)) >= 8

/* SQLINES DEMO *** �t mã số và tên những sinh viên có điểm trung bình chung học tập cao nhất*/
-- SQLINES LICENSE FOR EVALUATION USE ONLY
select sv.Masv, Tensv, AVG(CAST(Diem as double)) as Diemtb
from Sinhvien sv, Ketqua kq
where sv.Masv = kq.Masv
group by sv.Masv, Tensv
order by Diemtb desc
limit 1

-- SQLINES LICENSE FOR EVALUATION USE ONLY
select sv.Masv, Tensv
from Sinhvien sv, Ketqua kq
where sv.Masv = kq.Masv and sv.Masv = (select sv.Masv, Tensv, MAX(a.Diemtb) from Sinhvien sv, (select AVG(CAST(Diem as double)) as Diemtb
																					from Sinhvien sv, Ketqua kq
																					where sv.Masv = kq.Masv
																					group by sv.Masv, Tensv) a)
/* chua lam duoc */
-- SQLINES LICENSE FOR EVALUATION USE ONLY
SELECT distinct sv.MaSV , Ho_Ten AS N' TÊN SINH VIÊN' ,AVG(CAST(Diem as double)) as N'ĐIỂM TRUNG BÌNH'
FROM sinhvien as sv, KetQua as kg
WHERE sv.MaSV = kg .MaSV 
GROUP BY sv.MaSV ,Ho_Ten
having AVG(Diem)>=ALL(select AVG(DIEM) from Ketqua group by MaSV)
/* SQLINES DEMO *** �t mã số và tên những sinh viên phai thi lại ở ít nhất là những môn mà sinh viên có mã số 3 phải thi lại*/
-- SQLINES LICENSE FOR EVALUATION USE ONLY
select sv.Masv, Tensv
from Sinhvien sv, Monhoc mh, Ketqua kq
where sv.Masv = kq.Masv and mh.Mamh = kq.Mamh and sv.Masv != 3 and Diem < 5 and Tenmh in (select Tenmh 
																						from Monhoc mh, Ketqua kq 
																						where mh.Mamh = kq.Mamh and Diem < 5 and kq.Masv = 3)