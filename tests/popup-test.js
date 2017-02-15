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
      created: function(errors, wnd) {
        // attach `chrome` to window
        wnd.chrome = chrome;
        wnd.console = console;

        chrome.storage.sync.get.withArgs({taId: ''}).yields({taId: 123456});
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

  it('should be tested!', function() {
    assert.isNotNull(window);
  });
});
