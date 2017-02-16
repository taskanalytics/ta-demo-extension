
var listener = function(request, sender, sendResponse) {
  if (request.command == 'getTAID') {
    //console.log('[TA] Handling getTAID request...');
    chrome.storage.sync.get({taId: '', taActive: false}, function(result) {
      //console.log('[TA] Looked up taId: ' + result.taId);
      sendResponse({taId: result.taId, taActive: result.taActive});
    });

    return true;
  }
}

chrome.runtime.onMessage.addListener(listener);

try {
  exports.listener = listener
}catch(ReferenceError) {
  // running in browser, i bet!
}
