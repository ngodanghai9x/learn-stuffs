select * from MAYBAY
select * from CHUNGNHAN
select * from CHUYENBAY
select * from CHUNGNHAN
select * from NHANVIEN
select * from CHUYENBAY
--1.Cho biết thông tin về các nhân viên có lương nhỏ hơn 10000
select MaNV,Ten,Luong
from NHANVIEN as nv
where nv.Luong<10000
--2.Cho biết thông tin về các chuyến bay có độ dài đường bay nhỏ hơn 10000km và lớn hơn 8000km
select *
from CHUYENBAY
where DoDai > 8000 and DoDai <10000
--3.	Cho biết thông tin về các chuyến bay xuất phát từ Sài Gòn (SGN) đi Ban Mê Thuột (BMV)
select * 
from CHUYENBAY
where GaDi = N'SGN' AND GaDen = N'BMW'
--4.Có bao nhiêu chuyến bay xuất phát từ Sài Gòn (SGN)
select count(MaCB) as N'Số chuyến'
from CHUYENBAY
where GaDi = N'SGN'
--5.Có bao nhiêu loại máy bay Boeing
select count(MaMB) as SL
from MAYBAY
where Hieu like 'Boeing %'
--6.Cho biết tổng số lương phải trả cho các nhân viên
SELECT SUM(Luong) as N'Tổng lương phải trả'
FROM NHANVIEN
--7.Cho biết mã số và tên của các phi công lái máy bay Boeing
select distinct cn.MaNV,Ten
from NHANVIEN as nv,CHUNGNHAN as cn,MAYBAY as mb
where mb.Hieu like 'Boeing %' and nv.MaNV = cn.MaNV and mb.MaMB = cn.MaMB
--8.Cho biết mã số và tên của các phi công có thể lái được máy bay có mã số là 747
select cn.MaNV ,Ten
from CHUNGNHAN as cn,NHANVIEN as nv
where cn.MaMB = 747 and nv.MaNV = cn.MaNV
--9.CHo biết mã số của các loại máy bay mà nhân viên có họ Nguyễn có thể lái
select cn.MaMB,Hieu
from CHUNGNHAN as cn,NHANVIEN as nv,MAYBAY as mb
where cn.MaNV = nv.MaNV and nv.Ten like 'Nguyen %' and mb.MaMB = cn.MaMB
--10.	Cho biết mã số của các phi công vừa lái được Boeing vừa lại được Airbus A320
select  cn.MaNV
from MAYBAY as mb,CHUNGNHAN as cn
where mb.Hieu = 'Airbus A320' and mb.MaMB = cn.MaMB
intersect
select  cn.MaNV
from MAYBAY as mb,CHUNGNHAN as cn
where mb.Hieu like 'Boeing %' and mb.MaMB = cn.MaMB
--11.Cho biết các loại máy bay có thể thực hiện được chuyến bat VN280
select MB.Hieu
from MAYBAY as mb,CHUYENBAY as cb
where mb.TamBay>cb.DoDai and cb.MaCB = 'VN280'
--12.Cho biết các chuyến bay có thể thực hiện bởi máy bay Airbus A320
select  MaCB
from CHUYENBAY as cb,MAYBAY as mb
where  mb.Hieu = 'Airbus A320' and mb.TamBay >cb.DoDai
--13.Với mỗi loại máy bay có phi công lái, cho biết mã số, loại máy bay và tổng số phi công có thể lái loại máy bay đó
select Hieu,count(cn.MaNV) as N'Tổng số phi công'
from CHUNGNHAN as cn,MAYBAY as mb,NHANVIEN as nv
where nv.MaNV = cn.MaNV and mb.MaMB =cn.MaMB
group by Hieu
--14.Giả sử một hành khách muốn đi thẳng từ ga A đến ga B rồi quay trở về ga A. Cho biết các đường bay nào có thể đáp ứng yêu cầu này.
select MaCB,GaDi,GaDen,DoDai,ChiPhi
from CHUYENBAY
where GaDi = 'SGN' AND GaDen ='DAD'
UNION
select MaCB,GaDi,GaDen,DoDai,ChiPhi
from CHUYENBAY
WHERE GaDi='DAD' AND GaDen ='SGN'
--15.Với mỗi ga có chuyến bay xuất phát từ đó, cho biết có bao nhiêu chuyến bay khởi hành từ ga đó
-- và cho biết tổng chi phí phải trả chi phi công lái các chuyến bay khởi hành từ ga đó.
select GaDi,count(MaCB) AS SL,sum(ChiPhi) as N'Tổng chi phí'
from CHUYENBAY as cb
group  by GaDi
--16.Với mỗi ga xuất phát, cho biết có bao nhiêu chuyến bay có thể khởi hành trước 12:00 
SELECT GaDi,count(MaCB) AS SL
FROM CHUYENBAY
where GioDi <'12:00'
group by GaDi
--17.Với mỗi phi công có thể lái nhiều hơn 3 loại máy bay, cho biết mã số phi công và tầm bay lớn nhất của các loại máy bay mà phi công đó có thể lái
select MaNV,Hieu,count(Hieu)
from CHUNGNHAN as cn,MAYBAY as mb
WHERE mb.MaMB = cn.MaMB 
group by Hieu,MaNV
