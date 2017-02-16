/*
  Tests for the js that runs in the background in Chrome
*/
describe('The Chrome background page', function() {

  var window;

  before(function() {
    global.chrome = chrome;
  });

  beforeEach(function(done) {
    jsdom.env({
      // generated background page
      html: '<html></html>',
      // js source
      src: [fs.readFileSync('src/eventPage.js', 'utf-8')],
      created: function(errors, wnd) {
        // attach `chrome` to window
        wnd.chrome = chrome;
        wnd.console = console;

        chrome.storage.sync.get.withArgs({taId: ''}).yields({taId: 123456});
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

  it('attaches the listener on startup', function() {
    sinon.assert.calledOnce(chrome.runtime.onMessage.addListener);
  });

  describe('has a listener that', function() {
    it('responds to getTAID request appropriately', function() {
      var eventPage = require('../src/eventPage');
      var sendResponse = sinon.spy();

      var result = eventPage.listener({command: 'getTAID'}, {}, sendResponse);
      assert.isTrue(result);
      sinon.assert.calledOnce(chrome.storage.sync.get);
      sinon.assert.calledOnce(sendResponse);
      assert(sendResponse.calledWith({taId: 123456, taActive: true}));

    });
  });


});
