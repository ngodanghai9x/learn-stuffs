
package Cau3;

import java.util.Date;

public class Person {
    private String ten;
    private int tuoi;
    private Date ns;
    public Person() {}
    public Person(String ten, int tuoi, Date ns) {
        this.ten = ten;
        this.tuoi = tuoi;
        this.ns = ns;
    }

    public String getTen() {
        return ten;
    }

    public void setTen(String ten) {
        this.ten = ten;
    }

    public int getTuoi() {
        return tuoi;
    }

    public void setTuoi(int tuoi) {
        this.tuoi = tuoi;
    }

    public Date getNs() {
        return ns;
    }

    public void setNs(Date ns) {
        this.ns = ns;
    }
    
}
