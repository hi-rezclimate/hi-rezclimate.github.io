module.exports = function(grunt) {
  'use strict';
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.initConfig({
    'gh-pages': {
      options: {
        base: 'dest',
      },
      src: ['**']
    },
  });

  // Deploy gh-pages
  grunt.registerTask('deploy', [
    'gh-pages'
  ]);
};
