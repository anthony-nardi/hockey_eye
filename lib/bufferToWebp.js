function BufferToWebp (canvasElement, width, height) {
  this.canvas    = canvasElement || window.document.createElement('canvas');
  this.ctx       = this.canvas.getContext('2d');
  this.webpArray = [];
  
  this.canvas.width  = width  || 1920;
  this.canvas.height = height || 1080;
  this.encodedFirstFrame = false;
  window.c = this.canvas;
}

/**
 * [encode turns uint8ClampedArray into webp base64 dataUrl]
 * @param  [uint8ClampedArray]
 */
BufferToWebp.prototype.encode = function (buffer) {
  
  var imagedata = this.ctx.createImageData(this.canvas.width, this.canvas.height);

  for (var i = 0; i < buffer.length; i += 1) {

    imagedata.data.set(buffer[i].buffer);

    this.ctx.putImageData(imagedata, 0, 0);

    this.webpArray.push(this.canvas.toDataURL('image/webp'));
    
  }

  window.webpImage = this.webpArray[0];

  return this.webpArray;

}

module.exports = BufferToWebp;