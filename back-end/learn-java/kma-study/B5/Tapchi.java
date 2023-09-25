package test;

import java.util.Scanner;

public class Tapchi extends Tailieu{
    Scanner sc=new Scanner(System.in);
    private int SoPhatHanh;
    private int ThangPhatHanh;

    public int getSoPhatHanh() {
        return SoPhatHanh;
    }

    public void setSoPhatHanh(int soPhatHanh) {
        SoPhatHanh = soPhatHanh;
    }

    public int getThangPhatHanh() {
        return ThangPhatHanh;
    }

    public void setThangPhatHanh(int thangPhatHanh) {
        ThangPhatHanh = thangPhatHanh;
    }
    public void Nhap(){
        super.Nhap();
        System.out.print("\t\t\tSố phát hành:");
        setSoPhatHanh(sc.nextInt());
        System.out.print("\t\t\tTháng phát hành:");
        setThangPhatHanh(sc.nextInt());
    }
    public void Hienthi(){
        super.Hienthi();
        System.out.println("\t\t\tTên tác giả:"+getSoPhatHanh());
        System.out.println("\t\t\tSố trang:"+getThangPhatHanh());
    }
}
