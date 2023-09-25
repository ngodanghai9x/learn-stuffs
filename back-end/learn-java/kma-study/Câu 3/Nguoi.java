
package bai3;

public class Nguoi {
    public String hoTen;
    public int tuoi;
    public int ngaySinh;
    public int soChungMinhThuNhanDan;

    public Nguoi() {
    }

    public Nguoi(String hoTen, int tuoi, int ngaySinh, int soChungMinhThuNhanDan) {
        this.hoTen = hoTen;
        this.tuoi = tuoi;
        this.ngaySinh = ngaySinh;
        this.soChungMinhThuNhanDan = soChungMinhThuNhanDan;
    }

    public void setHoTen(String hoTen) {
        this.hoTen = hoTen;
    }

    public void setTuoi(int tuoi) {
        this.tuoi = tuoi;
    }

    public void setNgaySinh(int ngaySinh) {
        this.ngaySinh = ngaySinh;
    }

    public void setSoChungMinhThuNhanDan(int soChungMinhThuNhanDan) {
        this.soChungMinhThuNhanDan = soChungMinhThuNhanDan;
    }

    public String getHoTen() {
        return hoTen;
    }

    public int getTuoi() {
        return tuoi;
    }

    public int getNgaySinh() {
        return ngaySinh;
    }

    public int getSoChungMinhThuNhanDan() {
        return soChungMinhThuNhanDan;
    }
    
    
}
