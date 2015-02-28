
/**
 * [VideoPlayer description]
 * @param {DOM <video> element}
 * @param {video data (getUserMedia or webm)}
 */
function VideoPlayer(videoElement, stream) {
	this.videoElement = videoElement;
	this.stream       = stream;
}

/**
 * [play plays the video]
 */
VideoPlayer.prototype.play = function () {
	this.videoElement.src 		      = window.URL.createObjectURL(this.stream);
	this.videoElement.style.display = 'block';
};

module.exports = VideoPlayer;