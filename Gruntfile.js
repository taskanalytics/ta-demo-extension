module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mocha: {
      all: {
        src: ['tests/testrunner.html']
      },
      options: {
        run: true
      }
    },
    crx: {
      myPublicExtension: {
        src: "src/**/*",
        dest: "dist/myPublicExtension.zip",
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-crx');
  grunt.loadNpmTasks('grunt-webpack');

  // Default task(s).
  grunt.registerTask('default', ['mocha']);
  grunt.registerTask('dist', ['mocha', 'crx'])
};
