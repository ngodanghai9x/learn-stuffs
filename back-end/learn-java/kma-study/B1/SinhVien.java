
package javaapplication6;

import java.util.Scanner;
public class SinhVien extends Nguoi {
    SinhVien[] sv;
    private int sl;
    private String maSV;
    private float diemTb;
    
    public void Nhap()
    {
        Scanner sc = new Scanner(System.in);
        super.nhap();
        System.out.println("Ma Sinh Vien Vua Nhap La:");        
        maSV = sc.nextLine();
        System.out.println("Diem Trung Binh Cua Sinh Vien La: ");
        diemTb=sc.nextFloat();
    }
    @Override
    public void nhap()
    {
        System.out.println("Nhap so sinh vien:");
        Scanner sc = new Scanner(System.in);
        sl=sc.nextInt();
        sv = new SinhVien[sl];
        for(int i=0;i<sl;i++)
        {
            System.out.println("Nhap thong tin sinh vien thu "+(i+1)+" la:");
            sv[i] = new SinhVien();
            sv[i].Nhap();
        }
    }
    public void SapXep()
    {
        for(int i=0;i<sl-1;i++)
        {
            for(int j=i+1;j<sl;j++)
            {
                if(sv[i].diemTb<sv[j].diemTb)
                {
                    float temp = sv[j].diemTb;
                    sv[j].diemTb=sv[i].diemTb;
                    sv[i].diemTb=temp;
                }
            }
        }
    }
    public void In()
    {
        super.xuat();
        System.out.print("\t Ma Sinh Vien La" + maSV + "\t Diem La: " + diemTb);
        System.out.print("________________________________");
    }    
    @Override
public void xuat()
{
    System.out.println("=====Thong tin sinh vien=====");
    System.out.println("\tHoTen         NamSinh         MSV         DiemTB");
    for(int i=0;i<sl;i++)
    {
        sv[i].In();
    }
}
}      
    

    

