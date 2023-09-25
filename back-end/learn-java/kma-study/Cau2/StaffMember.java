
package Cau2;

public abstract class StaffMember { 
        protected String name;
        protected String address;
        protected String phone;
        
        public abstract double pay(); // 0 la StaffMember, 1 la Volunteer, 2 la Employee
                             // 3 la Executive , 4 la Hourly 
        
        @Override
        public String toString() {
            return this.getName()+ "song tai "+ this.getAddress()+ "co sdt la "+ phone ;
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
        public StaffMember() {
        }

}