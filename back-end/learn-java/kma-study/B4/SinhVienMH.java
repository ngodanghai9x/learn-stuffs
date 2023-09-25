
package Test;

import java.util.Scanner;

public class SinhVienMH extends MonHoc{
    private String ten;
    private String lop;
    private String maSV;
    public SinhVienMH() {
        super();
    }
    public SinhVienMH(String tenMon, float diemCC, float diemKT, float diemThi, String ten, String lop, String maSV) {
        super(tenMon, diemCC, diemKT, diemThi); // Có đối số thì gọi super(tenMon, diemCC, ... Danh sachs đối số truyền vào)
        this.ten = ten;
        this.lop = lop;
        this.maSV = maSV;
    }

    public String getTen() {
        return ten;
    }

    public void setTen(String ten) {
        this.ten = ten;
    }

    public String getLop() {
        return lop;
    }

    public void setLop(String lop) {
        this.lop = lop;
    }

    public String getMaSV() {
        return maSV;
    }

    public void setMaSV(String maSV) {
        this.maSV = maSV;
    }
    public float TinhDiemHP(){
        return (float) ((this.diemCC*0.3 +this.diemKT*0.7)*0.3 +this.diemThi);
    }
    
    @Override
    public void Nhap(){
        Scanner sc=new Scanner(System.in);
        System.out.println("Nhap ten SV: ");
        this.ten = sc.nextLine();
        System.out.println("Nhap lop SV: ");
        this.lop = sc.nextLine();
        System.out.println("Nhap ma SV: ");
        this.maSV = sc.nextLine();
        super.Nhap();
    }
    
    public void Xuat(){
        System.out.println("\n"+this.ten+" Lop "+ this.lop+" Co Ma SV La "+ this.maSV);
        System.out.println("Hoc Mon: "+this.tenMon+" Diem CC = "+this.diemCC+" Diem Ktra = "+this.diemKT+" Diem Thi = "+this.diemThi);
    }
    
    public void XuatCamThi(){
        SinhVienMH sv = new SinhVienMH();
        if (this.diemCC < 5 || this.diemKT ==0){
            System.out.println("\n Danh Sach SV bi cam thi: ");
            System.out.println("\n"+this.ten+" Lop "+ this.lop+" Co Ma SV La "+ this.maSV);
        }
    }
    
}
