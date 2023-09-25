
package Test;

public class StaffMember extends Staff{ // lop volunteer o duoi
        protected String name;
        protected String address;
        protected String phone;
        
        public double pay(){ // 0 la StaffMember, 1 la Volunteer, 2 la Employee
            return 0;        // 3 la Executive , 4 la Hourly 
        }
        
        public String toString() {
            return name+ "song tai "+ address+ "co sdt la "+ phone ;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getAddress() {
            return address;
        }

        public void setAddress(String address) {
            this.address = address;
        }

        public String getPhone() {
            return phone;
        }

        public void setPhone(String phone) {
            this.phone = phone;
        }

        public StaffMember(String name, String address, String phone) {
            this.name = name;
            this.address = address;
            this.phone = phone;
        }
        
        public class Volunteer extends StaffMember {
    
         public Volunteer(String name, String address, String phone) {
            super(name, address, phone);
         }
         
         @Override
         public double pay() {
             return 1;
         }
    
}
    }