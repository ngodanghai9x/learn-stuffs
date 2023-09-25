/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package javaapplication7;

/**
 *
 * @author chimh
 */
public class NhanSu extends NhanVien {
    private float hsLuong;
    private int luongCoBan;
 
    public NhanSu() {
        super();
    }
 
    public NhanSu(float hsLuong,int luongCoBan) {
        super();
        this.hsLuong = hsLuong;
        this.luongCoBan=luongCoBan;
    }

    public float getHsLuong() {
        return hsLuong;
    }

    public void setHsLuong(int hsLuong) {
        this.hsLuong = hsLuong;
    }

    public int getLuongCoBan() {
        return luongCoBan;
    }

    public void setLuongCoBan(int luongCoBan) {
        this.luongCoBan = luongCoBan;
    }          
    @Override
    public void nhap() {
        super.nhap();
        System.out.print("Nhập He so Luong: ");
        hsLuong = scanner.nextInt();
        System.out.print("Nhap Luong Co Ban:");
        luongCoBan=scanner.nextInt();
    }
     
    @Override
    public float tinhLuong() {
        this.luong = this.luongCoBan * this.hsLuong;
        return this.luong;
    }
 
    @Override
    public String toString() {
        return super.toString() + "\n, Hệ số lương : " + this.hsLuong + ", lương cơ bản: " + this.luongCoBan + 
            ", lương: " + this.luong ;
    }
}