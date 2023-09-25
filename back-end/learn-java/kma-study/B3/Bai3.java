/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package javaapplication7;

import java.util.Scanner;
 
public class Bai3 {
 
    public static void main(String[] args) {        
        Scanner scanner = new Scanner(System.in);
        System.out.print("Nhập số nhân viên trong công ty: ");
        int soNhanVien = scanner.nextInt();
        NhanVien[] nhanVien = new NhanVien[soNhanVien];
         
        System.out.println("Nhập thông tin cho nhân viên");
        for (int i = 0; i < soNhanVien; i++) {
            System.out.println("Nhập thông tin nhân viên thứ " + (i + 1) + ":");  
            nhanVien[i]=new NhanSu();
            nhanVien[i].nhap();
            nhanVien[i].tinhLuong();
        }
         
        System.out.println("Thông tin của các nhân viên trong công ty: ");
        for (int i = 0; i < soNhanVien; i++) {
            System.out.println(nhanVien[i].toString());
        }
         
       
       NhanVien temp =new NhanVien();
        for (int i = 0 ; i < soNhanVien - 1; i++) 
            for (int j = i + 1; j < soNhanVien; j++) {
                if (nhanVien[i].tinhLuong() < nhanVien[j].tinhLuong()) {
                    temp = nhanVien[j];
                    nhanVien[j]= nhanVien[i];
                    nhanVien[i] = temp;
                }
    } 
        System.out.println("____________________________________________");
      for (int i = 0; i < soNhanVien; i++) {
            System.out.println(nhanVien[i].toString());
        }    
    }
}
    

    
