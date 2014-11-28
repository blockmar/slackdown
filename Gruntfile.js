module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        mangle: true
      },
      dist: {
        files: {
          'dist/slackdown.min.js': [
              'src/slackdown.js'
          ]
        }
      }
    },
	watch: {
      script: {
        files: [ 'src/**/*.js' ],
	    tasks: [ 'uglify:dist' ]
	  }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify:dist']);
	
};