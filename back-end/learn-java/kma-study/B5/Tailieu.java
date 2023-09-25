package test;

import java.util.Scanner;

public class Tailieu {
    Scanner sc=new Scanner(System.in);
    private String MaTaiLieu;
    private String TenNhaXuatBan;
    private int SoBanPhatHanh;

    public String getMaTaiLieu() {
        return MaTaiLieu;
    }

    public void setMaTaiLieu(String maTaiLieu) {
        MaTaiLieu = maTaiLieu;
    }

    public String getTenNhaXuatBan() {
        return TenNhaXuatBan;
    }

    public void setTenNhaXuatBan(String tenNhaXuatBan) {
        TenNhaXuatBan = tenNhaXuatBan;
    }

    public int getSoBanPhatHanh() {
        return SoBanPhatHanh;
    }

    public void setSoBanPhatHanh(int soBanPhatHanh) {
        SoBanPhatHanh = soBanPhatHanh;
    }
    public void Nhap(){
        System.out.print("\t\t\tMã tài liệu:");
        setMaTaiLieu(sc.nextLine());
        System.out.print("\t\t\tTên nhà xuất bản:");
        setTenNhaXuatBan(sc.nextLine());
        System.out.print("\t\t\tSố bản phát hành:");
        setSoBanPhatHanh(sc.nextInt());
    }
    public void Hienthi(){
        System.out.println("\t\t\tMã tài liệu:"+getMaTaiLieu());
        System.out.println("\t\t\tTên nhà xuất bản:"+getTenNhaXuatBan());
        System.out.println("\t\t\tSố bản phát hành:"+getSoBanPhatHanh());
    }
}


