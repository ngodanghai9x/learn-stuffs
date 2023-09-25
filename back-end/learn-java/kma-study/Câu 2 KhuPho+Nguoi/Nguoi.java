
package Th2Cau2;

import java.util.Scanner;

public class Nguoi {
    protected String hoTen;
    protected int tuoi,namSinh;
    protected String nghe;
    public Nguoi() {
    }
    public Nguoi(String hoTen, int tuoi, int namSinh, String nghe) {
        this.hoTen = hoTen;
        this.tuoi = tuoi;
        this.namSinh = namSinh;
        this.nghe = nghe;
    }
    public String getHoTen() {
        return hoTen;
    }
    public void setHoTen(String hoTen) {
        this.hoTen = hoTen;
    }
    public int getTuoi() {
        return tuoi;
    }
    public void setTuoi(int tuoi) {
        this.tuoi = tuoi;
    }
    public int getNamSinh() {
        return namSinh;
    }
    public void setNamSinh(int namSinh) {
        this.namSinh = namSinh;
    }
    public String getNghe() {
        return nghe;
    }
    public void setNghe(String nghe) {
        this.nghe = nghe;
    }
    public void nhapNguoi() {
        System.out.println("Nhập LẦN LƯỢT hoTen, tuoi, namSinh,nghe nghiep: ");
        Scanner sc = new Scanner(System.in);
        this.hoTen = sc.nextLine();
        this.tuoi = sc.nextInt();
        this.namSinh = sc.nextInt();
        sc.nextLine();
        this.nghe = sc.nextLine();
    }
    @Override
    public String toString() {
        return this.hoTen+" "+this.tuoi+" tuoi,sinh nam "+this.namSinh+" lam nghe "+this.nghe;
    }
    public void xuatNguoi() {
        System.out.println(this.hoTen+" "+this.tuoi+" tuoi,sinh nam "+this.namSinh+" lam nghe "+this.nghe);
    }
 
}
