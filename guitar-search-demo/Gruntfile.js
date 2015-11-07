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
			  'public/libs/angular-animate/*.js',
              'public/libs/jquery/*.js',
              'public/libs/underscore/*.js',
              'public/libs/bootstrap/*.js',
              'public/libs/angular-bootstrap/*.js',
              'public/js/**/*.js',
              'config/*.js'
		],	 
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
      },
      less: {
          // production config is also available
          development: {
              options: {
                  // Specifies directories to scan for @import directives when parsing. 
                  // Default value is the directory of the source, which is probably what you want.
                  paths: ["public/css/"],
              },
              files: {
                  // compilation.css  :  source.less
                  "public/css/style.css": "public/css/styles.css"
              }
          },
      },
    },
    //qunit: {
//      files: ['public/**/*.html']
  //  },
    jshint: {
	  files: ['Gruntfile.js', 'public/js/**/*.js','config/*.js', 'app/*.js'],
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
				'tests/**/*.js',
				'config/*.js' ,
				'public/libs/angular-bootstrap/ui-bootstrap.js'
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
  // grunt.loadNpmTasks('karma-jasmine');
      
 // grunt.registerTask('test', ['jshint']);//, 'qunit']);

  grunt.registerTask('default', ['jshint', 'karma', 'concat', 'uglify']);

};