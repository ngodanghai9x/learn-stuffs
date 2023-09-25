/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package javaapplication4;


import java.io.Serializable;
import java.util.Scanner;
import java.io.*;

/**
 *
 * @author chimh
 */
public class DanhBa implements Serializable {
    private int sdt;
    private String hoTen;

    public DanhBa() {
        
    }

    public DanhBa(int sdt, String hoTen) {
        this.sdt = sdt;
        this.hoTen = hoTen;
    }

    public int getSdt() {
        return sdt;
    }

    public void setSdt(int sdt) {
        this.sdt = sdt;
    }

    public String getHoTen() {
        return hoTen;
    }

    public void setHoTen(String hoTen) {
        this.hoTen = hoTen;
    }
    public void input(){
        System.out.println("Nhap Ho va Ten :");
        Scanner sr = new Scanner(System.in);
        this.hoTen = sr.nextLine();
        System.out.println("Nhap So Dien Thoai :");
        this.sdt = sr.nextInt();
    }
    
}
