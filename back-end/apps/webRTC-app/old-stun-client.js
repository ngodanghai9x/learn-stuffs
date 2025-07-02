// stun-client.js
const stun = require('node-stun');

const STUN_SERVER = { address: 'stun.l.google.com', port: 19302 };

// Khởi tạo STUN client
const client = stun.createClient();

client.setServerAddr(STUN_SERVER.address, STUN_SERVER.port);

// Gửi request STUN
client.start((result) => {
  if (result === stun.STUN_BINDING_RESPONSE) {
    const mappedAddr = client.getMappedAddr();

    console.log('🛰️ STUN Binding Response:');
    console.log(`Public IP: ${mappedAddr.address}`);
    console.log(`Public Port: ${mappedAddr.port}`);
  } else {
    console.error('❌ Failed to get STUN response');
  }

  client.close();
});
