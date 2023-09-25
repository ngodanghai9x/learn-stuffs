
package bai7;
import java.util.Scanner;


public class HSHocSinh extends Nguoi {
    public int lop;
    public int khoaHoc;
    public int kiHoc;
    public HSHocSinh[] HSHS;
    int n;
    String Nguoi ;
    Nguoi hs = new Nguoi();

    
public HSHocSinh(){
    System.out.println("So Hoc Sinh: ");
    n = new Scanner(System.in).nextInt();
    HSHS = new HSHocSinh[n];
   
}
public HSHocSinh Nhap(){
    HSHocSinh a= new HSHocSinh();
    System.out.println("Ho ten: ");
    a.setHoTen(new Scanner(System.in).nextLine());
    System.out.println("Tuoi: ");
    a.setTuoi(new Scanner(System.in).nextInt());
    System.out.println("Nam Sinh: ");
    a.setNamSinh(new Scanner(System.in).nextInt());
    System.out.println("Que Quan: ");
    a.setQueQuan(new Scanner(System.in).nextLine());
    return a;
        
    
}
public void NhapHS(){
    for(int i=0;i<HSHS.length;i++){
        HSHS[i]=Nhap();
    }
}
public void in(HSHocSinh a){
    System.out.println("Ho ten: "+a.getHoTen());
    System.out.println("Tuoi: "+a.getTuoi());
    System.out.println("Nam Sinh: "+a.getNamSinh());
    System.out.println("Que Quan: "+a.getQueQuan());
    
}
public void hienThi(){
    System.out.println("Hien Thi nhung hoc sinh nam 1985: ");
    
    for(int i=0;i<HSHS.length;i++){
        if(HSHS[i].hs.namSinh==1985){
            System.out.println("-------------------");
        
        }
        in(HSHS[i]);
        
        
   
    }
    
}

   

   
    
    
    
}
