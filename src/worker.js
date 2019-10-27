(function(global) {
  // Hook-up worker input
  global.onmessage = function(e) {
    global.postMessage('Hello world');
  };
})(this);
