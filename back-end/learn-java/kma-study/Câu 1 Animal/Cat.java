
package BaiLam;

public class Cat extends Animal{

    public Cat(String name) {
        super(name);
        System.out.println("Đây là Constructor của "+this.name);
    }
    public Cat(String name, int population) {
        super(name, population);
        System.out.println("Đây là Constructor của "+this.name);
    }
    public Cat() {
        System.out.println("Đây là Constructor của "+this.name);
    }
    @Override
    public String makeASound(){
        //super.name = "Cat";
        return "mew mew mew --- "+super.name;
    }

    @Override
    public void introduce() {
        System.out.println(" "+this.makeASound()+", có số lượng cá thể là: "+this.population+", và có con là: "+this.giveBirth());
        
    }

    @Override
    public String giveBirth() {
        return this.name+"'s baby"; //To change body of generated methods, choose Tools | Templates.
    }
}
