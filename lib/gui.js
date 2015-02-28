console.log('bammm!');

document.addEventListener('DOMContentLoaded', function () {
	
	var gui = require('nw.gui');
	var win = gui.Window.get();
  var devWin;
  var panelElement = document.getElementById('panel');
  var panelElement2 = document.getElementById('panel2');
  var timeSinceLastMouseMove = 0;
  var mouseMoveTimeoutId;

  Window.win = win;

  win.focus();

  function handleMouseMove () {
    
    clearTimeout(mouseMoveTimeoutId);
    
    showPanel();

    timeSinceLastMouseMove = Date.now();
        
    mouseMoveTimeoutId = setTimeout(function () {
      hidePanel();
    }, 2000);

  }

  function showPanel () {
    panelElement.style.transform = 'translate(0)';
    panelElement2.style.transform = 'translate(0)';
  }

  function hidePanel () {
    var panelBoundingRect = panelElement.getBoundingClientRect(),
        panel2BoundingRect = panelElement2.getBoundingClientRect();

    panelElement.style.transform = 'translate('+ 0 + 'px, ' + (-panelBoundingRect.bottom) + 'px)';
    panelElement2.style.transform = 'translate('+ 0 + 'px, ' + (panelBoundingRect.height) + 'px)';
  }

	document.getElementById('tools').addEventListener('click', function () {
	  
    if (!devWin) {
      win.closeDevTools();
    } else {
      devWin.closeDevTools();  
    }
    
    devWin = win.showDevTools();
    
    devWin.focus();

	});

	document.getElementById('reload').addEventListener('click', function () {
		win.reloadDev();
	});

  document.addEventListener('mousemove', handleMouseMove);

});
