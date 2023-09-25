
package javaapplication6;

import java.util.Scanner;


public class Nguoi {
    protected String hoT;
    protected int namS;
    public void nhap()
    {
        Scanner sc = new Scanner(System.in);
        System.out.println("Nhap ho va ten:");
        hoT = sc.nextLine();
        System.out.println("Nhap nam sinh :");
        namS = sc.nextInt();
    }
    public void xuat()
    {
        System.out.print("\t Ho Va Ten La:" + hoT + "\t Nam Sinh: " + namS);
    }
}
