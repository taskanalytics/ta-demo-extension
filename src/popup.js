
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
  chrome.storage.sync.get({taId: '', taActive: false}, function(items) {
    document.getElementById('taId').value = items.taId;
    if(items.taActive) {
      document.getElementById('on').checked = true;
    }else {
      document.getElementById('off').checked = true;
    }
  });
}

function toggle_powerstate(state) {
  if(state === 'on') {
    console.log('--enabling ta demo');
    chrome.storage.sync.set({taActive: true});
  }else {
    console.log('--disabling ta demo');
    chrome.storage.sync.set({taActive: false});
  }
}

function bind_events() {
  document.getElementById('update').addEventListener('click', save_options);
  document.getElementById('on').addEventListener('click', function() { toggle_powerstate('on'); });
  document.getElementById('off').addEventListener('click', function() { toggle_powerstate('off'); });
}

document.addEventListener('DOMContentLoaded', function() {
  bind_events();
  restore_options();
});
