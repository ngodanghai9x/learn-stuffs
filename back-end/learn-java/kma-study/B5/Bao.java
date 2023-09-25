package test;

import java.util.Scanner;

public class Bao extends Tailieu {
    Scanner sc=new Scanner(System.in);
    private int NgayPhatHanh;

    public int getNgayPhatHanh() {
        return NgayPhatHanh;
    }

    public void setNgayPhatHanh(int ngayPhatHanh) {
        NgayPhatHanh = ngayPhatHanh;
    }
    public void Nhap(){
        super.Nhap();
        System.out.print("\t\t\tNgày phát hành:");
        setNgayPhatHanh(sc.nextInt());

    }
    public void Hienthi(){
        super.Hienthi();
        System.out.println("\t\t\tNgày phát hành:"+getNgayPhatHanh());

    }
}
