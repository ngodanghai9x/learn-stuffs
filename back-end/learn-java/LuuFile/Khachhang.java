
package LuuFile;

import java.io.Serializable;

public class Khachhang implements Serializable {
    private String ten;
    private String  ma;
	
	public Khachhang(){}
	
    public Khachhang(String ten, String ma) {
        this.ten = ten;
        this.ma = ma;
    }

    public String getTen() {
        return ten;
    }

    public void setTen(String ten) {
        this.ten = ten;
    }

    public String getMa() {
        return ma;
    }

    public void setMa(String ma) {
        this.ma = ma;
    }
    public String toString()
    {
        return this.getMa()+" - "+this.getTen();
    }
}
