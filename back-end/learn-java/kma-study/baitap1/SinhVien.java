/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package baitap1;

import java.util.Scanner;

/**
 *
 * @author chimh
 */
public class SinhVien {
    String maSv,hoTen,gioiTinh;
    String ngaySinh,diemTb;
    Scanner sr = new Scanner(System.in);

    public SinhVien() {
    }

    public SinhVien(String maSv, String hoTen, String gioiTinh, String ngaySinh, String diemTb) {
        this.maSv = maSv;
        this.hoTen = hoTen;
        this.gioiTinh = gioiTinh;
        this.ngaySinh = ngaySinh;
        this.diemTb = diemTb;
    }

    public String getMaSv() {
        return maSv;
    }

    public void setMaSv(String maSv) {
        this.maSv = maSv;
    }

    public String getHoTen() {
        return hoTen;
    }

    public void setHoTen(String hoTen) {
        this.hoTen = hoTen;
    }

    public String getGioiTinh() {
        return gioiTinh;
    }

    public void setGioiTinh(String gioiTinh) {
        this.gioiTinh = gioiTinh;
    }

    public String getNgaySinh() {
        return ngaySinh;
    }

    public void setNgaySinh(String ngaySinh) {
        this.ngaySinh = ngaySinh;
    }

    public String getDiemTb() {
        return diemTb;
    }

    public void setDiemTb(String diemTb) {
        this.diemTb = diemTb;
    }
    
    public void nhap(){
        System.out.println("Nhap ma sinh vien:");
        this.maSv=sr.nextLine();
        System.out.println("Nhap ho va ten sinh vien:");
        this.hoTen=sr.nextLine();
        System.out.println("Nhap ngay sinh sinh vien:");
        this.ngaySinh=sr.nextLine();
        System.out.println("Nhap gioi tinh sinh vien:");
        this.gioiTinh=sr.nextLine();
        System.out.println("Nhap diem trung binh cua sinh vien:");
        this.diemTb=sr.nextLine();      
    }
    public void In(){
        System.out.println("MSV :" + this.maSv + " Ho Va Ten : " + this.hoTen + " Ngay Sinh :"
        + this.ngaySinh + " Gioi Tinh :" + this.gioiTinh + " Diem :" + this.diemTb);
    }
}
