/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Cau2;

/**
 *
 * @author MSI
 */
public class Volunteer extends StaffMember {
    
         public Volunteer(String name, String address, String phone) {
            super(name, address, phone);
         }
         
         @Override
         public double pay() {
             return 1;
         }
}
