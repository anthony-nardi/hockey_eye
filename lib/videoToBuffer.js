

function VideoToBuffer (videoElement, canvasElement, gui) {

  this.videoElement   = videoElement;
  this.canvas         = canvasElement;
  this.ctx            = this.canvas.getContext('2d');
  this.recordedFrames = []; // Array of uint8ClampedArrays
  this.width          = this.videoElement.videoWidth;
  this.height         = this.videoElement.videoHeight;
  this.canvas.height  = this.height;
  this.canvas.width   = this.width;
  this.firstFrameSent = false;
  this.gui            = gui;
  this.socket;
  this.createProcessForEncoding();

}

VideoToBuffer.prototype.recordFrame = function () {

  var that = this;
  
  this.ctx.drawImage(this.videoElement, 0, 0, this.width, this.height);
  
  if (!this.firstFrameSent && this.socket) {
    
    var recordedFramesLength = this.recordedFrames.length,
        imageData = recordedFramesLength ? this.recordedFrames[0].data.buffer : this.ctx.getImageData( 0, 0, this.width, this.height).data.buffer;
    
    if (recordedFramesLength) {
      this.recordedFrames.shift();
    }

    this.firstFrameSent = true;
    
    this.firstFrameTimestamp = Date.now();
    
    this.socket.emit('recordFrame', { image:true, buffer: imageData} );              
    
    // Ready to send another frame to the process that encodes uint8Array.
    this.socket.on('recordFrameSuccess', function () {
      
      if (that.recordedFrames.length) {

        that.socket.emit('recordFrame', { image: true, buffer: that.recordedFrames[0].data.buffer });
        that.recordedFrames.shift();

      } else {

        that.socket.emit('stopRecording');
        
        console.log(((Date.now() - that.firstFrameTimestamp) / 1000) + ' is how long it took to send to the server the captured frames.');
      }

    });
  
  } else {
    
    this.recordedFrames.push(this.ctx.getImageData(0, 0, this.width, this.height));
  
  }

}    

VideoToBuffer.prototype.createProcessForEncoding = function () {

  // Eventually this could be invisible???
  var winProcess = this.gui.Window.open('process.html', {
    'new-instance': true,
    'width': 900,
    'height': 600,
    'inject-js-end': 'process.js'
  }),

  that = this;

  var script = window.document.createElement('script');

  script.src = 'http://localhost:8765/socket.io/socket.io.js';

  script.onload = function(){

    console.log('Socket library loaded.');

    that.socket = window.io('http://localhost:8765');

  };

  window.document.head.appendChild(script);
  
}

module.exports = VideoToBuffer;