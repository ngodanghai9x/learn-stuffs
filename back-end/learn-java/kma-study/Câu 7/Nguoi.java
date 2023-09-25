

package bai7;
import java.util.Scanner;

public class Nguoi {
    public String hoTen;
    public int tuoi;
    public int namSinh;
    public String queQuan;

    public Nguoi() {
    }

    public Nguoi(String hoTen, int tuoi, int namSinh, String queQuan) {
        this.hoTen = hoTen;
        this.tuoi = tuoi;
        this.namSinh = namSinh;
        this.queQuan = queQuan;
    }

    public void setHoTen(String hoTen) {
        this.hoTen = hoTen;
    }

    public void setTuoi(int tuoi) {
        this.tuoi = tuoi;
    }

    public void setNamSinh(int namSinh) {
        this.namSinh = namSinh;
    }

    public void setQueQuan(String queQuan) {
        this.queQuan = queQuan;
    }

    public String getHoTen() {
        return hoTen;
    }

    public int getTuoi() {
        return tuoi;
    }

    public int getNamSinh() {
        return namSinh;
    }

    public String getQueQuan() {
        return queQuan;
    }
    
    
}
