const socket = io.connect(window.location.origin);

function _(ref) {
  return document.querySelector(ref);
}

socket.on('date', data => {
  _('#date').textContent = data;
})

socket.on('time', data => {
 _('#time').value = data;
}); 

function stopClock() {
    socket.emit('stop-clock');
}
