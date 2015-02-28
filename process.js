console.log('New nwjs instance started.');

var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

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
  	buf = frameBuffer[0];
  })

});