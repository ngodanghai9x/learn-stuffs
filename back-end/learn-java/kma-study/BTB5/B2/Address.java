
package bai2;


public class Address extends Person{
    private String postCode;

    public String getPostCode() {
        return postCode;
    }

    @Override
    public String dateOfBirth() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public String ageAsDays() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
    
}
