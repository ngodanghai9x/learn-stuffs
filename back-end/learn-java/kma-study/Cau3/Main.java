
package Cau3;

public class Main {
    public static void main(String[] args) {
        BloodGroup b=new BloodGroup();
        b.setNhomMau("O-");
        Address ar=new Address();
        ar.setPostCode("A100");
        Man ma=new Man();
        ma.setAdd(ar);
        ma.setBg(b);
        ma.setFirstName("Trai");
        System.out.println("\nFirstName:"+ma.getFirstName()+"\nAddress:"+ma.getAdd().getPostCode()
              +"\nBloodGroup:"+ma.getBg().getNhomMau());
        ma.WatchFb();
        System.out.println("Co xem Da Bong k? Rep: "+ma.isWatching());
        Woman wo=new Woman();
        wo.setAdd(ar);
        wo.setBg(b);
        wo.setFirstName("Gái");
        System.out.println("\nFirstName:"+wo.getFirstName()+"\nAddress:"+wo.getAdd().getPostCode()
              +"\nBloodGroup:"+wo.getBg().getNhomMau());
        wo.putMakeupOn();
        System.out.println("Co Make up  k? Rep: "+ wo.isWearingMakup());
    }
}
