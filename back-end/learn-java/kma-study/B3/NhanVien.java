/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package javaapplication7;

import java.util.Scanner;
 
public class NhanVien {
    private String maNhanVien, hoTen;
    private int namSinh;
    protected float luong;
    Scanner scanner = new Scanner(System.in);
     
    public NhanVien() {
        super();
    }
 
    public NhanVien(String maNhanVien, String hoTen, int namSinh, int luong) {
        super();
        this.maNhanVien = maNhanVien;
        this.hoTen = hoTen;
        this.namSinh = namSinh;
        this.luong = luong;       
    }
 
    public String getMaNhanVien() {
        return maNhanVien;
    }
 
    public void setMaNhanVien(String maNhanVien) {
        this.maNhanVien = maNhanVien;
    }
 
    public String getHoTen() {
        return hoTen;
    }
 
    public void setHoTen(String hoTen) {
        this.hoTen = hoTen;
    }
    public int getNamSinh() {
        return namSinh;
    }
 
    public void setNamSinh(int namSinh) {
        this.namSinh = namSinh;
    }
 
    public float getLuong() {
        return luong;
    }
 
    public void setLuong(int luong) {
        this.luong = luong;
    }
 
     
    public void nhap() {
        System.out.print("Nhập mã nhân viên: ");
        maNhanVien = scanner.nextLine();
        System.out.print("Nhập họ tên nhân viên: ");
        hoTen = scanner.nextLine();
        System.out.print("Nhập năm sinh: ");
        namSinh = scanner.nextInt();   
    }
     
    public float tinhLuong() {
        return 0;
    }
     
    @Override
    public String toString() {
        return "Mã nhân viên: " + this.maNhanVien + ", họ tên nhân viên: " + this.hoTen  + 
            ", Năm Sinh: " + this.namSinh ;
    }
}