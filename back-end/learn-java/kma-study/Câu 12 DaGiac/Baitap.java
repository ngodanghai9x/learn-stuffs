/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package baitap;

import java.util.ArrayList;
import java.util.Scanner;

/**
 *
 * @author chimh
 */
public class Baitap {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        int n;
        Scanner sr=new Scanner(System.in);
        System.out.println("Nhap so tam giac :");
        n =sr.nextInt();
         ArrayList<TamGiac> ds=new ArrayList<>();
        for(int i=0;i<n;i++)
        {
            System.out.println("Nhap tam giac thu "+(i+1)+" :");
            TamGiac tg=new TamGiac();
            tg.nhap();
            ds.add(tg);
        }
        double max=0;
        int Max=0;
        for(int i=0;i<ds.size();i++)
            if(ds.get(i).ktHopLe())
            {
               if(ds.get(i).tinhDT()>max)
               {
                    max=ds.get(i).tinhDT();
                    Max=i;
               }
           }
        System.out.println("Tam Giac Co Dien tich lon nhat la: "+max+", cac canh cua tam giac nay : ");
        ds.get(Max).inCanh();
    }
    }
    
