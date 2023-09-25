package lab05;

import java.util.Scanner;

public class Class {
    private String Classname;
    private Student[] studentList;
    private int numOfStudent;
    private Teacher advisor;
    
    public Class(){}
    
    
    public void Input(){
        Scanner ip = new Scanner(System.in);
        System.out.print("Name of class: ");
        Classname = ip.nextLine();
        System.out.print("Number of students: ");
        numOfStudent = ip.nextInt();
        studentList = new Student[numOfStudent];
        System.out.println("Information about avisor: ");
        advisor = new Teacher();
        advisor = advisor.Input();
        for(int i=0;i<numOfStudent;++i){
            studentList[i] = new Student();
            System.out.println("Information of student number "+(i+1));
            studentList[i] = studentList[i].Input(Classname);
        }
    }
    
    public void printList(){
        System.out.println("|STT|Name of student     |Address    |Department|Name of advisor     |");
        for(int i=0;i<numOfStudent;++i){
            System.out.printf("|%-3d|%-20s|%-11s|%-10s|%-20s|\n",i+1,studentList[i].Name,studentList[i].Address,studentList[i].Department,advisor.Name);
        }
    }
}
