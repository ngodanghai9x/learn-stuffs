package ChaCon_KeThua;

/**
 *
 * @author MSI
 */
public class Main {
    public static void main(String[] args) {
//        int x;
//        try {
//            x=Integer.parseInt("10");
//            System.out.println(" "+x);
//        }
//        catch (NumberFormatException e){
//            e.printStackTrace();
//        }
        /////////////////////////////////
        Cha ch=new Cha();
        Conn co=new Conn();
        co.methodCha();// do extends nên vẫn dùng đc, kp do constructor
    }
}
