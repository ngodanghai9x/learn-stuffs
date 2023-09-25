/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package baitap;

/**
 *
 * @author chimh
 */
public class DaGiac {
     protected int soCanh;
    protected int a[];
  
    public DaGiac()
    {
      
    }
    public DaGiac(int soCanh,int a[])
    {
        this.soCanh=soCanh;
        this.a=a;
    }
    public int tinhChuVi()
    {
        int cv=0;
        for(int i=0;i<this.soCanh;i++)
            cv=cv+a[i];
        return cv;
    }
    public void inCanh()
    {
        for(int i=0;i<this.soCanh;i++)
        {
            System.out.println("Canh thu "+(i+1)+" : "+this.a[i]);
        }
    }
    
}
