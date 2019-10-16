var data = 'P3B';
var conId = '';

// Convert string to ArrayBuffer
var convertStringToArrayBuffer = function (data) {
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
    conId = connectionInfo.connectionId;
    console.log('conId', conId);
    // chrome.serial.send(connectionInfo.connectionId, convertStringToArrayBuffer(data), function () {})
    // console.log('successfully sent' + data + ' to portsArray[0]');
  }
}

// Find Available Ports
var onGetDevices = function (ports) {
  var portsArray = [];
  for (var i = 0; i < ports.length; i++) {
    portsArray.push(ports[i].path);
  }
  console.log('detected ports: ', portsArray);
  if (portsArray) {
    chrome.serial.connect(portsArray[0], {
      bitrate: 115200
    }, onConnect);
  }
}

// Connect COM Port
chrome.serial.getDevices(onGetDevices);

chrome.runtime.onConnectExternal.addListener(function (externalPort) {
  externalPort.onMessage.addListener(function (msg) {
    if (msg.type == 'from extension' && msg.type) {
      console.log(msg.data);
      chrome.serial.send(conId, convertStringToArrayBuffer(msg.data), function() {})
    }
  });
});