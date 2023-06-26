
package BtFile;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) throws FileNotFoundException, IOException {
        ArrayList<NhanVien> arr=new ArrayList<NhanVien>();
        FileReader fr=new FileReader("G:\\nv.dat");
        BufferedReader bf=new BufferedReader(fr);
        String s;
        NhanVien nv;
        s=bf.readLine();
        while (s!=null) {
            String[] a=s.split("\\$");
            System.out.println("hienThi: "+a[0]+" "+a[1]+" "+a[2]+" "+a[3]+" "+a[4]+" "+a[5]+" "+a[6]+" "+a[7]+" ");
            nv=new NhanVien(a[0],Integer.parseInt(a[1]),Integer.parseInt(a[2]),Integer.parseInt(a[3]),a[4],a[5],a[6],a[7]);
            arr.add(nv);
            s = bf.readLine();  
        }
        for(NhanVien nv1:arr ) {
            nv1.hienThi();
        }
    }
}
