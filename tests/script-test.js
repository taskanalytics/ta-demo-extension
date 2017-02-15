/*
  Tests for the script that handles injecting TA into the browser.
*/
describe('The injection script', function() {

  var window;

  before(function() {
    global.chrome = chrome;
  });

  beforeEach(function(done) {
    jsdom.env({
      // generated background page
      html: '<html></html>',
      // js source
      src: [fs.readFileSync('src/script.js', 'utf-8')],
      created: function(errors, wnd) {
        // attach `chrome` to window
        wnd.chrome = chrome;
        wnd.console = console;

        chrome.storage.sync.get.withArgs({taId: ''}).yields({taId: 'schwifty'});
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

  it('requests the TA id on start', function() {
    sinon.assert.calledOnce(chrome.runtime.sendMessage);

  });

});
