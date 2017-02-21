# TA Chrome Extension

This extension lets users demonstrate the look and feel of [TaskAnalytics](https://taskanalytics.com) on websites they visit in Chrome. It requires a [TaskAnalytics account](https://taskanalytics.com/book-demo/) to function.

## Developer Requirements

The project is configured to use [Grunt](https://gruntjs.com) for managing build tasks and [Mocha](https://mochajs.org/) for testing. Make sure you have Grunt-CLI installed npm:

```bash
$ npm install -g grunt-cli
```

You shouldn't need to install Mocha globally as Grunt will use its Mocha plugin to execute the test runner.

## Building the Extension

Assuming you've cloned or downloaded the project and have a shell open to the project directory, follow these steps to create a new extension package:

1. Install project dependencies using npm:
```bash
$ npm install
```

2. Build a new extension distribution:
```bash
$ grunt dist
```

3. Your new Chrome extension should be available as `./dist/myPublicExtension.zip`. You can either copy this file and unpack it somewhere or use the unpacked files in `./build/` for installing the extension locally.

4. Install the extension in Chrome by enabling [developer mode](https://developer.chrome.com/extensions/faq#faq-dev-01) in the Chrome extensions menu. (This might only work on macOS and Linux.)

5. Click the **Load Unpacked extension...** button and point it to your unzipped zip file or the `build` directory mentioned above.

6. You should now see the extension plugin visible in the toolbar as well as in the extensions list!

## Testing the Extension

If you're modifying or enhancing the underlying code, you can test the extension with the `grunt test` task.
