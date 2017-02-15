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
    watch: {
      scripts: {
        files: ['src/**'],
        tasks: ['copy']
      }
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            flatten: true,
            src: [
              'src/**',
              'node_modules/bootstrap/dist/js/*.min.js',
              'node_modules/bootstrap/dist/css/*.min.css',
              'node_modules/jquery/dist/jquery.min.js'
            ],
            dest: 'build/', filter: 'isFile'},
        ],
      },
    },
    clean: ['build/', 'dist/'],
    crx: {
      myPublicExtension: {
        src: ['build/**'],
        dest: 'dist/myPublicExtension.zip',
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-crx');
  grunt.loadNpmTasks('grunt-mocha-cli');

  grunt.registerTask('default', ['test']);
  grunt.registerTask('test', ['mochacli']);
  grunt.registerTask('dist', ['mochacli', 'clean', 'copy', 'crx']);
};
