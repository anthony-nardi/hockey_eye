(function () {



  // Init application
  document.addEventListener("DOMContentLoaded", init);

  var videoPlayer   = require('./lib/videoPlayer'),    // Plays video
      videoToBuffer = require('./lib/videoToBuffer'),  // Sends video

      // Always default to maximum resolution.  Seems like browsers are limited at 1920x1080 -- 2/21/15
      // http://stackoverflow.com/questions/27420581/get-maximum-video-resolution-with-getusermedia
      MEDIA_SETTINGS = {
        'video': {
          'optional': [
              {'minWidth': 640},
              {'minWidth': 1024},
              {'minWidth': 1280},
              {'minWidth': 1920}, // 1080p is highest browsers can go (2/27)
              {'minWidth': 2560},
            ]
        },
        'audio': false
      },

      useRequestAnimationFrame = false,

      requestFrameFn = useRequestAnimationFrame ? 
                       window.requestAnimationFrame :
                       function (fn) {
                         return setTimeout(fn, 28);
                       },
      cancelFrameFn  = useRequestAnimationFrame ? 
                       window.cancelAnimationFrame  :
                       function (fn) {
                         clearTimeout(fn);
                       },
      webcamPlayer,
      
      isRecording = false,

      recorder,
      requestFrameFnId, 

      firstFrameSent = false,

      
      videoElement,
      recordButton;


  function init () {
    
    videoElement = document.getElementById('video');
    
    recordButton = document.getElementById('record');
    
    recordButton.addEventListener('click', toggleRecordCam);
    

    // API for webcam and microphone
    navigator.webkitGetUserMedia(
      MEDIA_SETTINGS, 
      captureMedia,       // success
      onGetUserMediaError // failure
    );  

  }

  // webcam playback
  function captureMedia (stream) {
    
    webcamPlayer = new videoPlayer(videoElement, stream);
    
    webcamPlayer.play();

  }

  function onGetUserMediaError (err) {
    console.err(err);
  }

  /**
   * [toggleRecordCam every time we want to save frame, send frame to another process.
   * 
   *  Does the following in this thread:
   *     
   *     ctx.putImageData  (Fast)
   *     ctx.getImageData  (Fast)
   *     socket.emit       (Not the fast, but good enough)  3x slower than recording...
   *     
   * ]
   * @return {[type]} [description]
   */
  function toggleRecordCam () {
    
    if (!isRecording) {

      var c = document.createElement('canvas');
      c.width = 1920;
      c.height = 1080;

      var ctx = c.getContext('2d');

      ctx.drawImage(document.getElementById('video'), 0, 0, c.width, c.height);


      var data = ctx.getImageData(0, 0, c.width, c.height);

      window.data = data;
      
      console.log(data);

      var pb     = require('./lib/src/build/Release/printBuffer');



      window.data2 = pb.uint8ToRgba(data.data.buffer);

      // startRecording();
    
    } else {
      
      stopRecording();
    }


  }

  function startRecording () {
    
    console.log('Recording started.');
      
    console.time('recording');

    isRecording = true;
    
    recorder = new videoToBuffer(document.getElementById('video'), document.createElement('canvas'), require('nw.gui'));

    function recordFrame () {

      recorder.recordFrame(); // Push single frame to uint8ClampedArray buffer

      requestFrameFnId = requestFrameFn(recordFrame);
    
    }

    requestFrameFnId = requestFrameFn(recordFrame);

  }

  function stopRecording () {
    
    console.log('Recording Stopped.');
    console.timeEnd('recording');
    isRecording = false;
    cancelFrameFn(requestFrameFnId);

  }


}());
