
package Cau3;

public abstract class Person implements Mammal {
    private BloodGroup bg;
    private Address add;
    private String firstName;

    public Person() {
    }

    public Person(BloodGroup bg, Address add, String firstName) {
        this.bg = bg;
        this.add = add;
        this.firstName = firstName;
    }

    public BloodGroup getBg() {
        return bg;
    }

    public void setBg(BloodGroup bg) {
        this.bg = bg;
    }

    public Address getAdd() {
        return add;
    }

    public void setAdd(Address add) {
        this.add = add;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    
}
