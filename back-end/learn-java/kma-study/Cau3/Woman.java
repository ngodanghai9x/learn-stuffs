
package Cau3;

public class Woman extends Person{
    Boolean wearingMakeup;

    public Woman() {
    }

    public Woman(Boolean wearingMakeup) {
        this.wearingMakeup = wearingMakeup;
    }

    public Woman(Boolean wearingMakeup, BloodGroup bg, Address add, String firstName) {
        super(bg, add, firstName);
        this.wearingMakeup = wearingMakeup;
    }
    
    public void putMakeupOn() {
        System.out.println("ham` makeup");
    }
    public Boolean isWearingMakup() {
        //System.out.println("ham` isWearingMakeup");
        return true;
    }
    @Override
    public void setDateOfBirth(double date) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public Numeric getAgeAsDays() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
}
