
package bai3;
import java.util.Scanner;
public class KhachSan  extends Nguoi{
    public int soNgayTro;
    public String loaiPhongTro;
    public long giaPhong;
    private  Nguoi[] nguoi;
    int n;

    public KhachSan(){
        System.out.println("So khach tro can quan ly: ");
        n = new Scanner(System.in).nextInt();
        nguoi = new Nguoi[n];
    }
    public Nguoi Nhap(){
        Nguoi b = new Nguoi();
        System.out.println("Ho ten: " );
        b.setHoTen(new Scanner(System.in).nextLine());
        System.out.println("Tuoi: ");
        b.setTuoi(new Scanner(System.in).nextInt());
        System.out.println("Ngay sinh: ");
        b.setNgaySinh(new Scanner(System.in).nextInt());
        System.out.println("So chung minh thu nhan dan: ");
        b.setSoChungMinhThuNhanDan(new Scanner(System.in).nextInt());
        return b;
        
    }
    
    public void Nhapnguoi(){
        for(int i=0; i<nguoi.length;i++){
            nguoi[i]=Nhap();
            
        }
    
}
    public void in(Nguoi b){
        System.out.println("Ho ten: "+b.getHoTen());
        System.out.println("Tuoi: "+b.getTuoi());
        System.out.println("Ngay Sinh: "+b.getNgaySinh());
        System.out.println("So chung minh thu nhan dan: "+b.getSoChungMinhThuNhanDan());
        
    }
    public void hienThi(){
        for(int i=0;i<nguoi.length;i++){
            in(nguoi[i]);
        }
    }
}
