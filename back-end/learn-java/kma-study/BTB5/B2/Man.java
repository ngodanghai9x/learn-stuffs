
package bai2;



    public class Man extends Person{

    private final boolean WatchingFootball;
        public boolean WatchingFootballstatic() {
            return false;
            
        
    }

    public Man(boolean WatchingFootball) {
        this.WatchingFootball = WatchingFootball;
    }
        public void watchFootball(){
                
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


