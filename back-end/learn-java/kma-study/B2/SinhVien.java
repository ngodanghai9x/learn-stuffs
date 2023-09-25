
package bai2;

import java.util.Scanner;

public class SinhVien extends Nguoi {
    
    SinhVien[] sv;
    private int sl;
    private String maSV;
    private float diemTB;
    
    public void Nhap()
    {
        Scanner sc = new Scanner(System.in);
        super.nhap();
        System.out.println("Nhap Ma SV:");
        maSV=sc.nextLine();
        System.out.println("Diem TB:");
        diemTB=sc.nextFloat();
    }
    @Override
    public void nhap()
    {
        System.out.println("So sinh vien can nhap la:");
        Scanner sc = new Scanner(System.in);
        sl=sc.nextInt();
        sv = new SinhVien[sl];
        for(int i=0;i<sl;i++)
        {
            System.out.println("Sinh vien thu "+(i+1)+" la:");
            sv[i] = new SinhVien();
            sv[i].Nhap();
        }
    }
    
    public void In()
    {
        super.xuat();
        System.out.print("\t"+maSV);
        System.out.print("\t"+diemTB);
        System.out.print("\n");
    }   
    @Override     
    public void xuat()
    {
        System.out.println("\tHo ten         Nam Sinh     Ma SV     Diem TB");
        for(int i=0;i<sl;i++)
        {
            sv[i].In();
        }
    }
    public void TimKiem()
    {
        int e=-1;
        System.out.println("Nhap ten sinh vien hoac ma sinh vien can tim kiem:");
        String Ten = new Scanner(System.in).nextLine();
        for(int i=0;i<sl;i++)
        {
            if(sv[i].ten.equalsIgnoreCase(Ten) || sv[i].maSV.equalsIgnoreCase(Ten))
            {
                System.out.println("Sinh vien can tim la:");
                System.out.println("\tHoten: "+sv[i].ten+"\tMSV: "+sv[i].maSV+"\tNamSinh: "+sv[i].namSinh+"\tDiemTB: "+sv[i].diemTB);
                e++;
            }
        }
        if(e==-1)
        {
            System.out.println("Khong tim thay sinh vien!");
        }
    }
}
