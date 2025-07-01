const { contextBridge, desktopCapturer } = require('electron');
const { Peer } = require('peerjs');

contextBridge.exposeInMainWorld('agentAPI', {
  createPeer: (agentId, peerServerConfig) => {
    const peer = new Peer(agentId, peerServerConfig);

    peer.on('open', (id) => {
      console.log('Agent peer ID:', id);
    });

    peer.on('call', async (call) => {
      const sources = await desktopCapturer.getSources({ types: ['screen'] });
      const sourceId = sources[0].id;

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: sourceId
          }
        }
      });

      call.answer(stream);
    });

    return peer;
  }
});
