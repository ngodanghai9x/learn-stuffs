package lab05;


public class Student extends Person {
    private String Class;
    public Student (){}
    
    public Student Input(String cl){
        Student x = new Student();
        super.Input(x);
        Class = cl;
        return x;
    }
    
    @Override
    public void print(){
        super.print();
        System.out.println("/tClass: "+Class);
    }
}
