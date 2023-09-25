package test;

import java.awt.*;
import java.util.Scanner;

public class QuanLySach {
    Scanner sc=new Scanner(System.in);
    private Sach[] arrSach;
    private Tapchi[] arrTapchi;
    private Bao[] arrBao;
    int m,i;
    String key_ma;
    public static int Menu(){
        Scanner sc=new Scanner(System.in);
        int Chon;
        System.out.println("\n====MENU====");
        System.out.println("1.Nhập thông tin về các tài liệu.");
        System.out.println("2.Hiện thị thông tin về các tài liệu.");
        System.out.println("3.Tìm kiếm tài liệu theo loại.");
        System.out.println("4.Thoát khỏi chương trình.");
        System.out.print("==>Chọn:");
        Chon=sc.nextInt();
        return Chon;
    }
    public void Nhap(){
        int luachon;
        System.out.println("\tNhập thông tin về các loại tài liệu:\t1.Sách 2.Tạp chí 3.Báo");
        System.out.print("\t->Chọn:");
        luachon=sc.nextInt();
        switch (luachon){
            case 1:{
                Sach s=new Sach();
                System.out.print("\t\tSố lượng sách cần nhập:");
                m=sc.nextInt();
                arrSach=new Sach[m];
                for(i=0;i<m;i++){
                    arrSach[i]=new Sach();
                    System.out.println("\t\tSách thứ "+(i+1)+":");
                    arrSach[i].Nhap();
                }
                break;
            }
            case 2:{
                Tapchi tc=new Tapchi();
                System.out.print("\t\tSố lượng tạp chí cần nhập:");
                m=sc.nextInt();
                arrTapchi=new Tapchi[m];
                for(i=0;i<m;i++){
                    arrTapchi[i]=new Tapchi();
                    System.out.println("\t\tTạp chí thứ "+(i+1)+":");
                    arrTapchi[i].Nhap();
                }
                break;
            }
            case 3:{
                Bao b=new Bao();
                System.out.print("\t\tSố lượng báo cần nhập:");
                m=sc.nextInt();
                arrBao=new Bao[m];
                for(i=0;i<m;i++){
                    arrBao[i]=new Bao();
                    System.out.println("\t\tBáo thứ "+(i+1)+":");
                    arrBao[i].Nhap();
                }
                break;
            }
        }


    }
    public void HienThi(){
        if (arrSach !=null){
            for(i=0;i<arrSach.length;i++){
                System.out.println("\t\tSách thứ "+(i+1)+":");
                arrSach[i].Hienthi();
            }
        }
        if (arrTapchi !=null) {
            for (i = 0; i < arrTapchi.length; i++) {
                System.out.println("\t\tTạp chí thứ " + (i + 1) + ":");
                arrTapchi[i].Hienthi();
            }
        }
        if (arrBao !=null) {
            for (i = 0; i < arrBao.length; i++) {
                System.out.println("\t\tBáo thứ " + (i + 1) + ":");
                arrBao[i].Hienthi();
            }
        }
    }

    public void TimBao(Bao b){
        if(b.getMaTaiLieu().equals(key_ma)){
            b.Hienthi();
        }
    }
    public void TimSach(Sach s){
        if(s.getMaTaiLieu().equals(key_ma)){
            s.Hienthi();
        }
    }
    public void TimTapChi(Tapchi tc){
        if(tc.getMaTaiLieu().equals(key_ma)){
            tc.Hienthi();
        }
    }

    public void Timkiem(){
        int loai;
        System.out.println("Tìm 1.Sách 2.Tạp chí 3.Báo");
        loai=sc.nextInt();
        System.out.print("Nhập mã tài liệu muốn tìm:");
        key_ma = new Scanner(System.in).nextLine();
        switch (loai) {
            case 1: {
                for(i=0;i<arrSach.length;i++){
                    TimSach(arrSach[i]);
                }
                break;
            }
            case 2: {
                for(i=0;i<arrTapchi.length;i++){
                    TimTapChi(arrTapchi[i]);
                }
                break;
            }
            case 3: {
                for(i=0;i<arrBao.length;i++){
                    TimBao(arrBao[i]);
                }
                break;
            }
        }
    }

        public static void main(String[] args){
        QuanLySach qls=new QuanLySach();
        int chon;
        do{
            chon=Menu();
            switch (chon){
                case 1:{
                    System.out.println("----1.Nhập----");
                    qls.Nhap();
                    break;
                }
                case 2:{
                    System.out.println("----2.Hiển thị----");
                    qls.HienThi();
                    break;
                }
                case 3:{
                    System.out.println("c" +
                            "----3.Tìm kiếm theo loại----");
                    qls.Timkiem();
                    break;
                }
                case 4:{
                    System.out.println("Cảm ơn bạn đã sử dụng chương trình.");
                    break;
                }
                default:
                    System.out.println("(!)Chọn không hợp lệ.Vui lòng chọn lại.");
            }



        }while (chon!=4);

    }
}
