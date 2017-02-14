module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jasmine: {
      src: 'src/**/*.js',
      options: {
        specs: ['tests/**/*.js']
      }
    },
    crx: {
      myPublicExtension: {
        src: "src/**/*",
        dest: "dist/myPublicExtension.zip",
      }
    }
  });

  grunt.loadNpmTasks('grunt-crx');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Default task(s).
  grunt.registerTask('test', ['jasmine']);

  grunt.registerTask('default', ['test']);
  grunt.registerTask('dist', ['test', 'crx'])
};
