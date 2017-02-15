/*
  Tests for the popup widget that appears on the Chrome toolbar.
*/
describe('The popup widget', function() {

  var window;

  before(function() {
    global.chrome = chrome;
  });

  beforeEach(function(done) {
    jsdom.env({
      html: fs.readFileSync('src/popup.html', 'utf-8'),
      features : {
        FetchExternalResources : ['script'],
        ProcessExternalResources : ['script'],
        SkipExternalResources: false
      },
      scripts: ['src/popup.js'],
      created: function(errors, wnd) {
        // attach `chrome` to window
        wnd.chrome = chrome;
        wnd.console = console;

        chrome.storage.sync.get.withArgs({taId: '', taActive: false}).yields({taId: 123456, taActive: true});
      },
      done: function(errors, wnd) {
        if (errors) {
          console.log(errors);
          done(true);
        } else {
          window = wnd;
          done();
        }
      }
    });
  });

  afterEach(function() {
    chrome.reset();
    window.close();
  });

  it('mentions Task Analytics', function() {
    assert.include(window.document.body.textContent, 'Task Analytics');
  });

  it('has a text input and button that set the TA ID', function() {
    var input = window.document.getElementById('taId');
    var button = window.document.getElementById('update');

    assert.isNotNull(input);
    assert.isNotNull(button);
  });

  describe('has a power toggle', function() {
    it('for on and off', function() {
      var on = window.document.getElementById('on');
      var off = window.document.getElementById('off');

      assert.isNotNull(on);
      assert.isNotNull(off);

    });

    it('defaults to off', function() {
      var on = window.document.getElementById('on');
      var off = window.document.getElementById('off');

      assert.isFalse(on.checked);
      assert.isTrue(off.checked);
    });

    it('updates a global power state', function() {
      window.bind_events();

      var on = window.document.getElementById('on');
      on.click();
      sinon.assert.calledOnce(chrome.storage.sync.set);
      chrome.storage.sync.set.calledWith({taActive: true});

      chrome.storage.sync.set.reset();

      var off = window.document.getElementById('off');
      off.click();
      sinon.assert.calledOnce(chrome.storage.sync.set);
      chrome.storage.sync.set.calledWith({taActive: false});

    });
  });

  describe('and its javascript', function() {
    it('saves settings to chrome storage', function() {
      window.document.getElementById('taId').value = 'schwifty';
      window.save_options();

      sinon.assert.calledOnce(chrome.storage.sync.set);
      chrome.storage.sync.set.calledWith({taId: 'schwifty'});
    });

    it('retrieves settings from chrome storage', function() {
      window.restore_options();
      sinon.assert.calledOnce(chrome.storage.sync.get);
      assert.include(window.document.getElementById('taId').value, '123456');
    });
  });

});
