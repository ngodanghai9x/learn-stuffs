public class ListNode {
	int data;
	ListNode nextNode;
	
	ListNode(int value){
		this(value,null);
	}
	
	ListNode(int value,ListNode node){
		data = value;
		nextNode = node;
	}
	
	int getData(){
		return data;
	}
	
	ListNode getNext(){
		return nextNode;
	}
}