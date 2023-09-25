import java.util.Scanner;

import Stack.LinkedList;

public class Stack {
	static Scanner scn = new Scanner(System.in);
	private LinkedList stackList;
	
	public Stack(){
		stackList = new LinkedList();
	}
	
	public void push(int value){
		stackList.insertAtFront(value);
	}
	
	public int pop(){
		return stackList.removeFromFront();
	}
	
	public boolean isEmpty(){
		return stackList.isEmpty();
	}
	
	public void print(){
		stackList.print();
	}
	
	public static void main(String[] args){
		Stack test = new Stack();
		int select;
		System.out.println("Nh?p s? lu?ng node mu?n push : ");
		select = Integer.parseInt(scn.nextLine());
		for(int i=0;i<select;i++){
			System.out.println("Nh?p vào giá tr? c?a node mu?n thêm vào : ");
			int data = Integer.parseInt(scn.nextLine());
			test.push(data);
		}
		test.print();
	}
}
