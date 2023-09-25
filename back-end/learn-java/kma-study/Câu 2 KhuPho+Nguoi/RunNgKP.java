
package Th2Cau2;

import java.util.Scanner;

public class RunNgKP {
    static KhuPho[] ds;
    static int n;
    
    public static void nhap() {
        for(int i=0;i<n;i++) {
            ds[i]=new KhuPho();
            ds[i].nhapKP();
        }
    }
    public static void xuat() {
        for(int i=0;i<n;i++) {
            ds[i].xuatKP();
        }
    }

    public static void main(String[] args) {
        System.out.println("Nhap so luong ho dan: ");
        n= new Scanner(System.in).nextInt();
        ds = new KhuPho[n];
        nhap();
        xuat();
        
        
    }
}
