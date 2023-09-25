
package Cau2;

public class Hourly extends Employee {
    private int hoursWorked;

    public Hourly(int hoursWorked, String socialSecurityNumber, double payRate, String name, String address, String phone) {
        super(socialSecurityNumber, payRate, name, address, phone);
        this.hoursWorked = hoursWorked;
    }

    public Hourly() {
    }
    
    public int getHoursWorked() {
        return hoursWorked;
    }

    public void setHoursWorked(int hoursWorked) {
        this.hoursWorked = hoursWorked;
    }
    
    public void addHours (int moreHours){
        System.out.println("Ham lam them gio"+this.hoursWorked+"+"+moreHours);
    }
    @Override
    public double pay() {
        return super.pay()*this.hoursWorked;
    }
    
    @Override
    public String toString(){
        return super.toString()+"nhan vien lam theo gio"+this.getHoursWorked();
    }
}
