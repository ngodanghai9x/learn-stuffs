/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package baitap2;

import java.util.Scanner;

/**
 *
 * @author chimh
 */
public class Person {
    String hoTen,ngaySinh,diaChi,gioiTinh;
    Scanner sr = new Scanner(System.in);

    public Person() {
    }

    public Person(String hoTen, String ngaySinh, String diaChi, String gioiTinh) {
        this.hoTen = hoTen;
        this.ngaySinh = ngaySinh;
        this.diaChi = diaChi;
        this.gioiTinh = gioiTinh;
    }

    public String getHoTen() {
        return hoTen;
    }

    public void setHoTen(String hoTen) {
        this.hoTen = hoTen;
    }

    public String getNgaySinh() {
        return ngaySinh;
    }

    public void setNgaySinh(String ngaySinh) {
        this.ngaySinh = ngaySinh;
    }

    public String getDiaChi() {
        return diaChi;
    }

    public void setDiaChi(String diaChi) {
        this.diaChi = diaChi;
    }

    public String getGioiTinh() {
        return gioiTinh;
    }

    public void setGioiTinh(String gioiTinh) {
        this.gioiTinh = gioiTinh;
    }
    public void Nhap(){
        System.out.println("Nhap Ho va Ten :");
        this.hoTen=sr.nextLine();
        System.out.println("Nhap Ngay Sinh :");
        this.ngaySinh=sr.nextLine();
        System.out.println("Nhap Dia chi :");
        this.diaChi=sr.nextLine();
        System.out.println("Nhap Gioi Tinh :");
        this.gioiTinh=sr.nextLine();
        
    }
    public void Xuat(){
        System.out.println(" Ho Va Ten : " + this.hoTen + " Ngay Sinh : " + this.ngaySinh
        + " Dia Chi : " + this.diaChi + " Gioi Tinh : " + this.gioiTinh);
    }
    
}
