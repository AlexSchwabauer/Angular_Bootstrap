'use strict';

var rewriteRulesSnippet = require('grunt-connect-rewrite/lib/utils').rewriteRequest;

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {      
      gruntfile: {
        files: ['Gruntfile.js']
      },
    },
    connect: {
      options: {
        port: 9000,
        hostname: 'localhost',
        base: 'app/'         
      },
      rules: [  
              // 302 Redirect
                {from: '^\/(.+)', to: '\#$1', redirect:'permanent'}
              ],
              server: {
                options: {
                  middleware: function (connect, options) {
                    return [
                    rewriteRulesSnippet, // RewriteRules support
                    connect.static(require('path').resolve(options.base)) // mount filesystem
                    // ... any other middleware
                ];
              }
            }
          } 
        } 
      });

  
  // Default task.
  grunt.registerTask('default', ['connect:server', 'watch']);




};
