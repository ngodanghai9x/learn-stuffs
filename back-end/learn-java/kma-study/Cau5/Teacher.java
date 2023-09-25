package lab05;

import java.util.Scanner;

public class Teacher extends Person {
    private String Rank;
    public Teacher(){}
    
    public Teacher Input(){
        Teacher a = new Teacher();
        super.Input(a);
        Scanner ip = new Scanner(System.in);
        System.out.print("Rank: ");
        a.Rank = ip.nextLine();
        return a;
    }
    
    @Override
    public void print(){
        super.print();
        System.out.println("/tRank: "+Rank);
    }
}
