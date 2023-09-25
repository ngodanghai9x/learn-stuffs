/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package baitap1;

/**
 *
 * @author chimh
 */
public class SinhVienMatMa extends SinhVien {
    String luong;
    String donVi;

    public SinhVienMatMa() {
    }

    public SinhVienMatMa(String donVi, String luong, String maSv, String hoTen, String gioiTinh, String ngaySinh, String diemTb) {
        super(maSv, hoTen, gioiTinh, ngaySinh, diemTb);
        this.donVi = donVi;
        this.luong = luong;
    }

    public String getDonVi() {
        return donVi;
    }

    public void setDonVi(String donVi) {
        this.donVi = donVi;
    }

    public String getLuong() {
        return luong;
    }

    public void setLuong(String luong) {
        this.luong = luong;
    }
    @Override
    public void nhap(){
        super.nhap();
        System.out.println("Nhap Don Vi:"); 
        this.donVi=sr.nextLine();
        System.out.println("Nhap luong : ");
        this.luong=sr.nextLine();
    }
    @Override
    public void In(){
        super.In();
        System.out.println("Don Vi :" + this.donVi + " Luong :" + this.luong);
    }
}
