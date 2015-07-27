var WebSocket = require('ws');
var fs = require('fs');
var filename = "./files/record"+Date.now()+".csv"
var wroteHeader = false
// var writer = null
// csvWriter({ headers: [
//   'theta',
//    'std',
//    'delta',
//    'c3',
//    'beta',
//    'e3',
//    'e1',
//    'normType',
//    'e2',
//    'gamma',
//    'c1',
//    'sigma',
//    'c2',
//    'alpha',
//    'h1',
//    'activity',
//    'h2',
//    'currentSong'
// ]})

require('../config/conf.js')

var ws = new WebSocket(conf.neurosteer_ws, {
  protocolVersion: 8,
  origin: 'http://websocket.org'
});

ws.on('open', function open() {
  console.log('connected');
});

ws.on('close', function close() {
  console.log('disconnected');
});

ws.on('error', function close() {
  console.log('socket error');
  //todo reconnect
});

ws.on('message', function message(data, flags) {
  var jsonData = eval( "(" + data + ")" ); // convert to JSON

  if (!wroteHeader){
    console.log(filename)
    fs.appendFile(filename, Object.keys(jsonData.features))
    fs.appendFile(filename, ",current song\n")
    wroteHeader = true
  }

  var line = ''
  for(i in jsonData.features){
    line += jsonData.features[i] + ",";
  }
  line += currentSong

  fs.appendFile(filename, line+"\n")
  console.log(jsonData.features.h1 + "  " + currentSong)
});

process.once('SIGINT', function() {
});
