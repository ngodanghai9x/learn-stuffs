
package Test;

import java.util.Scanner;

public class MonHoc {
    protected String tenMon;
    protected float diemCC;
    protected float diemKT;
    protected float diemThi;
    public MonHoc() { // constructor khooong doois so thì gọi super()
    }
    public MonHoc(String tenMon, float diemCC, float diemKT, float diemThi) { 
        this.tenMon = tenMon;
        this.diemCC = diemCC;
        this.diemKT = diemKT;
        this.diemThi = diemThi;
    }

    public String getTenMon() {
        return tenMon;
    }

    public void setTenMon(String tenMon) {
        this.tenMon = tenMon;
    }

    public float getDiemCC() {
        return diemCC;
    }

    public void setDiemCC(float diemCC) {
        this.diemCC = diemCC;
    }

    public float getDiemKT() {
        return diemKT;
    }

    public void setDiemKT(float diemKT) {
        this.diemKT = diemKT;
    }

    public float getDiemThi() {
        return diemThi;
    }

    public void setDiemThi(float diemThi) {
        this.diemThi = diemThi;
    }
    public void Nhap(){
        Scanner sc=new Scanner(System.in);
        System.out.println("Nhap mon hoc SV: ");
        this.tenMon = sc.nextLine();// super.tenMon cung dc
        System.out.println("Nhap diem chuyen can SV: ");
        this.diemCC = sc.nextFloat();
        System.out.println("Nhap diem ktra SV: ");
        this.diemKT = sc.nextFloat();
        System.out.println("Nhap diem thi SV: ");
        this.diemThi = sc.nextFloat();
    }
    
    
    
}
