// var CryptoJS = require("crypto-js");
var SHA256 = require("crypto-js/sha256");

class Transaction3 {
  constructor(senderAddress, receiverAddress, money) {
    this.senderAddress = senderAddress;
    this.receiverAddress = receiverAddress;
    this.money = money;
  }
}

class Block3 {
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

class Blockchain3 {
  constructor() {
    //Tạo ra một mảng rỗng để chứa các Block. 
    this.blocks = [];
    this.savedBlocks = [];

    this.level = 4; //Với độ khó này thì 3 giây sẽ Hash được 1 block.
    this.pendingTransactions = [];
    this.reward = 10;

    //Genesis Block, hay chính là "phần tử khởi tạo". Các phần tử tiếp theo sẽ nối tiếp vào phần tử này.
    const genesisBlock = new Block3('First block');
    this.blocks.push(genesisBlock);
    this.savedBlocks.push(genesisBlock);
  }

  getLastBlock() {
    return this.blocks[this.blocks.length - 1];
  }


  // appendBlockToChain(newBlock) {
  //   newBlock.prevHash = this.getLastBlock().hash;
  //   // newBlock.hash = newBlock.getHash();
  //   newBlock.mining(this.level);
  //   this.blocks.push(newBlock);

  //   if (isValidBlock()) {
  //     this.savedBlocks = [...this.blocks];
  //   } else {
  //     this.blocks = [...this.savedBlocks];
  //   }
  // }

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

  miningMoney(receiver) { //Hàm dùng để đào (thêm mới) một Block vào Blockchain.
    //Lúc này ta sẽ tạo mới một Block, trong Block này sẽ chứa toàn bộ các giao dịch đã bị tạm hoãn trước đó, do nó chưa được đào và chưa có Hash.
    let block = new Block3(this.pendingTransactions[0], this.getLastBlock().Hash);

    block.mining(this.level); //Vẫn phải đào Hash bình thường cho lần này.
    this.blocks.push(block); //Nối phần tử block vào làm phần tử cuối cùng của mảng Blockchain sau khi đã "đào" được.


    //Sau khi đã bỏ công ra đào 1 Hash cho giao dịch hiện tại, ta sẽ có quyền được thưởng một phần tiền thưởng cố định sẵn. pendingTransactions đã được xử lý xong nên có thể xóa nó đi, sau đó ta gán một pendingTransactions mới, trong đó chuyển lượng tiền ta nhận được vào ví của chính mình.
    this.pendingTransactions = [
      ...this.pendingTransactions, new Transaction3(null, receiver, this.reward)
    ];

    //Chú ý là chỗ này ta không thể nhận được ngay lượng tiền này trong ví, vì giao dịch chưa được tạo và chưa có Hash. Nên trong Blockchain chưa có bản ghi mới ghi nhận số tiền đã chuyển vào ví nhận tiền thưởng.
    //Để nhận được khoản tiền thưởng cho lần đào này. Thì ta phải đợi đến lần đào kế tiếp, giao dịch tạm hoãn này sẽ được khớp lệnh và lúc đó tiền thưởng mới có trong ví.
  }

  //- Đây là hàm sẽ tạo ra một giao dịch mới. Đưa giao dịch vào mảng pendingTransactions. Như vậy là một Block sẽ có thể chứa nhiều giao dịch mà đang đợi Hash để được công nhận chính thức và thêm được vào Blockchain -//
  createPendingTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  //Chúng ta cũng cần một hàm để kiểm tra được lượng tiền đang có trong một địa chỉ ví nào đó. 
  //Mỗi một ví tiền không hề có một con số tổng tiền được lưu trữ lại. Mà việc tính toán số tiền của một địa chỉ ví trong toàn bộ Blockchain ta phải lần tìm lần lượt toàn bộ các giao dịch bên trong Blockchain để kiểm đếm số tiền của một ví. Điều này sẽ rất an toàn và trung thực.
  //Một điều quan trọng là tính minh bạch ở đây vì bất kỳ ai khi có địa chỉ ví của bạn cũng sẽ nhìn thấy hết toàn bộ giao dịch bạn đã từng thực hiện trong hệ thống.
  KiemTraTienTrongVi(address) {
    let money = 0;
    for (const block of this.savedBlocks) {              //Đi duyệt qua toàn bộ các Block trong Blockchain
      for (const gd of block.data) {     //Đi duyệt qua toàn bộ các giao dịch trong Block (Vì một Block là 1 mảng các giao dịch)
        if (gd.senderAddress === address) {           //Nếu địa chỉ gửi là ví tiền này, thì tức là phải trừ ở Ví đi số tiền tương ứng trong giao dịch
          money -= gd.money;
        }

        if (gd.receiverAddress === address) {          //Nếu địa chỉ nhận là ví tiền này, thì tức là phải cộng vào Ví số tiền tương ứng trong giao dịch
          money += gd.money;
        }
      }
    }
    return money;                                //Kiểm đếm xong ta sẽ được con số tổng.
  }
}

const myCoin3 = new Blockchain3(); //Tạo mới một Blockchain để chứa các giao dịch.

myCoin3.createPendingTransaction(new Transaction3(
  "Dia Chi Vi Tien Ong A",
  "Dia Chi Vi Tien Ba B",
  350
));
myCoin3.createPendingTransaction(new Transaction3(
  "Dia Chi Vi Tien Ba B",
  "Dia Chi Vi Tien Ong C",
  200
));

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