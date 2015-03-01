console.log('New nwjs instance started.');

var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var bufferToWebp = require('./lib/bufferToWebp');
var webpToWebm   = require('./lib/webpToWebm');

var framesReceived = 0;
var frameBuffer    = [];

var firstFrameTimestamp;

app.listen(8765);

function handler (req, res) {

}

io.on('connection', function (socket) {

  
  socket.on('recordFrame', function (data) {
    if (!firstFrameTimestamp) {
      firstFrameTimestamp = Date.now();
    }
    framesReceived++;
    frameBuffer.push(data);
    console.log('GOT FRAME!');
    socket.emit('recordFrameSuccess')
  });

  socket.on('stopRecording', function () {

    console.log(framesReceived + ' frames received.');
    console.log(frameBuffer[0]);
    console.log((Date.now() - firstFrameTimestamp) / 1000);
    
    var webpBuffer  = new bufferToWebp();
    var webpEncodedBuffer = webpBuffer.encode(frameBuffer)
    var webmBuffer  = new webpToWebm(webpBuffer.encode(frameBuffer)); 

    var webmVideo = webmBuffer.encode();

    window.webmVideo = webmVideo;

    console.log('VIDEO GENERATED.');

    window.webkitStorageInfo.requestQuota(PERSISTENT, webmVideo.size, function (grantedBytes) {
  
      window.webkitRequestFileSystem(window.PERSISTENT, webmVideo.size, function (fileSys) {
        
        console.log('success');
        
        window.fileSys = fileSys;
        
        fileSys.root.getFile('log.txt', {create: true, exclusive: false}, function(fileEntry) {
          window.fileEntry = fileEntry;
          // fileEntry.isFile === true
          // fileEntry.name == 'log.txt'
          // fileEntry.fullPath == '/log.txt'

        }, function (e) {console.log(e)});

      }, function () {
        console.log('ERROR FUCK');
      });
      
    }, function (e) {
      console.log('Error', e);
    });



  })

});

