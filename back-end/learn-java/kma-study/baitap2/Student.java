/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package baitap2;

/**
 *
 * @author chimh
 */
public class Student extends Person{
    String maSv,email,diem;

    public Student() {
    }

    public Student(String hoTen, String ngaySinh, String diaChi, String gioiTinh,String maSv, String email, String diem) {
        super(hoTen, ngaySinh, diaChi, gioiTinh);
        this.maSv = maSv;
        this.email = email;
        this.diem = diem;
    }

    public String getMaSv() {
        return maSv;
    }

    public void setMaSv(String maSv) {
        this.maSv = maSv;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDiem() {
        return diem;
    }

    public void setDiem(String diem) {
        this.diem = diem;
    }
    
    @Override
    public void Nhap(){
        super.Nhap();
        System.out.println("Nhap Ma Sinh Vien :");
        this.maSv=sr.nextLine();
        System.out.println("Nhap email :");
        this.email=sr.nextLine();
        System.out.println("Nhap diem :");
        this.diem=sr.nextLine();
        
    }
    @Override
    public void Xuat(){
        super.Xuat();
        System.out.println(" Ma Sinh Vien : " + this.maSv + " Email :" + this.email
        + " Diem : " +this.diem);
    }
    
    
    
}
