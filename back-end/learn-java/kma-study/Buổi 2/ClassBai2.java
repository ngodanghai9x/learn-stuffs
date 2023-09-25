
package run2;

import java.util.Scanner;

public class SinhVien {
    private String ten;
    private int maSV;
    private float diemLT;
    private float diemTH;
    
    public SinhVien() {
    }

    public SinhVien(String ten, int maSV, float diemLT, float diemTH) {
        this.ten = ten;
        this.maSV = maSV;
        this.diemLT = diemLT;
        this.diemTH = diemTH;
    }

    public String getTen() {
        return ten;
    }

    public void setTen(String ten) {
        this.ten = ten;
    }

    public int getMaSV() {
        return maSV;
    }

    public void setMaSV(int maSV) {
        this.maSV = maSV;
    }

    public float getDiemLT() {
        return diemLT;
    }

    public void setDiemLT(float diemLT) {
        this.diemLT = diemLT;
    }

    public float getDiemTH() {
        return diemTH;
    }

    public void setDiemTH(float diemTH) {
        this.diemTH = diemTH;
    }

    public float getdiemTB(){
        return ((diemLT+diemTH)/2);
    }
    
    public void nhap(){
        Scanner sc = new Scanner(System.in);
        System.out.println("Nhap thong tin cho sinh vien ( Ten, MaSV, DiemLT, DiemTH ):");
//        sv.setTen(sc.nextLine());
//        sv.setMaSV(sc.nextInt());
//        sv.setDiemLT(sc.nextFloat());
//        sv.setDiemTH(sc.nextFloat());
        System.out.print("Ten: ");
        this.ten = sc.nextLine();
        System.out.print("Ma sv: ");
        this.maSV = sc.nextInt();
        System.out.print("Diem lt: ");
        this.diemLT = sc.nextFloat();
        System.out.print("Diem Th: ");
        this.diemTH = sc.nextFloat();
    }
    
    public void in(){
        System.out.print(""+ this.maSV);
        System.out.print("\t"+this.ten);
        System.out.print(" \t \t"+this.diemLT);
        System.out.print("\t"+ this.diemLT );
    }
}