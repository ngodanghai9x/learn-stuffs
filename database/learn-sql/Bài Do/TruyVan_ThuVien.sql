select * from PHIEUMUON
select * from BANDOC
SELECT * FROM SACH
--1.Xem bạn có mã bạn đọc là BD008 đã mượn những quyển sách nào ( in mã sách và tên sách)
select distinct PM.maS,TenS
from BANDOC as bd,PHIEUMUON as pm,SACH as s
where pm.MaBD = 'BD008' and s.maS = pm.MaS
--2.Có bao nhiêu cuốn Lập trình đã được mượn vào tháng 8/2019 
select count (pm.MaS) as N'Số lượng'
from PHIEUMUON as pm,SACH as s
where s.TheLoai = N'Lập trình' and pm.MaS = s.maS and Ngaymuon >='2019-08-01' and Ngaymuon <= '2019-08-31'
--3.Hiện thị về việc mượn sách của những độc giả quê ở Hà nội
select PM.MaBD,hotenBD,TenS
from BANDOC as bd,PHIEUMUON as pm,SACH as s
where bd.maBD = pm.MaBD and s.maS = pm.MaS and bd.quequan =N'Hà Nội'
--4.Hiển thị mã bạn đọc và tên của các bạn cùng mượn sách có mã là SH004
select pm.MaBD,hotenBD
from BANDOC as bd,PHIEUMUON as pm
where pm.MaS ='SH004' and bd.maBD = pm.MaBD
--5.Hiển thị danh sách bạn đọc quê ở Nghệ An và chưa trả sách 
select pm.MaBD,hotenBD 
from BANDOC as bd,PHIEUMUON as pm
where bd.maBD = pm.MaBD and quequan =N'Nghệ An' and TraSach =0
--6.Hiển thị bạn đọc quê ở Hà nội mượn nhiều sách nhất
select bt.MaBD,hotenBD 
from (select pm.MaBD,COUNT(pm.MaS)as SL 
		from PHIEUMUON as pm,BANDOC as bd 
		where bd.quequan = N'Hà Nội' and bd.maBD = pm.MaBD 
		group by pm.MaBD) as bt ,PHIEUMUON as pm,BANDOC as bd
WHERE bt.MaBD = bd.maBD AND SL = (select MAX(SL) 
									from ( select pm.MaBD,COUNT(pm.MaS)as SL
											from PHIEUMUON as pm,BANDOC as bd
											where bd.quequan = N'Hà Nội' and bd.maBD = pm.MaBD
											group by pm.MaBD) as maxSL)
group by bt.MaBD,hotenBD
--7.Tính số lượng sách của mỗi thể loại có trong thư viện
select TheLoai,count(TheLoai) as SL
from Sach as s
group by TheLoai
--8.Hiển thị các cuốn sách được in ở nhà xuất bản giáo dục trước năm 1994
select maS,TenS,NamXB 
from SACH as s
where s.NhaXB = N'NXB Giáo Dục' and s.NamXB <1994
--9.Hiển thị các bạn có mã bạn đọc nhưng chưa mượn sách bao giờ
select bd.maBD,bd.hotenBD
FROM BANDOC as bd
EXCEPT
select pm.MaBD,hotenBD 
from PHIEUMUON as pm,BANDOC as bd
where pm.MaBD = bd.maBD
--10.Hiển thị các bạn mượn nhiều hơn hoặc bằng 2 quyển sách
select SLsach.maBD,hotenBD,SL
from PHIEUMUON as pm,BANDOC as bd,(select  pm.MaBD,count(MaS) as SL from PHIEUMUON as pm,BANDOC as bd where bd.maBD = pm.MaBD group by pm.maBD) as SLsach
where bd.maBD = SLsach.MaBD AND SL >=2
group by SLsach.maBD,hotenBD,SL
--11.Hiển thị các bạn mượn nhiều hơn hoặc bằng 3 quyển sách thuộc thể loại “Lập trình” vào tháng 8/2019
select SLmuon.MaBD,hotenBD
from (select pm.MaBD,COUNT(pm.MaS) as SL
from SACH as s,PHIEUMUON as pm,BANDOC as bd
where bd.maBD = pm.MaBD and s.maS =pm.MaS and s.TheLoai = N'Lập trình' and pm.Ngaymuon >='2019-08-01' and pm.Ngaymuon<='2019-08-31'
group by pm.MaBD) as SLmuon,BANDOC as bd
where SLmuon.SL>=3 and SLmuon.MaBD = bd.maBD
--12.Hiển thị tổng số sách đã được mượn ở Thư viện 
select count(pm.MaS) as N'Số lượng sách đã mượn'
from PHIEUMUON as pm
--13.Hiện thị mã và tên bạn đọc mượn sách nhiều hơn bạn có mã số là BD001
select b1.MaBD,hotenBD
from (select pm.MaBD,hotenBD,count(pm.MaS) as SL 
		from PHIEUMUON AS PM,BANDOC AS bd
		where pm.MaBD = bd.maBD
		group by pm.MaBD,hotenBD) as b1
where b1.SL > (select count(PM.MaS) as SL
from PHIEUMUON as pm
where pm.MaBD = N'BD001')
--14.Hiển thị mã và tên cuốn sách được mượn nhiều nhất,ít nhất ở Thư viện năm 2019
/*select pm.MaS,s.TenS,count(pm.MaS) as SoLanMuon
from PHIEUMUON as pm,SACH as s
where year(pm.Ngaymuon) ='2019' and s.maS = pm.MaS
group by pm.MaS,s.TenS*/


/*select min(SoLanMuon) AS SLmin,max(SoLanMuon) AS MAXSL
from (select pm.MaS,s.TenS,count(pm.MaS) as SoLanMuon
from PHIEUMUON as pm,SACH as s
where year(pm.Ngaymuon) ='2019' and s.maS = pm.MaS
group by pm.MaS,s.TenS) as b1*/

select b2.MaS,b2.TenS,SoLanMuon
from (select pm.MaS,s.TenS,count(pm.MaS) as SoLanMuon
	from PHIEUMUON as pm,SACH as s
	where year(pm.Ngaymuon) ='2019' and s.maS = pm.MaS
	group by pm.MaS,s.TenS) as b2,(select min(SoLanMuon) AS SLmin,max(SoLanMuon) AS MAXSL
									from (select pm.MaS,s.TenS,count(pm.MaS) as SoLanMuon
											from PHIEUMUON as pm,SACH as s
											where year(pm.Ngaymuon) ='2019' and s.maS = pm.MaS
											group by pm.MaS,s.TenS)as b1) as b3
where b3.MAXSL = b2.SoLanMuon or b3.SLmin = b2.SoLanMuon
--15.Cho danh sách các bạn đọc mượn sách quá hạn tính đến ngày hiện tại
select PM.MaBD,hotenBD,Ngaymuon,pm.MaS
from PHIEUMUON AS PM, BANDOC AS BD
WHERE PM.MaBD = BD.maBD AND  DATEDIFF(day,pm.Ngaymuon,GETDATE())>5 and TraSach = 0