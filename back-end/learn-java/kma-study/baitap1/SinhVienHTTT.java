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
public class SinhVienHTTT extends SinhVien {
    String hocPhi;
    Scanner sr= new Scanner(System.in);

    public SinhVienHTTT() {
    }

    public SinhVienHTTT(String hocPhi, String maSv, String hoTen, String gioiTinh, String ngaySinh, String diemTb) {
        super(maSv, hoTen, gioiTinh, ngaySinh, diemTb);
        this.hocPhi = hocPhi;
    }

    public String getHocPhi() {
        return hocPhi;
    }

    public void setHocPhi(String hocPhi) {
        this.hocPhi = hocPhi;
    }
    @Override
    public void nhap(){
        super.nhap();
        System.out.println("Nhap hoc phi sinh vien :");
        this.hocPhi=sr.nextLine();
    }
    @Override
    public void In(){
        super.In();
        System.out.println("Hoc Phi Cua Sinh Vien : " + this.hocPhi);
    }
    
}
