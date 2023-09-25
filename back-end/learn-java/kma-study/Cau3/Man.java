
package Cau3;

public class Man extends Person{
    private Boolean watchingFootball;

    public Man() {
    }

    public Man(Boolean watchingFootball) {
        this.watchingFootball = watchingFootball;
    }

    public Man(Boolean watchingFootball, BloodGroup bg, Address add, String firstName) {
        super(bg, add, firstName);
        this.watchingFootball = watchingFootball;
    }

    public Boolean getWatchingFootball() {
        return watchingFootball;
    }

    public void setWatchingFootball(Boolean watchingFootball) {
        this.watchingFootball = watchingFootball;
    }
    
    public void WatchFb() {
        System.out.println("ham` xem bong da");
    }
    public Boolean isWatching() {
        //System.out.println("ham` isWatching ");
        return false;
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
