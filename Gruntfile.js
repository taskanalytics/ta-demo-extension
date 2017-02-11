module.exports = function(grunt) {
  
  grunt.initConfig({
    crx: {
      myPublicExtension: {
        src: "src/**/*",
        dest: "dist/myPublicExtension.zip",
      }

      
      //mySignedExtension: {
      //  src: "src/**/*",
      //  dest: "dist/myPrivateExtension.crx",
      //  options: {
      //    privateKey: "~/myPrivateExtensionKey.pem"
      //  }
      //}

    }
  });

  grunt.loadNpmTasks('grunt-crx');
  grunt.loadNpmTasks('grunt-webpack');

  // Default task(s).
  grunt.registerTask('default', ['crx']);
};
