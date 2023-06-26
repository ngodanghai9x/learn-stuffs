
package Cau3;

import java.util.Date;

public class NhanVien extends Person {
    private float luong;

    public NhanVien() {
    }
    public NhanVien(float luong, String ten, int tuoi, Date ns) {
        super(ten, tuoi, ns);
        this.luong = luong;
    }

    public float getLuong() {
        return luong;
    }

    public void setLuong(float luong) {
        this.luong = luong;
    }
    public float tinhLg(){
        return this.getLuong()*30;
    }
    
}
