// var CryptoJS = require("crypto-js");
var SHA256 = require("crypto-js/sha256");


class Block2 {
  constructor(data = '', prevHash = '') {
    this.prevHash = prevHash;
    this.data = data;
    this.createdDate = new Date();
    this.hash = getHash();
    this.nonce = 0;
  }

  getHash() {
    return SHA256(this.prevHash + this.createdDate + JSON.stringify(this.data) + this.nonce).toString();
  }

  mining(level) { // độ khó
    //Kiểm tra xem giá trị Hash hiện tại đã đạt đủ số 0 ở đầu tiên như yêu vầu về độ khó đặt ra chưa. Lặp đi lặp lại hàm cho đến khi tìm được giá trị Hash đáp ứng yêu cầu.
    while (this.hash.substring(0, level) !== Array(level + 1).join("0")) { 
      //Tăng giá trị trong Block lên, để Hash mỗi lần sẽ nhận được một giá trị khác nhau. Nếu Hash không có 2 hoặc n số 0 ở đầu thì sẽ không đạt yêu cầu và phải tiếp tục Hash cái khác.
        this.nonce++; 
        this.hash = this.getHash(); //Tính toán lại Hash của toàn bộ Block ứng với lần tăng này.
    }

    console.log("Đã đào xong Block: " + this.hash); //Nếu đã tìm được Hash thì ta coi đấy là một lần "đào" (mining) thành công.
    return this.hash;
}
}

class Blockchain2 {
  constructor() {
    //Tạo ra một mảng rỗng để chứa các Block. 
    this.blocks = [];
    this.savedBlocks = [];

    this.level = 3;

    //Genesis Block, hay chính là "phần tử khởi tạo". Các phần tử tiếp theo sẽ nối tiếp vào phần tử này.
    const genesisBlock = new Block2('First block');
    this.blocks.push(genesisBlock);
    this.savedBlocks.push(genesisBlock);
  }

  getLastBlock() {
    return this.blocks[this.blocks.length - 1];
  }


  appendBlockToChain(newBlock) {
    newBlock.prevHash = this.getLastBlock().hash;
    // newBlock.hash = newBlock.getHash();
    newBlock.mining(this.level);
    this.blocks.push(newBlock);
    
    if (isValidBlock()) {
      this.savedBlocks = [...this.blocks];
    } else {
      this.blocks = [...this.savedBlocks];
    }
  }

  isValidBlock() {
    for (let i = 1; i < this.blocks.length; i++) {
      const curBlock = this.blocks[i];
      const prevBlock = this.blocks[i - 1];
      if (curBlock.hash !== curBlock.getHash()) { // kiểm tra lại hash của block hiện tại với hash được tính toán (phụ thuộc vào data, prevHash)
        return false;
      }
      if (curBlock.prevHash !== prevBlock.hash) { // kiểm tra lại giá trị prevHash
        return false;
      }
    }
    return true;
  }
}

const myCoin2 = new Blockchain2(); //Tạo mới một Blockchain để chứa các giao dịch. Ở đây ta có thể coi là lịch sử giao dịch của đồng tiền myCoin2.
myCoin2.appendBlockToChain(new Block2({
  senderAddress: "Ong A",
  receiverAddress: "Ba B",
  money: 350
}));
myCoin2.appendBlockToChain(new Block2({
  senderAddress: "Ba B",
  receiverAddress: "Ong C",
  money: 200
})); 

/* 
Ta cũng thấy là công nghệ vừa tạo ra có nhược điểm là rất dễ bị hack. Bởi vì ta có được giao dịch cuối cùng trong chuỗi, thì lần theo dấu vết lần lượt các Hash của từng phần tử, ta sẽ xâu chuỗi lại được toàn bộ mảng Blockchain. Việc chỉnh sửa bằng cách tính toán lại toàn bộ Hash cho khớp và đồng bộ lúc này chỉ cần vài động tác và data sẽ nghiễm nhiên là toàn vẹn ở tất cả các máy trong mạng ngang hàng.

Có bạn sẽ bảo là có thuật toán để check MangBlock ở máy mình và MangBlock được tải về từ mạng P2P để xem sự khác nhau trước khi đồng bộ. Đúng là có thuật toán đó. Nhưng thuật toán này lại ưu tiên mảng nào "dài hơn" lại là mảng được cân nhắc là mảng đúng. Do đó nó không đủ mạnh để giải quyết vấn nạn hack.

Có một cách hay hơn để ngăn chặn việc này. Đó là giới hạn thời gian Hash được một Blockchain. Ta phải tăng độ khó của thuật toán Hash lên để Hash được một chuỗi sẽ cần rất nhiều thời gian. Điều này cũng có nghĩa là phải sau một thời gian nhất định mới có thể thêm mới 1 Block vào hệ thống. Ví dụ đồng tiền BitCoin thì quy định, sau mỗi 10 phút mới cho phép một bản ghi mới được thêm vào.

Làm điều này để làm gì?
Ngăn chặn hệ thống Blockchain bị SPAM, liên tục có người thêm mới giao dịch giả vào hệ thống. Dẫn đến Blockchain bị DDOS, và có thể sập. Dữ liệu thật thì bị lấy đi.
Ngăn chặn việc làm giả hệ thống, vì thời gian hacker Hash được 100 bản ghi sẽ bằng 100x10 phút = 1000 phút. Do đó hắn sẽ không dễ dàng clone toàn bộ hệ thống và Hash ra mã mới.

=> người dùng phải chứng minh rằng mình muốn giao dịch (dùng máy để tính toán hash) (Proof-Of-Work)
*/

/* 
Ta cũng thấy là công nghệ vừa tạo ra có nhược điểm là rất dễ bị hack. Bởi vì ta có được giao dịch cuối cùng trong chuỗi, thì lần theo dấu vết lần lượt các Hash của từng phần tử, ta sẽ xâu chuỗi lại được toàn bộ mảng Blockchain. Việc chỉnh sửa bằng cách tính toán lại toàn bộ Hash cho khớp và đồng bộ lúc này chỉ cần vài động tác và data sẽ nghiễm nhiên là toàn vẹn ở tất cả các máy trong mạng ngang hàng.

Có bạn sẽ bảo là có thuật toán để check MangBlock ở máy mình và MangBlock được tải về từ mạng P2P để xem sự khác nhau trước khi đồng bộ. Đúng là có thuật toán đó. Nhưng thuật toán này lại ưu tiên mảng nào "dài hơn" lại là mảng được cân nhắc là mảng đúng. Do đó nó không đủ mạnh để giải quyết vấn nạn hack.

Có một cách hay hơn để ngăn chặn việc này. Đó là giới hạn thời gian Hash được một Blockchain. Ta phải tăng độ khó của thuật toán Hash lên để Hash được một chuỗi sẽ cần rất nhiều thời gian. Điều này cũng có nghĩa là phải sau một thời gian nhất định mới có thể thêm mới 1 Block vào hệ thống. Ví dụ đồng tiền BitCoin thì quy định, sau mỗi 10 phút mới cho phép một bản ghi mới được thêm vào.
*/