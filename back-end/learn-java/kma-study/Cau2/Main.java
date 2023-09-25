
package Cau2;

public class Main {
    public static void main(String[] args) {
        Staff s=new Staff();
        Employee em=new Employee("sdt=123456", 11, "khanh", "my dinh", "dt=123");
        s.addStaffMember(em);
        s.payday();
    }
}
