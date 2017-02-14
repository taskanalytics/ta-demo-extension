var fs = require('fs');
var sinon = require('sinon');
var chrome = require('sinon-chrome');
var assert = require('chai').assert;
var jsdom = require('jsdom');

describe('Tests for Chrome Extension Background Page', function() {

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

  it('should attach the listener on startup', function() {
    sinon.assert.calledOnce(chrome.runtime.onMessage.addListener);
  });

  describe('the listener', function() {
    it('should respond to getTAID request appropriately', function() {
      var eventPage = require('../src/eventPage');
      var sendResponse = sinon.spy();

      var result = eventPage.listener({command: 'getTAID'}, {}, sendResponse);
      assert.isTrue(result);
      sinon.assert.calledOnce(chrome.storage.sync.get);
      sinon.assert.calledOnce(sendResponse);
      assert(sendResponse.calledWith({taId: 123456}));

    });
  });


});
