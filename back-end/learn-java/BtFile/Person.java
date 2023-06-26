
package BtFile;

import java.util.Scanner;

public class Person {
    private String hoTen;
    private String ngaySinh;
    private String diaChi;
    private String gioiTinh;
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
    public void nhap() {
        System.out.println("Nhap lan luot hoTen,gioiTinh,ngaySinh,diaChi: ");
        Scanner sc=new Scanner(System.in);
        this.setHoTen(sc.nextLine());
        this.setGioiTinh(sc.nextLine());
        this.setNgaySinh(sc.nextLine());
        this.setDiaChi(sc.nextLine());

    }
    public void hienThi() {
        System.out.println("Nhan vien "+this.getHoTen()+" "+this.getGioiTinh()+" "+this.getNgaySinh()+" "+this.getDiaChi());
    }
   
    
}
