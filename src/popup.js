
// Saves options to chrome.storage
function save_options() {
  var taId = document.getElementById('taId').value;
  console.log('Saving taID: ' + taId);
  chrome.storage.sync.set({
    taId: taId,
  }, function() {
    // Update status to let user know options were saved.
    var msg = document.getElementById('msg');
    msg.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    taId: '',
  }, function(items) {
    document.getElementById('taId').value = items.taId;
  });
}

document.addEventListener('DOMContentLoaded', function() {
  restore_options();
  document.getElementById('update').addEventListener('click', save_options);
});
