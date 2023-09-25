/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package javaapplication2;

import java.util.Scanner;

/**
 *
 * @author chimh
 */
public class HinhChuNhat {
    private double  chuVi, dienTich;
    int chieuDai;
    int chieuRong;
    Scanner scanner = new Scanner(System.in);
     
    public void nhap() {
        do {
            System.out.println("Nhap chieu dai: ");
            chieuDai = scanner.nextInt();
            System.out.println("Nhap chieu rong: ");
            chieuRong = scanner.nextInt();
        } while (chieuDai < chieuRong);
    }
     //Get methods
    public int getchieuDai(){
        return (int) chieuDai;
    }
    public int getchieuRong(){
        return (int) chieuRong;
    }
    //set methods
    public void setchieuDai(int a){
        chieuDai=a;
    }
    public void setchieuRong(int b){
        chieuRong=b;
    }
    public void hienThi(double dai, double rong) {
        System.out.println("Chieu dai va chieu rong hinh chu nhat lan luot la: "
                + chieuDai + " và " + chieuRong);
    }
     
    public double tinhChuVi(double dai, double rong) {
        chuVi = (dai + rong) * 2;
        return chuVi;
    }
     
    public double tinhDienTich(double dai, double rong) {
        dienTich = dai * rong;
        return dienTich;
    }
     
    public void hienThiChuViVaDienTich(double cv, double dt) {
        System.out.println("Chu vi hin chu nhat = " + cv);
        System.out.println("Dien tich hinh chu nhat = " + dt);
    }
}
    
