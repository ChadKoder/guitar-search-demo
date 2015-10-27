module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {       	 
          src: ['public/libs/angular/*.js',
              'public/libs/angular-route/*.js',
              'public/libs/angular-resource/*.js',
              'public/libs/jquery/*.js',
              'public/libs/underscore/*.js',
              'public/libs/bootstrap/*.js',
              'public/libs/angular-bootstrap/*.js',
              'public/js/**/*.js',
              'config/*.js'
		],// 'app/*.js'],			 
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
		  bare_returns: true,
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    //qunit: {
//      files: ['public/**/*.html']
  //  },
    jshint: {
      //files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
	  files: ['Gruntfile.js', 'public/js/**/*.js','config/*.js', 'app/*.js'],//, 'public/js/controllers/*.js', 'public/js/services/*.js'],	  
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']//, 'qunit']
    },
	karma: {
		unit: {
			options: {
				colors: true,				
				frameworks: ['jasmine'],
				singleRun: true,
				browsers: ['PhantomJS'],
				files: [
				'public/libs/angular/angular.js',
				'public/libs/angular-mocks/angular-mocks.js',
				'public/libs/angular-route/angular-route.js',
				'public/libs/angular-resource/angular-resource.js',
				'public/libs/underscore/underscore.js',
				'public/js/**/*.js',
				'src/tests/**/*.js',
				'config/*.js' //'app/*.js'
				],
				plugins: [
				'karma-phantomjs-launcher',
				'karma-jasmine',
				'karma-junit-reporter'
				],
				reporters: ['dots', 'junit'],
				junitReporter: {
					outputFile: '../test-results.xml'
				}//,
				//logLevel: 'LOG_DISABLE'
			}
		}
	}
  });

  //if (grunt.option('debug')){
	// console.log(grunt.config('jshint.files'));
  //}

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat'); 
  grunt.loadNpmTasks('grunt-karma');
      
 // grunt.registerTask('test', ['jshint']);//, 'qunit']);

  grunt.registerTask('default', ['jshint', 'karma', 'concat', 'uglify']);

};