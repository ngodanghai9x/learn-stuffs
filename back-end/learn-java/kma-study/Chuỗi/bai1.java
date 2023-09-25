
package javaapplication3;

import java.util.Scanner;

/**
 *
 * @author chimh
 */
public class JavaApplication3 {

    public static void main(String[] args) {
        // TODO code application logic here
        nhap();
    }
    public static void chuanhoa(String s){
        String s1[];
        String s3="";
        s=s.toLowerCase();
        s1=s.split(" ");
        for(int i=0;i<s1.length;i++){
            String s2="";
            if(s1[i].length() !=0 ){
                s2+=Character.toUpperCase(s1[i].charAt(0));
                if(s1[i].length() > 1)
                    s2+=s1[i].substring(1);
                s3+=s2;
                if (i < s1.length)
                    s3 += " ";
            }
        }
        if (s3.charAt(s3.length() - 1)== ' ') s3+= "\b" ;
        System.out.println("Xau da chuan hoa la:"+s3);
    }
    public static void nhap(){
        String xau;
        Scanner sc=new Scanner(System.in);
        xau=sc.nextLine();
        System.out.println("Chuoi ki tu vua nhap la:"+xau);
        chuanhoa(xau);
    }
    
}
