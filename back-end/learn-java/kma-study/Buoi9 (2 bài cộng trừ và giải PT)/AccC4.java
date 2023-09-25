
package Buoi9;

public class AccC4 {
    private int number;
    private String name;
    private float money;
    @Override
    public String toString() {
        return this.number+"$"+this.name+"$"+this.money;
    }
    public AccC4(){
    }
    public AccC4(int number, String name, float money) {
        this.number = number;
        this.name = name;
        this.money = money;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public float getMoney() {
        return money;
    }

    public void setMoney(float money) {
        this.money = money;
    }
    
}
