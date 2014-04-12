module.exports = function(grunt) {
  'use strict';

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-gh-pages');
  grunt.loadNpmTasks('grunt-open');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      all: {
        expand: true,
        cwd: 'src/',
        src: ['*.js'],
        dest: 'dest/assets/js/'
      }
    },
    connect: {
      dest: {
        options: {
          hostname: '0.0.0.0',
          port: 5455,
          base: 'dest/',
          livereload: true
        }
      }
    },
    open: {
      dest: {
        path: 'http://localhost:5455'
      }
    },
    'gh-pages': {
      options: {
        base: 'dest',
      },
      src: ['**']
    },
    watch: {
      all: {
        options: {
          livereload: true,
          hostname: 'localhost',
          port: 5455
        },
        files: ['src/*.js'],
        tasks: ['build'],
      }
    }
  });

  grunt.registerTask('build', ['copy']);
  grunt.registerTask('server', ['connect', 'open']);

  // Deploy gh-pages
  grunt.registerTask('deploy', [
    'build',
    'gh-pages'
  ]);
  // Main task
  grunt.registerTask('default', [
    'build', 'server', 'watch'
  ]);
};
