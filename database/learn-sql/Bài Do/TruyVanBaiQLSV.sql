select * from SinhVien
select * from MonHoc
select * from KetQua
use QLSV
--1.	Cho biết mã môn học, tên môn học,  điểm thi  tất cả các môn của sinh viên tên Thức
select mh.maMH,mh.tenMH,kq.diem
from MonHoc as mh,KetQua as kq
where mh.maMH = kq.maMH and kq.maSV in 
(select sv.maSV
from SinhVien as sv
where sv.tenSV like N'% Thức')
--2.	Cho biết mã môn học, tên môn và điểm thi ở những môn mà sinh viên tên Dung phải thi lại (điểm<5)
select mh.maMH,mh.tenMH,kq.diem
from MonHoc as mh,KetQua as kq
where mh.maMH = kq.maMH and kq.diem <5 and kq.maSV in
(select sv.maSV from SinhVien as sv where sv.tenSV like N'% Dung')	
--3.	Cho biết mã sinh viên, tên những sinh viên đã thi ít nhất là 1 trong 3 môn Lý thuyết Cơ sở dữ liệu, Tin học đại cương, mạng máy tính.
select distinct sv.maSV,sv.tenSV
from SinhVien as sv,KetQua as kq
where sv.maSV=kq.maSV and kq.maMH in
(select mh.maMH
from MonHoc as mh
where mh.tenMH = N'Toán cao cấp' or mh.tenMH = N'Tin đại cương' or mh.tenMH = N'Mạng máy tính')
--4.Cho biết mã môn học, tên môn mà sinh viên có mã số 1 chưa có điểm
select mh.maMH,mh.tenMH
from MonHoc as mh
except
select distinct kq.maMH,mh.tenMH
from MonHoc as mh,SinhVien as sv,KetQua as kq
where sv.maSV=kq.maSV and sv.maSV=1 and mh.maMH = kq.maMH
--5.Cho biết điểm cao nhất môn 1 mà các sinh viên đạt được
select mh.tenMH,max(kq.diem) as N'Điểm cao nhất'
from MonHoc as mh,KetQua as kq
where mh.maMH = kq.maMH and kq.maMH = 1
group by tenMH
--6.Cho biết mã sinh viên, tên những sinh viên có điểm thi môn 2 không thấp nhất khoa
select distinct kq.maSV,sv.tenSV,diem
from SinhVien as sv,KetQua as kq
where  sv.maSV=kq.maSV and kq.maMH=2 and kq.diem >
(select min(diem) FRom KetQua as kq WHere kq.maMH=2)
--7.Cho biết mã sinh viên và tên những sinh viên có điểm thi môn 1 lớn hơn điểm thi môn 1 của sinh viên có mã số 3
select kq.maSV,sv.tenSV
from SinhVien as sv,KetQua as kq
where sv.maSV = kq.maSV and kq.maMH=1 and kq.diem >
(
select kq.diem
from KetQua as kq
where kq.maSV = 3 and kq.maMH =1
)
--9.Đối với mỗi môn, cho biết tên môn và số sinh viên phải thi lại môn đó mà số sinh viên thi lại >=2
select tenMH,count(kq.maSV) as N'Số sinh viên thi lại'
from MonHoc as mh,KetQua as kq
where mh.maMH = kq.maMH and kq.diem<4 
group by tenMH
having count(kq.maSV)>=2
--10.Cho biết mã sinh viên, tên và lớp của sinh viên đạt điểm cao nhất môn Tin đại cương
select kq.maSV,sv.tenSV
from SinhVien as sv,KetQua as kq
where sv.maSV = kq.maSV and kq.diem =
(select max(kq.diem)
from SinhVien as sv,MonHoc as mh,KetQua as kq
where mh.tenMH=N'Tin đại cương' and mh.maMH=kq.maMH)
--11.Đối với mỗi lớp, lập bảng điểm gồm mã sinh viên, tên sinh viên và điểm trung bình chung học tập.
select b1.maSV,tenSV,lop,SUM(b1.diem) as N'ĐTBC'
from
	(select b2.maSV,(kq.diem*mh.DVHT)/b2.SL as diem
	from KetQua as kq,MonHoc as mh,(select maSV,sum(DVHT) as SL from MonHoc AS mh,KetQua as kq where kq.maMH = mh.maMH group by maSV)as b2
	where b2.maSV=kq.maSV  and kq.maMH = mh.maMH
	group by b2.maSV,DVHT,diem,b2.SL) as b1, SinhVien as sv
where sv.maSV =b1.maSV
GROUP BY b1.maSV,tenSV,lop
order by lop asc
select b1.maSV,tenSV,lop,SUM(b1.diem) as N'ĐTBC'
from
	(select b2.maSV,(kq.diem*mh.DVHT)/b2.SL as diem
	from KetQua as kq,MonHoc as mh,(select maSV,sum(DVHT) as SL from MonHoc AS mh,KetQua as kq where kq.maMH = mh.maMH group by maSV)as b2
	where b2.maSV=kq.maSV  and kq.maMH = mh.maMH
	group by b2.maSV,DVHT,diem,b2.SL) as b1, SinhVien as sv
where sv.maSV =b1.maSV
GROUP BY b1.maSV,tenSV,lop
order by lop asc
/*select maSV,sum(DVHT) as SL from MonHoc AS mh,KetQua as kq where kq.maMH = mh.maMH group by maSV
 
select sv.maSV,tenSV,(kq.diem*mh.DVHT)/(select sum (DVHT) from MonHoc) as N'Điểm trung bình chung'  ---(diem*dvht)/tổng số tín chỉ
from SinhVien as sv, KetQua as kq,MonHoc as mh
where sv.maSV=kq.maSV and kq.maMH = mh.maMH
group by sv.maSV,tenSV,DVHT,diem*/

--12.	Đối với mỗi lớp, cho biết mã sinh viên và tên những sinh viên phải thi lại từ 2 môn trở lên
select  lop,kq.maSV,tenSV
from SinhVien as sv,KetQua as kq,MonHoc as mh
where sv.maSV = kq.maSV and diem<4 and mh.maMH  = kq.maMH
group by kq.maSV,tenSV,lop
having count(kq.maMH)>=0
--13.Cho biết mã số và tên của những sinh viên tham gia thi tất cả các môn.
SELECT b1.maSV,tenSV
FROM (
	select kq.maSV,count(kq.maMH) as SL
	from KetQua AS kq
	group by kq.maSV) AS b1,
	SinhVien AS SV
where sv.maSV=b1.maSV and b1.SL =(
select count(maMH)
from MonHoc AS mh)

--14.Cho biết mã sinh viên và tên của sinh viên có điểm trung bình chung học tập >=6
select *
from
	(select b1.maSV,tenSV,SUM(b1.diem) as DTB
	from
		(select b2.maSV,(kq.diem*mh.DVHT)/b2.SL as diem
		from KetQua as kq,MonHoc as mh,(select maSV,sum(DVHT) as SL from MonHoc AS mh,KetQua as kq where kq.maMH = mh.maMH group by maSV)as b2
		where b2.maSV=kq.maSV  and kq.maMH = mh.maMH
		group by b2.maSV,DVHT,diem,b2.SL) as b1, SinhVien as sv
	where sv.maSV =b1.maSV
	GROUP BY b1.maSV,tenSV) as b2
where b2.DTB>=6
--15.Cho biết mã sinh viên và tên những sinh viên phải thi lại ở ít nhất là những môn mà sinh viên có mã số 3 phải thi 
select sv.maSV,tenSV 
from SinhVien as sv,MonHoc as mh,KetQua as kq
where sv.maSV = kq.maSV and diem<4 and mh.maMH=kq.maMH  and kq.maSV !=3 and kq.maMH in(
select kq.maMH
from KetQua as kq
where kq.maSV=3 and diem<4)
--16*Cho mã sv và tên của những sinh viên có hơn nửa số điểm  >=5. 
/*select maSV,count(maSV) as SLDiem from KetQua
where diem >=5
group by maSV

SELECT maSV,COUNT(maMH) AS SLMonThi
FROM KetQua AS KQ
GROUP BY maSV
*/
select b1.maSV,tenSV
from 
	(select maSV,count(maSV) as SL from KetQua
	where diem >=5
	group by maSV) as b1,
	(SELECT maSV,COUNT(maMH) AS SL
	FROM KetQua AS KQ
	GROUP BY maSV) as b2,SinhVien as sv
where b1.maSV = b2.maSV and b1.SL > b2.SL/2 and sv.maSV = b1.maSV
--17.	*Cho danh sách tên và mã sinh viên có điểm trung bình chung lớn hơn điểm trung bình của toàn khóa.
--điểm tbc của từng sv
/*select b1.maSV,tenSV,SUM(b1.diem) as ĐTBC
from
	(select b2.maSV,(kq.diem*mh.DVHT)/b2.SL as diem
	from KetQua as kq,MonHoc as mh,(select maSV,sum(DVHT) as SL from MonHoc AS mh,KetQua as kq where kq.maMH = mh.maMH group by maSV)as b2
	where b2.maSV=kq.maSV  and kq.maMH = mh.maMH
	group by b2.maSV,DVHT,diem,b2.SL) as b1, SinhVien as sv
where sv.maSV =b1.maSV
GROUP BY b1.maSV,tenSV
*/


--Điểm tbc toàn khóa
/*select avg(b1.DTBC) as DTBCTK
from(
	select b1.maSV,tenSV,SUM(b1.diem) as DTBC
	from
		(select b2.maSV,(kq.diem*mh.DVHT)/b2.SL as diem
		from KetQua as kq,MonHoc as mh,(select maSV,sum(DVHT) as SL from MonHoc AS mh,KetQua as kq where kq.maMH = mh.maMH group by maSV)as b2
		where b2.maSV=kq.maSV  and kq.maMH = mh.maMH
		group by b2.maSV,DVHT,diem,b2.SL) as b1, SinhVien as sv
	where sv.maSV =b1.maSV
	GROUP BY b1.maSV,tenSV
	) as b1
	*/

select *
from
	(--Điểm TBC từng sv
	select b1.maSV,tenSV,SUM(b1.diem) as ĐTBC
	from
		(select b2.maSV,(kq.diem*mh.DVHT)/b2.SL as diem
		from KetQua as kq,MonHoc as mh,(select maSV,sum(DVHT) as SL from MonHoc AS mh,KetQua as kq where kq.maMH = mh.maMH group by maSV)as b2
		where b2.maSV=kq.maSV  and kq.maMH = mh.maMH
		group by b2.maSV,DVHT,diem,b2.SL
		) as b1, SinhVien as sv
	where sv.maSV =b1.maSV
	GROUP BY b1.maSV,tenSV
	) as b1,
	--Điểm TBC toàn khóa
	(select avg(b1.DTBC) as DTBCTK
	from(
	select b1.maSV,tenSV,SUM(b1.diem) as DTBC
	from
		(select b2.maSV,(kq.diem*mh.DVHT)/b2.SL as diem
		from KetQua as kq,MonHoc as mh,(select maSV,sum(DVHT) as SL from MonHoc AS mh,KetQua as kq where kq.maMH = mh.maMH group by maSV)as b2
		where b2.maSV=kq.maSV  and kq.maMH = mh.maMH
		group by b2.maSV,DVHT,diem,b2.SL
		) as b1, SinhVien as sv
		where sv.maSV =b1.maSV
		GROUP BY b1.maSV,tenSV
		) as b1
	) as b2
where b1.ĐTBC > b2.DTBCTK

--18.*Cho danh sách mã sinh viên, tên sinh viên có điểm môn Tin đại cương cao nhất của mỗi lớp.
/*select sv.maSV,tenSV
from SinhVien as sv,KetQua as kq,MonHoc as mh
where sv.maSV=kq.maSV and lop = N'L02' and tenMH = N'Tin đại cương' and mh.maMH = kq.maMH and diem=(
select max(diem)
from SinhVien as sv,MonHoc as mh, KetQua as kq
where sv.maSV=kq.maSV and tenMH = N'Tin đại cương' and mh.maMH = kq.maMH AND lop =N'L02')
select lop,maSV 
from
	(select lop,kq.maSV
	from KetQua AS KQ,MonHoc AS MH,SinhVien as sv
	WHERE MH.tenMH = N'Tin đại cương' and  mh.maMH = kq.maMH and sv.maSV = kq.maSV
	group by lop,kq.maSV) as b1
group by lop,maSV

select b1.
from
	(select lop
from KetQua AS KQ,MonHoc AS MH,SinhVien as sv
WHERE MH.tenMH = N'Tin đại cương' and  mh.maMH = kq.maMH and sv.maSV = kq.maSV
group by lop)as b1,SinhVien
*/
-- điểm cao nhất của mỗi lớp
/*
create function dssvlop (@lop char(10))
RETURNS TABLE
AS
RETURN
(
SELECT kq.maSV,tenSV,lop,kq.diem
FROM SinhVien as sv,KetQua as kq,MonHoc as mh
where sv.maSV = kq.maSV and mh.maMH = kq.maMH and mh.tenMH = N'Tin đại cương' and Lop = @lop
)

SELECT lop,tenSV,maSV,diem FROM dssvlop ('L01')
where diem=(
select max(b1.diem) 
from
(
	SELECT * FROM dssvlop ('L01')
) as b1)

union
SELECT lop,tenSV,maSV,diem FROM dssvlop ('L02')
where diem = (select max(b2.diem) 
from
(
	SELECT * FROM dssvlop ('L02')
) as b2)
union
SELECT lop,tenSV,maSV,diem FROM dssvlop ('L03')
where diem = (select max(b3.diem) 
from
(
	SELECT * FROM dssvlop ('L03')
) as b3)
union
SELECT lop,tenSV,maSV,diem FROM dssvlop ('L04')
where diem = (select max(b4.diem) 
from
(
	SELECT * FROM dssvlop ('L04')
)as b4)*/

--18.*Cho danh sách mã sinh viên, tên sinh viên có điểm môn Tin đại cương cao nhất của mỗi lớp.
--Lấy điểm môn Tin của từng sinh vien
select kq.maSV,tenSV,lop,diem
from SinhVien as sv,KetQua as kq,MonHoc as mh
where sv.maSV = kq.maSV and mh.maMH = kq.maMH and mh.tenMH = N'Tin đại cương'

--Lấy điểm cao nhất môn tin của từng lớp
select b1.lop,max(diem) as maxD
from
	(select kq.maSV,tenSV,lop,diem
	from SinhVien as sv,KetQua as kq,MonHoc as mh
	where sv.maSV = kq.maSV and mh.maMH = kq.maMH and mh.tenMH = N'Tin đại cương'
	 )as b1,SinhVien as sv
group by b1.lop
--KẾT QUẢ
select b2.lop,maSV,tenSV,maxDTin
from (select kq.maSV,tenSV,lop,diem
	from SinhVien as sv,KetQua as kq,MonHoc as mh
	where sv.maSV = kq.maSV and mh.maMH = kq.maMH and mh.tenMH = N'Tin đại cương') as b1,
	(select b1.lop,max(diem) as maxDTin
	from
		(select kq.maSV,tenSV,lop,diem
		from SinhVien as sv,KetQua as kq,MonHoc as mh
		where sv.maSV = kq.maSV and mh.maMH = kq.maMH and mh.tenMH = N'Tin đại cương'
		 )as b1
	group by b1.lop) as b2
where b1.lop = b2.lop and b1.diem = b2.maxDTin
order by lop asc

--19.*Cho danh sách tên và mã sinh viên có điểm trung bình chung lớn hơn điểm trung bình của lớp sinh viên đó theo học.
--ĐTBCSV của từng sv
select b1.maSV,tenSV,lop,SUM(b1.diem) as ĐTBCSV
	from
		(select b2.maSV,(kq.diem*mh.DVHT)/b2.SL as diem
		from KetQua as kq,MonHoc as mh,(select maSV,sum(DVHT) as SL from MonHoc AS mh,KetQua as kq where kq.maMH = mh.maMH group by maSV)as b2
		where b2.maSV=kq.maSV  and kq.maMH = mh.maMH
		group by b2.maSV,DVHT,diem,b2.SL
		) as b1, SinhVien as sv
	where sv.maSV =b1.maSV
	GROUP BY b1.maSV,tenSV,lop

--ĐTBCLOP TỪNG LỚP

select lop,avg(ĐTBC) AS DTBCLOP
from
	(select b1.maSV,tenSV,lop,SUM(b1.diem) as ĐTBC
	from
		(select b2.maSV,(kq.diem*mh.DVHT)/b2.SL as diem
		from KetQua as kq,MonHoc as mh,(select maSV,sum(DVHT) as SL from MonHoc AS mh,KetQua as kq where kq.maMH = mh.maMH group by maSV)as b2
		where b2.maSV=kq.maSV  and kq.maMH = mh.maMH
		group by b2.maSV,DVHT,diem,b2.SL
		) as b1, SinhVien as sv
	where sv.maSV =b1.maSV
	GROUP BY b1.maSV,tenSV,lop
	) as b1
group by lop

--KẾT QUẢ
SELECT maSV,tenSV
FROM
	(select b1.maSV,tenSV,lop,SUM(b1.diem) as ĐTBCSV
	from
	(select b2.maSV,(kq.diem*mh.DVHT)/b2.SL as diem
	from KetQua as kq,MonHoc as mh,(select maSV,sum(DVHT) as SL from MonHoc AS mh,KetQua as kq where kq.maMH = mh.maMH group by maSV)as b2
	where b2.maSV=kq.maSV  and kq.maMH = mh.maMH
	group by b2.maSV,DVHT,diem,b2.SL
	) as b1, SinhVien as sv
	where sv.maSV =b1.maSV
	GROUP BY b1.maSV,tenSV,lop
	) AS b1,
	(select lop,avg(ĐTBC) AS DTBCLOP
	from
	(select b1.maSV,tenSV,lop,SUM(b1.diem) as ĐTBC
	from
	(select b2.maSV,(kq.diem*mh.DVHT)/b2.SL as diem
	from KetQua as kq,MonHoc as mh,(select maSV,sum(DVHT) as SL from MonHoc AS mh,KetQua as kq where kq.maMH = mh.maMH group by maSV)as b2
	where b2.maSV=kq.maSV  and kq.maMH = mh.maMH
	group by b2.maSV,DVHT,diem,b2.SL
	) as b1, SinhVien as sv
	where sv.maSV =b1.maSV
	GROUP BY b1.maSV,tenSV,lop
		) as b1
	group by lop
	) as b2
where b1.lop = b2.lop and b1.ĐTBCSV >b2.DTBCLOP		









--17.
select *
from
	(--Điểm TBC từng sv
	select b1.maSV,tenSV,SUM(b1.diem) as ĐTBC
	from
		(select kq.maSV,(kq.diem*mh.DVHT)/b2.SL as diem
		from KetQua as kq,MonHoc as mh,(select sum(DVHT) as SL from MonHoc AS mh)as b2
		where  kq.maMH = mh.maMH
		group by kq.maSV,DVHT,diem,b2.SL
		) as b1, SinhVien as sv
	where sv.maSV =b1.maSV
	GROUP BY b1.maSV,tenSV
	) as b1,
	--Điểm TBC toàn khóa
	(select avg(b1.DTBC) as DTBCTK
	from(
	select b1.maSV,tenSV,SUM(b1.diem) as DTBC
	from
		(select b2.maSV,(kq.diem*mh.DVHT)/b2.SL as diem
		from KetQua as kq,MonHoc as mh,(select maSV,sum(DVHT) as SL from MonHoc AS mh,KetQua as kq where kq.maMH = mh.maMH group by maSV)as b2
		where b2.maSV=kq.maSV  and kq.maMH = mh.maMH
		group by b2.maSV,DVHT,diem,b2.SL
		) as b1, SinhVien as sv
		where sv.maSV =b1.maSV
		GROUP BY b1.maSV,tenSV
		) as b1
	) as b2
where b1.ĐTBC > b2.DTBCTK

select SUM(KQ.diem*DVHT)/SUM(DVHT)
from (SinhVien a join KetQua kq on a.maSV = kq.maSV) join MonHoc mh on mh.maMH = kq.maMH
where lop ='L01'	