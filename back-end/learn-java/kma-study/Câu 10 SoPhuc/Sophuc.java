/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package sophuc;

import java.util.Scanner;

/**
 *
 * @author chimh
 */
public class Sophuc {
    private double pt,pa;

    public Sophuc() {
    }

    public Sophuc(double pt, double pa) {
        this.pt = pt;
        this.pa = pa;
    }
    
    public void nhap(){
        Scanner sr=new Scanner(System.in);
        System.out.println("Nhap phan thuc cua so phuc :");
        this.pt=sr.nextFloat();
        System.out.println("Nhap phan ao cua so phuc :");
        this.pa=sr.nextFloat();
    }

    public void in(){
        System.out.println("So phuc :" + this.pt + "+" + pa + "i");
    }
    
    public Sophuc congSophuc(Sophuc sp){
        Sophuc tong = new Sophuc();
        tong.pt=pt + sp.pt;
        tong.pa=pa + sp.pa;
        return tong;
    }
    
    public Sophuc nhanSophuc(Sophuc sp){
        Sophuc tong = new Sophuc();
        tong.pt= pt*sp.pt - pa*sp.pa;
        tong.pa=pt*sp.pa + pa*sp.pt;
        return tong;
    }
    
    public static void main(String[] args) {
       Sophuc A =new Sophuc();
       Sophuc B = new Sophuc();
        System.out.println("Nhap so phuc A :");
        A.nhap();
        System.out.println("Nhap so phuc B : ");
        B.nhap();
        Sophuc C = A.congSophuc(B);
        Sophuc C1 = B.nhanSophuc(B);
        System.out.println("Tong 2 so phuc vua nhap la :");
        C.in();
        System.out.println("Tich 2 so phuc vua nhap la : ");
        C1.in();
    }
    
}
