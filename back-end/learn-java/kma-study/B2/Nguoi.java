
package bai2;

import java.util.Scanner;

public class Nguoi {
    protected String ten;
    protected int namSinh;
    public void nhap()
    {
        Scanner sc = new Scanner(System.in);
        System.out.println("HoTen:");
        ten=sc.nextLine();
        System.out.println("NamSinh:");
        namSinh=sc.nextInt();
    }
    public void xuat()
    {
        System.out.print("\t"+ten+"\t"+namSinh);
    }
}
