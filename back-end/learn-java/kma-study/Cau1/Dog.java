
package Cau1;

public class Dog extends Animal{
    
    public Dog(String name) {
        super(name);
        System.out.println("Đây là Constructor 1 tham sốcủa "+this.name);
    }
    public Dog() {
        System.out.println("Đây là Constructor rỗng của "+this.name);
    }
    @Override
    public String makeASound(){
        //this.name="dog";
        return "woof  woof woof --- "+this.name;
    }

    @Override
    public void introduce() {
        System.out.println(" "+this.makeASound()+", co so luong ca the la: "+this.population+", va co: "+this.giveBirth());
        
    }

    @Override
    public String giveBirth() {
        return this.name+"'s baby"; //To change body of generated methods, choose Tools | Templates.
    }
}
