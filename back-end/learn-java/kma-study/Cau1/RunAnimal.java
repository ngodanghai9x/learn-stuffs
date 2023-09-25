
package Cau1;

public class RunAnimal {
    public static void main(String[] args) {
        Cat ca=new Cat("cat");
        Animal d=new Dog("dog");
        Animal co=new Cow("cow");
        ca.introduce();
        d.introduce();
        co.introduce();
        Cat a=new Cat();
        Animal b=new Cat("meo", 1999);
        
    }
}
