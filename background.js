var portsArray = [];
var data = 'P3B';

// Convert string to ArrayBuffer
var convertStringToArrayBuffer = function(data) {
  var buf = new ArrayBuffer(data.length);
  var bufView = new Uint8Array(buf);
  for (var i = 0; i < data.length; i++) {
    bufView[i] = data.charCodeAt(i);
  }
  return buf;
}

var onConnect = function (connectionInfo) {
  if (!connectionInfo) {
    throw 'Connection Failed'
  } else if (connectionInfo.connectionId < 0) {
    throw 'Invalid Connection'
  } else {
    chrome.serial.send(connectionInfo.connectionId, convertStringToArrayBuffer(data), function () {})
  }
}

// Find Available Ports
var onGetDevices = function (ports) {
  for (var i = 0; i < ports.length; i++) {
    portsArray.push(ports[i].path);
  }
  console.log(portsArray[0]);
  if (portsArray) {
    chrome.serial.connect(portsArray[0], {
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