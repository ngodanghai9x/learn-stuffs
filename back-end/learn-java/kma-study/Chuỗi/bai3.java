
package Test;

public class Main {
	public static void main(String[] args) {
		String src = "D:/music/bolero/longme.mp3";
		int k = src.lastIndexOf("/");
		String a = src.substring(k+1);
		System.out.println(a);
		System.out.println(a.substring(0, a.lastIndexOf(".")));
	}
}
