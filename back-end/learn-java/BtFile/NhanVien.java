
package BtFile;

public class NhanVien extends Person {
    private String phongBan;
    private int heSoLg;
    private int thamNien;
    private int lgCoBan;
    public NhanVien() {
    }
    public NhanVien(String phongBan, int heSoLg, int thamNien, int lgCoBan) {
        this.phongBan = phongBan;
        this.heSoLg = heSoLg;
        this.thamNien = thamNien;
        this.lgCoBan = lgCoBan;
    }
    public NhanVien(String phongBan, int heSoLg, int thamNien, int lgCoBan, String hoTen,
            String ngaySinh, String diaChi, String gioiTinh) {
        super(hoTen, ngaySinh, diaChi, gioiTinh);
        this.phongBan = phongBan;
        this.heSoLg = heSoLg;
        this.thamNien = thamNien;
        this.lgCoBan = lgCoBan;
    }

    public String getPhongBan() {
        return phongBan;
    }

    public void setPhongBan(String phongBan) {
        this.phongBan = phongBan;
    }

    public int getHeSoLg() {
        return heSoLg;
    }

    public void setHeSoLg(int heSoLg) {
        this.heSoLg = heSoLg;
    }

    public int getThamNien() {
        return thamNien;
    }

    public void setThamNien(int thamNien) {
        this.thamNien = thamNien;
    }

    public int getLgCoBan() {
        return lgCoBan;
    }

    public void setLgCoBan(int lgCoBan) {
        this.lgCoBan = lgCoBan;
    }
    public int getLgThucTe() {
        return lgCoBan * heSoLg*(1+thamNien/100);
    }
    @Override
    public void hienThi() {
        super.hienThi();
        System.out.println(" "+this.getPhongBan()+" "+this.getHeSoLg()+" "+this.getThamNien()
                +" "+this.getLgCoBan()+" "+this.getLgThucTe());
    }
    
}
