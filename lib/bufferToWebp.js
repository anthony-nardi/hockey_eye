function BufferToWebp (canvasElement, width, height) {
  this.canvas    = canvasElement;
  this.ctx       = this.canvas.getContext('2d');
  this.webpArray = [];
  
  this.canvas.width  = width;
  this.canvas.height = height;
}

/**
 * [encode turns uint8ClampedArray into webp base64 dataUrl]
 * @param  [uint8ClampedArray]
 */
BufferToWebp.prototype.encode = function (buffer) {
  
  for (var i = 0; i < buffer.length; i += 1) {

    this.ctx.putImageData(buffer[i], 0, 0);
    this.webpArray.push(this.canvas.toDataURL('image/webp'));
    
  }

  return this.webpArray;

}

module.exports = BufferToWebp;