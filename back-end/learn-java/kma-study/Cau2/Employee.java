
package Cau2;

import java.util.ArrayList;

public class Employee extends StaffMember {
    protected String socialSecurityNumber ;
    protected double payRate ;

    public String getSocialSecurityNumber() {
        return socialSecurityNumber;
    }

    public void setSocialSecurityNumber(String socialSecurityNumber) {
        this.socialSecurityNumber = socialSecurityNumber;
    }

    public double getPayRate() {
        return payRate;
    }

    public void setPayRate(double payRate) {
        this.payRate = payRate;
    }

    public Employee(String socialSecurityNumber, double payRate, String name, String address, String phone) {
        super(name, address, phone);
        this.socialSecurityNumber = socialSecurityNumber;
        this.payRate = payRate;
    }

    public Employee() {
        super();
    }
    @Override
    public String toString() {
        return super.toString()+ "co sdt nha la"+ this.socialSecurityNumber+ this.payRate;
    }
    
    @Override
    public double pay() {
        return 2;
    }
    
}
