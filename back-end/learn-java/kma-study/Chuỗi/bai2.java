
package javaapplication4;

import static com.sun.org.apache.xml.internal.security.keys.keyresolver.KeyResolver.length;
import java.util.Scanner;

/**
 *
 * @author chimh
 */
public class JavaApplication4 {

    public static void main(String[] args) {
        // TODO code application logic here
        String xau;
        Scanner sc=new Scanner(System.in);
        System.out.print("Nhap chuoi bat ki:");
        xau=sc.nextLine();
        check(xau);
    }
    static void check(String s){
        char kitu; boolean ch;
        for (int i=0; i < s.length(); i++ ){
            kitu=s.charAt(s.length() - i - 1);
           if (s.charAt(i) == kitu) {    
               ch=true;
        } else {
               ch=false;
           }
    }
        if (ch=true) {
            System.out.println(" Chuỗi này là chuỗi Panlyndrome.");
        }
        if (ch=false){
            System.err.println("Chuỗi này khong là chuỗi Panlyndrome.");
        }
     } 
}
