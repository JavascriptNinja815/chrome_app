var portsArray = [];

var onConnect = function (connectionInfo) {
  console.log(connectionInfo.connectionId);
  chrome.serial.send(connectionInfo.connectionId, 'P3B', function () {})
}

// Find Available Ports
var onGetDevices = function (ports) {
  for (var i = 0; i < ports.length; i++) {
    portsArray.push(ports[i].path);
  }
  console.log(portsArray[0]);
  if (portsArray) {
    chrome.serial.connect('COM1', {
      bitrate: 115200
    }, onConnect);
  }
}

// Connect COM Port
chrome.serial.getDevices(onGetDevices);


// Send Data To Specific Port
// var data = 'P3B';
// chrome.serial.send(connectionId, data, callback);

// const DEVICE_PATH = 'COM1';
// var data = 'P3B';



// var connection = new SerialConnection();

// connection.onConnect.addListener(function() {
//   log('connected to: ' + DEVICE_PATH);
//   connection.send(data);
// });
// connection.connect(DEVICE_PATH);