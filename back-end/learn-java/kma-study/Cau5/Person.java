package lab05;

import java.util.Scanner;

public class Person {
    protected String Name,Address,Department;
    public Person(){}
    
    public void Input(Person x){
        Scanner ip = new Scanner(System.in);
        System.out.print("Name: ");
        x.Name = ip.nextLine();
        System.out.print("Address: ");
        x.Address = ip.nextLine();
        System.out.print("Department: ");
        x.Department = ip.nextLine();
    }
    public void print(){
        System.out.print("Name: "+ this.Name +"/tAddress: "+this.Address+"/tDepartment: "+this.Department);
    }
}
