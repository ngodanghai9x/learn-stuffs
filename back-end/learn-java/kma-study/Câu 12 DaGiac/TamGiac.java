/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package baitap;

import java.util.Scanner;

/**
 *
 * @author chimh
 */
public class TamGiac extends DaGiac{
    TamGiac()
    {
        this.a=new int[3]; 
        this.soCanh=3;
    }  
    
    @Override
    public int  tinhChuVi()
    {
        int cv=0;
        for(int i=0;i<3;i++)
             cv=+a[i];
            
        return cv;
    }
    public boolean ktHopLe()
    {
        int A=this.a[0];
        int B=this.a[1];
        int C=this.a[2];
        if(A+B>C && A+C>B && B+C>A)
            return true;
        return false;
    }
    public double tinhDT()
    {
        int A=this.a[0];
        int B=this.a[1];
        int C=this.a[2];
        int P=(A+B+C)/2;
        return (double) Math.sqrt(P*(P-A)*(P-B)*(P-C));
    }
    public void nhap()
    {
        Scanner sc=new Scanner(System.in);
        for(int i=0;i<3;i++)
        {
            System.out.print("Nhap canh thu "+(i+1)+": ");
            this.a[i]=sc.nextInt();
        }
    }
}
    
