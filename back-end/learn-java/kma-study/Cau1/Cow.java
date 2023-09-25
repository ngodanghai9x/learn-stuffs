
package Cau1;

public class Cow extends Animal{
    public Cow(String name) {
        super(name);
        System.out.println("Đây là Constructor 1 tham số của "+this.name);
    }
    public Cow() {
        System.out.println("Đây là Constructor rỗng của "+this.name);
    }
    @Override
    public String makeASound(){
        //this.name="Cow";
        return "moo moo moo --- COW";
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
