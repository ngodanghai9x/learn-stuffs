/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package javaapplication4;

import java.util.ArrayList;
import java.util.Scanner;
import java.io.*;

/**
 *
 * @author DucMjnh1992
 */
public class QuanLy
{
    /**
     * @param args the command line arguments
     */
    public static void saveToFile(ArrayList<DanhBa> danhba)
    {
        
        try
        {
            File f = new File("DanhBa.txt");
            ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(f));

            oos.writeInt(danhba.size());
            
            for(DanhBa stu : danhba)
            {
                oos.writeObject(stu);
            }

            oos.close();
        }
        catch(IOException ex)
        {
            ex.printStackTrace();
        }
    }

    public static ArrayList<DanhBa> inputFromFile()
    {
        ArrayList<DanhBa> danhba = new ArrayList<DanhBa>();
        
        
        try
        {
            File f = new File("DanhBa.txt");
            ObjectInputStream ois = new ObjectInputStream(new FileInputStream(f));

            int n = ois.readInt();

            for(int i = 0; i < n; i++)
            {
                danhba.add((DanhBa)ois.readObject());
            }

            ois.close();
        }
        catch(Exception ex)
        {
            ex.printStackTrace();
        }

        return danhba;
    }

    public static void input(ArrayList<DanhBa> danhba)
    {
        Scanner input = new Scanner(System.in);
        int n;

        do
        {
            System.out.print("Moi Nhap So Luong : ");
            n = input.nextInt();
        }
        while(n <= 0);

        for(int i = 0; i < n; i++)
        {
            DanhBa stuTemp = new DanhBa();

            System.out.printf("So thu tu thu %d: \n", i);
            stuTemp.input();
            
            danhba.add(stuTemp);
        }
    }

    public static void output(ArrayList<DanhBa> danhba)
    {
        //for(Student stu : student)
        for(int i = 0; i < danhba.size(); i++)
        {
            System.out.println("Name: " + danhba.get(i).getHoTen());
            System.out.println("Sdt: " + danhba.get(i).getSdt());
            System.out.println();
        }
    }
    
    public static void main(String[] args)
    {
        Scanner input = new Scanner(System.in);
        ArrayList<DanhBa> danhba = new ArrayList<DanhBa>();
        int n = 0, selected = 0;

        do
        {
            System.out.println("Menu");
            System.out.println("1. Them Moi Danh Ba .");
            System.out.println("2. Hien Thi Danh Ba");
            System.out.println("0. Thoat");
            System.out.print(" Chon : ");
            selected = input.nextInt();

            switch(selected)
            {
                case 1:
                {
                    System.out.println("1. Them Moi Danh Ba");
                    input(danhba);
                    saveToFile(danhba);
                    
                    break;
                }
                case 2:
                {
                    System.out.println("2. Hien Thi Danh Ba");
                    output(inputFromFile()
                    );

                    break;
                }
                case 0:
                {
                    System.out.println("0. Thoat");

                    break;
                }
                default:
                {
                    System.out.println("EXIT");
                    
                    break;
                }
            }
        }
        while(selected != 0);
    }
}