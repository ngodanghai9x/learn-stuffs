public class LinkedList {
	private ListNode firstNode;
	private ListNode lastNode;
	
	public LinkedList(){
		firstNode = lastNode = null;
	}
	
	public void insertAtFront(int insertItem){
		if(isEmpty()){
			firstNode = lastNode = new ListNode(insertItem);
		}
		else{
			firstNode = new ListNode(insertItem,firstNode);
		}
	}
	
	public void insertAtBack(int insertItem){
		if(isEmpty()){
			firstNode = lastNode = new ListNode(insertItem);
		}
		else{
			lastNode = lastNode.nextNode = new ListNode(insertItem);
		}
	}
	
	public int removeFromFront(){
		int removeItem = -1;
		if(!isEmpty()){
			removeItem = firstNode.data;
			if(firstNode == lastNode){
				firstNode = lastNode = null;
			}
			else{
				firstNode = firstNode.nextNode;
			}
		}
		return removeItem;
	}
	
	public int removeFromtBack(){
		int removeItem = -1;
		if(!isEmpty()){
			removeItem = lastNode.data;
			if(firstNode == lastNode){
				firstNode = lastNode = null;
			}
			else{
				ListNode current = firstNode;
				while(current.nextNode != lastNode){
					current = current.nextNode;
				}
				lastNode = current;
				current.nextNode = null;
			}
		}
		return removeItem;
	}
	
	public boolean isEmpty(){
		if(firstNode == null){
			return true;
		}
		else{
			return false;
		}
	}
	
	public void print(){
		ListNode  node = firstNode;
		while(node != null){
			System.out.println(node.data + " ");
			node = node.nextNode;
		}
		System.out.println("\n");
	}
}
