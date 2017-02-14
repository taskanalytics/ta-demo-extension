module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mochacli: {
      options: {
        require: ['tests/helper'],
        reporter: 'spec'
      },
      all: ['tests/*test.js']
    },
    crx: {
      myPublicExtension: {
        src: "src/**/*",
        dest: "dist/myPublicExtension.zip",
      }
    }
  });

  grunt.loadNpmTasks('grunt-crx');
  grunt.loadNpmTasks('grunt-mocha-cli');

  grunt.registerTask('default', ['mochacli']);
  grunt.registerTask('test', ['mochacli']);
  grunt.registerTask('dist', ['mochacli', 'crx']);
};
