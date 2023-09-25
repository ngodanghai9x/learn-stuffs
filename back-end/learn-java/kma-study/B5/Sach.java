package test;

import java.util.Scanner;

public class Sach extends Tailieu {
    Scanner sc=new Scanner(System.in);
    private String TenTacGia;
    private int SoTrang;

    public String getTenTacGia() {
        return TenTacGia;
    }

    public void setTenTacGia(String tenTacGia) {
        TenTacGia = tenTacGia;
    }

    public int getSoTrang() {
        return SoTrang;
    }

    public void setSoTrang(int soTrang) {
        SoTrang = soTrang;
    }
    public void Nhap(){
        super.Nhap();
        System.out.print("\t\t\tTên tác giả:");
        setTenTacGia(sc.nextLine());
        System.out.print("\t\t\tSố trang:");
        setSoTrang(sc.nextInt());
    }
    public void Hienthi(){
        super.Hienthi();
        System.out.println("\t\t\tTên tác giả:"+getTenTacGia());
        System.out.println("\t\t\tSố trang:"+getSoTrang());
    }
}
