'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringToArrayBuffer = stringToArrayBuffer;
exports.arrayBufferToString = arrayBufferToString;
function stringToArrayBuffer(str) {
  var strLen = str.length;
  var buf = new ArrayBuffer(strLen * 2); // 2 bytes for each char
  var bufView = new Uint8Array(buf);
  for (var i = 0; i < strLen; i += 1) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

function arrayBufferToString(arrayBuffer) {
  var uint8Array = new Uint8Array(arrayBuffer);
  var length = uint8Array.length;
  if (length > 65535) {
    var results = [];
    var start = 0;
    do {
      var subArray = uint8Array.subarray(start, start += 65535);
      results.push(String.fromCharCode.apply(String, subArray));
    } while (start < length);

    return decodeURIComponent(escape(results.join('')));
  }
  return decodeURIComponent(escape(String.fromCharCode.apply(String, uint8Array)));
}