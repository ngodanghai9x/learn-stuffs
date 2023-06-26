// var CryptoJS = require("crypto-js");
var SHA256 = require("crypto-js/sha256");


class Block1 {
  constructor(data = '', prevHash = '') {
    this.prevHash = prevHash;
    this.data = data;
    this.createdDate = new Date();
    this.hash = getHash();
  }

  getHash() {
    return SHA256(this.prevHash + this.createdDate + JSON.stringify(this.data)).toString();
  }
}

class Blockchain1 {
  constructor() {
    //Tạo ra một mảng rỗng để chứa các Block. 
    this.blocks = [];
    this.savedBlocks = [];
    //Genesis Block, hay chính là "phần tử khởi tạo". Các phần tử tiếp theo sẽ nối tiếp vào phần tử này.
    const genesisBlock = new Block1('First block');
    this.blocks.push(genesisBlock);
    this.savedBlocks.push(genesisBlock);
  }

  getLastBlock() {
    return this.blocks[this.blocks.length - 1];
  }

  appendBlockToChain(newBlock) {
    newBlock.prevHash = this.getLastBlock().hash;
    newBlock.hash = newBlock.getHash();
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

const myCoin1 = new Blockchain1(); //Tạo mới một Blockchain để chứa các giao dịch. Ở đây ta có thể coi là lịch sử giao dịch của đồng tiền myCoin1.
myCoin1.appendBlockToChain(new Block1({
  senderAddress: "Ong A",
  receiverAddress: "Ba B",
  money: 350
}));
myCoin1.appendBlockToChain(new Block1({
  senderAddress: "Ba B",
  receiverAddress: "Ong C",
  money: 200
})); 

/* 
Chỉ đơn giản như vậy là ta đã tạo thành công một công nghệ Blockchain. Để có thể giao dịch được thì file example1.html này của chúng ta phải được copy đến các máy cá nhân của người dùng trong mạng. Và giá trị MangBlock phải là cố định và được sync (đồng bộ) bằng mạng ngang hàng P2P để mỗi khi có giao dịch mới ở máy một người, toàn bộ những người khác sẽ Validate (kiểm tra lại tính toàn vẹn những gì được thêm vào) và tiếp tục giao dịch tiếp. Công nghệ Blockchain sơ khai này mới đáp ứng được một số yêu cầu đơn giản của Blockchain:

Dữ liệu nằm phân tán.
Dữ liệu và mã nguồn được minh bạch. Người dùng sẽ dễ dàng kiểm tra tính toàn vẹn.
Một khi dữ liệu đã thêm vào hệ thống thì không thể xóa hoặc sửa được nữa. Nếu mất đi một phần tử thì chuỗi của chúng ta không toàn vẹn. Điều này đảm bảo tính minh bạch của toàn hệ thống, không ai có thể tác động vào hệ thống và mọi người đều nhìn thấy rõ dữ liệu một khi đã thêm vào thành công.
Tuy nhiên công nghệ Blockchain vừa tạo vẫn còn một số sơ hở:

Người dùng dễ dàng thêm hàng trăm ngàn giao dịch vào hệ thống mỗi giây. Dẫn đến hệ thống bị SPAM và toàn giao dịch rác. Blockchain dài nhất cũng sẽ được coi là đúng nhất do đó khả năng sai lệch hệ thống.
Hacker dễ dàng clone (copy) toàn bộ biến MangBlock rồi sửa một bản ghi, rồi ghi đè toàn bộ MangBlock fake đó vào hệ thống của hắn. Tiếp theo MangBlock đó sẽ được tính toán lại Hash cho thành chuỗi mới và đồng bộ tự động, và ghi đè vào máy của những người còn lại. Dẫn đến sự "tèo" của hệ thống chúng ta khổ công gây dựng.
Để nâng cấp hệ thống vừa xây dựng, chúng ta cần tìm hiểu đến một công nghệ cao siêu hơn. Đó chính là các công nghệ "đào" tiền ảo, hay còn gọi là Mining. Mời các bạn theo dõi tiếp ở phần 2.
*/