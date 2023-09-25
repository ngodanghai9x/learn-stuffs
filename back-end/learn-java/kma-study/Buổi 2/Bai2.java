
package run2;

import java.util.Scanner;

public class Run2 {
    static private SinhVien[] ds ;
    static int sl;

    public  static void nhapSL(){
        System.out.println("Nhap so luong SV: ");
        Scanner sc = new Scanner(System.in);
        sl = sc.nextInt();
        ds = new SinhVien[sl];
    }

    public static void nhapDS(){
        for (int i=0;i<sl;i++){
            ds[i] = new SinhVien();
            ds[i].nhap();
        }
    }
    
    public  static void inDS(){
        System.out.println("MaSV   Ho Ten            DiemLT  DiemTH  DiemTB ");
        for (int i=0;i<sl;i++){
            ds[i].in();
        }
    }
    public static void main(String[] args) {
        nhapSL();
        nhapDS();
        inDS();
        
        
    }
    
}