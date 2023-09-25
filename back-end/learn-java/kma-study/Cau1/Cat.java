
package Cau1;

public class Cat extends Animal{

    public Cat(String name) {
        super(name);
        System.out.println("Đây là Constructor 1 tham số name của "+this.name);
    }
    public Cat(String name, int population) {
        super(name, population);
        System.out.println("Đây là Constructor 2 tham số name,pop của "+this.name);
    }
    public Cat() {
        System.out.println("Đây là Constructor rỗng của "+this.name);
    }
    @Override
    public String makeASound(){
        //super.name = "Cat";
        return "mew mew mew --- "+super.name;
    }

    @Override
    public void introduce() {
        System.out.println(" "+this.makeASound()+", có số lượng cá thể là: "+super.population+", và có con là: "+this.giveBirth()); 
    }

    @Override
    public String giveBirth() {
        return this.name+"'s baby"; 
    }
}
