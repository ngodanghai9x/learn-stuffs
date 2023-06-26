/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Phuc;

/**
 *
 * @author Duy Phuc
 */
public class NhanVien {
    private String maNv;
    private String hoTen;
    private int tuoi;
    private int luong;

    public NhanVien() {
    }

    public NhanVien(String maNv, String hoTen, int tuoi, int luong) {
        this.maNv = maNv;
        this.hoTen = hoTen;
        this.tuoi = tuoi;
        this.luong = luong;
    }

    public String getMaNv() {
        return maNv;
    }

    public void setMaNv(String maNv) {
        this.maNv = maNv;
    }

    public String getHoTen() {
        return hoTen;
    }

    public void setHoTen(String hoTen) {
        this.hoTen = hoTen;
    }

    public int getTuoi() {
        return tuoi;
    }

    public void setTuoi(int tuoi) {
        this.tuoi = tuoi;
    }

    public int getLuong() {
        return luong;
    }

    public void setLuong(int luong) {
        this.luong = luong;
    }

    @Override
    public String toString() {
        return this.maNv+"$"+this.hoTen+"$"+this.tuoi+"$"+this.luong;
    }
}
