
package Test;

public class Executive extends Employee {
    private double bonus;

    public Executive(double bonus, String socialSecurityNumber, double payRate, String name, String address, String phone) {
        super(socialSecurityNumber, payRate, name, address, phone);
        this.bonus = bonus;
    }

    public double getBonus() {
        return bonus;
    }

    public void setBonus(double bonus) {
        this.bonus = bonus;
    }
    
    public void awardBonus (double execBonus){
        System.out.println("Executive award bonus");
    }
    @Override
    public double pay() {
        return 3;
    }
    
}
