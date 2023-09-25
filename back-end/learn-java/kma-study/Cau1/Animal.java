
package Cau1;

public abstract class Animal {
    protected String name;
    protected int population;

    public Animal(String name, int population) {
        this.name = name;
        this.population = population;
        this.population=0;
        this.population ++;
    }
    public Animal() {
        this.population=0;
        this.population ++;
    }
    public Animal(String name) {
        this.name = name;
        this.population=0;
        this.population ++;
    }
    
    public String makeASound() {
        return "animal";
    }
    public abstract void introduce();
    public abstract String giveBirth();
}