chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.command == 'getTAID') {
      console.log('Handling getTAID request...');
      chrome.storage.sync.get({taId: ''}, function(result) {
        console.log('Looked up taId: ' + result.taId);
        sendResponse({taId: result.taId});
      });
      return true;
    }
  });
