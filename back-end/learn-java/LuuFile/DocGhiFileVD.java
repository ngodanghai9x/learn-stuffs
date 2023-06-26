
package LuuFile;

import java.util.ArrayList;

public class DocGhiFileVD {
//Luu doi tuong thi phai ke thua tu serialize
    public static void main(String[] args) {
        // TODO code application logic here
        /*ArrayList<Khachhang> dskh = new ArrayList<>();
        dskh.add(new Khachhang("Giang","mn1"));
        dskh.add(new Khachhang("Hoang","mn2"));
        
        boolean kq = SerializeIO.luuFile(dskh,"D:/data.dat");
        if(kq==true)
        {
            System.out.println("In thanh cong");
        }
        else
        {
            System.out.println("In deo thanh cong");
        }*/
    Object data = SerializeIO.docFile("D:/data.dat");
        ArrayList<Khachhang> dskh = (ArrayList<Khachhang>)data;
       for(Khachhang khachhang : dskh)
       {
           System.out.println(khachhang);
       }
    }
    
}
