
package Test;

public class Hourly extends Employee {
    private int hoursWorked;

    public Hourly(int hoursWorked, String socialSecurityNumber, double payRate, String name, String address, String phone) {
        super(socialSecurityNumber, payRate, name, address, phone);
        this.hoursWorked = hoursWorked;
    }

    public int getHoursWorked() {
        return hoursWorked;
    }

    public void setHoursWorked(int hoursWorked) {
        this.hoursWorked = hoursWorked;
    }
    
    public void addHours (int moreHours){
        System.out.println("Ham lam them gio");
    }
    @Override
    public double pay() {
        return 4;
    }
    
    @Override
    public String toString(){
        return "nhan vien lam theo gio";
    }
}
