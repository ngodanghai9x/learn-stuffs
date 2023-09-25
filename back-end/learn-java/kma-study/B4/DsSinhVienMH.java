
package Test;

//import static Test.Run2.sl;
import java.util.Scanner;

public class DsSinhVienMH {
    static private SinhVienMH[] ds;
    static int sl;
    
    public  static void nhapSL(){
        System.out.println("Nhap so luong SV: ");
        Scanner sc = new Scanner(System.in);
        sl = sc.nextInt();
        ds = new SinhVienMH[sl];
    }
    public static void nhapDS(){
            for (int i=0;i<sl;i++){
                ds[i] = new SinhVienMH();
                ds[i].Nhap();
            }
    }
    public static void xuatDS(){
            for (int i=0;i<sl;i++){
                ds[i].Xuat();
                ds[i].XuatCamThi();
            }
    }
    public static void main(String[] args) {
        nhapSL();
        nhapDS();
        xuatDS();
    }
}
