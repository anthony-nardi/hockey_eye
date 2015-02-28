var Whammy = require('./whammy');

function WebpToWebm (webpArray, fps) {
	this.fps       = fps || 24;
	this.webpArray = webpArray;
	this.encoder   = new Whammy.Video(this.fps);
}

WebpToWebm.prototype.encode = function () {

	for (var i = 0; i < this.webpArray.length; i += 1) {

		this.encoder.add(this.webpArray[i]);
	
	}

	return this.encoder.compile(); 
}

module.exports = WebpToWebm;