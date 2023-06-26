/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dopd.hvktmm.com;

import java.util.Scanner;

public class Number {
    private int giaTriA;
    private int giaTriB;

    public Number() {
    }

    public Number(int giaTriA, int giaTriB) {
        this.giaTriA = giaTriA;
        this.giaTriB = giaTriB;
    }

    public int getGiaTriA() {
        return giaTriA;
    }

    public void setGiaTriA(int giaTriA) {
        this.giaTriA = giaTriA;
    }

    public int getGiaTriB() {
        return giaTriB;
    }

    public void setGiaTriB(int giaTriB) {
        this.giaTriB = giaTriB;
    }
    public void nhap(){
        Scanner ip = new Scanner(System.in);
        System.out.println("Giá trị A:");
        giaTriA = ip.nextInt();
        System.out.println("Giá trị B");
        giaTriB = ip.nextInt();
    }
    public int cong(int a,int b){
        return a+b;
    }
    public int tru(int a,int b){
        return a-b;
    }
    public int nhan(int a,int b){
        return a*b;
    }
    public float chia(int a,int b){
        return (float)a/b;
    }
    public int UCLN(int a,int b){
        while(a!=b){
            if(a>b){
                a=a-b;
            }
            else b=b-a;  
        }
        return  a;
    }
}
