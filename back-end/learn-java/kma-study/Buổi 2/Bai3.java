/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package javaapplication4;

import java.util.Scanner;
public class HinhTamGiac {
    private int ma;
    private int mb;
    private int mc;
    //Constructor
    public HinhTamGiac(){
        ma=mb=mc=0;
    }
    public HinhTamGiac(int a,int b,int c){
        if(a<0){
            System.out.println("Canh tam giac phai lon hon 0");
            ma=0;
            return;
        }
        if(b<0){
            System.out.println("Canh tam giac phai lon hon 0");
            mb=0;
            return;
        }
        if(c<0){
            System.out.println("Canh tam giac phai lon hon 0");
            mc=0;
            return;
        }
        if(a+b<=c||a+c<=b||b+c<=a) {
            System.out.println("Khong phai tam giac");
                    
            ma=mb=mc=0;
            return;
        }
        ma=a;
        mb=b;
        mc=c;
    }
    //Get methods
    public int getCanhA(){
        return ma;
    }
    public int getCanhB(){
        return mb;
    }
    public int getCanhC(){
        return mc;
    }
    //set methods
    public void setCanhA(int a){
        ma=a;
    }
    public void setCanhB(int b){
        mb=b;
    }
    public void setCanhC(int c){
        mc=c;
    }
    public boolean laTamGiac(){
        return(ma+mb>mc&&ma+mc>mb&&mb+mc>ma);
    }
    public boolean laTamGiac(int a,int b,int c){
        return(a+b>c&&a+c>b&&b+c>a);
    }
    
    public int getChuvi(){
        return ma+mb+mc;
    }
    public double getDienTich(){
            double p=(double)(ma+mb+mc)/2;
            return Math.sqrt(p*(p-ma)*(p-mb)*(p-mc));                   
    }
    public String ktra() {
        if ( ma==mb && ma==mc && mb==mc) {
            return "Tam Giac Deu";
        }
        else if ( ma*ma+mb*mb==mc*mc || ma*ma==mb*mb+mc*mc || ma*ma+mc*mc==mb*mb) {
            return "Tam Giac Vuong";
        }
        else if ((ma==mb && ma!=mc) || (ma==mc && ma!=mb) || (mc==mb && mc!=ma)){
            return "Tam Giac Can";
        }
        else if ((ma==mb && ma!=mc && ma*ma+mb*mb==mc*mc ) || (ma==mc && ma!=mb && ma*ma+mc*mc==mb*mb) || (mc==mb && mc!=ma && ma*ma==mb*mb+mc*mc)){
            return "Tam Giac vuong Can";
        }
        else
            return "Tam Giac Thuong";
    }
    public static void main(String[] args) {
        System.out.println("nhap ba canh hinh tam giac:");
        Scanner input=new Scanner(System.in);
        int ma=input.nextInt();
        int mb=input.nextInt();
        int mc=input.nextInt();
        HinhTamGiac tamgiac=new HinhTamGiac(ma,mb,mc);
        if(tamgiac.laTamGiac()){
            System.out.println(""+ tamgiac.ktra());
            System.out.println("Chu vi: "+tamgiac.getChuvi());
            System.out.println("Dien tich: "+tamgiac.getDienTich());
        }         
    }   
}