
package Th2Cau2;


import java.util.Scanner;

public class KhuPho {
    private Nguoi ng; 
    private int soNha;
    private int soNguoi;

    public KhuPho() {
    }

    public Nguoi getNg() {
        return ng;
    }

    public void setNg(Nguoi ng) {
        this.ng = ng;
    }

    public int getSoNha() {
        return soNha;
    }

    public void setSoNha(int soNha) {
        this.soNha = soNha;
    }

    public int getSoNguoi() {
        return soNguoi;
    }

    public void setSoNguoi(int soNguoi) {
        this.soNguoi = soNguoi;
    }
    
    public void nhapKP() {
        Scanner sc=new Scanner(System.in);
        System.out.println("Nhap so dia chi nha: ");
        this.soNha = sc.nextInt();
        char chon;
        ng = new Nguoi();
        do{
            System.out.println("Ban co muon nhap thong tin thanh vien khong? (y/n) : ");
            chon = sc.next().charAt(0);
            if (chon == 'N' || chon == 'n'){
               System.out.println("Ket Thuc");
               break;
            }
            else{
                ng.nhapNguoi();  
                this.soNguoi=0;
                this.soNguoi++;
            }
                
            
        } while(chon != 'N' || chon != 'n');
    }
    public void xuatKP() {
        System.out.println("Ho gia dinh so "+this.soNha+" co: "+this.soNguoi);
        //System.out.println(ng);
        System.out.println(ng.getHoTen()+" "+ng.getTuoi()+" tuoi,sinh nam "+ng.namSinh+" lam nghe "+ng.nghe);
    }
}
