function VideoToBuffer (videoElement, canvasElement) {
  this.canvas         = canvasElement;
  console.log(this.canvas);
  this.ctx            = this.canvas.getContext('2d');
	this.recordedFrames = []; // Array of uint8ClampedArrays
  this.videoElement   = videoElement;
  this.width          = this.videoElement.videoWidth;
  this.height         = this.videoElement.videoHeight;
  this.canvas.height  = this.height;
  this.canvas.width   = this.width;
}

VideoToBuffer.prototype.recordFrame = function () {
  this.ctx.drawImage(this.videoElement, 0, 0, this.width, this.height);
  this.recordedFrames.push(this.ctx.getImageData( 0, 0, this.width, this.height));
}

module.exports = VideoToBuffer;