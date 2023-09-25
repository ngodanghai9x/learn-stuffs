
package Cau2;

import java.util.ArrayList;

public class Staff {
    private ArrayList<StaffMember> staffList = new ArrayList<StaffMember>();

    public Staff() {
    }

    public ArrayList<StaffMember> getStaffList() {
        return staffList;
    }

    public void setStaffList(ArrayList<StaffMember> staffList) {
        this.staffList = staffList;
    }
    
    public void addStaffMember(StaffMember sm) {
        staffList.add(sm);
    }

    @Override
    public String toString() {
        return super.toString(); //To change body of generated methods, choose Tools | Templates.
    }
    
    public  void payday() {
        System.out.println("Staff");
        
        for(StaffMember staffMember : staffList) {
            System.out.println(staffMember.toString());
        }
        for(int i=0;i<staffList.size();i++) {
            staffList.get(i).toString();
        }
        
    }

}
