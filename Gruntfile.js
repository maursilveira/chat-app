module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat : {
      dist: {
        src: [
          'public/js/modules/*.js',
          'public/js/main.js'
        ],
        dest: 'public/js/build/production.js'
      }
    },

    // covert ES6 to ES5
    babel : {
      options: {
          sourceMap: true,
          presets: ['env']
      },
      dist: {
          files: {
              'public/js/build/production.es5.js': 'public/js/build/production.js'
          }
      }
    },

    uglify : {
      build: {
        src: 'public/js/build/production.es5.js',
        dest: 'public/js/build/production.min.js'
      }
    },

    sass: {
      dist: {
        options: {
          style: 'compressed',
          sourcemap: 'none',
          debugInfo : true,
          noCache: true
        },
        files : {
          'public/css/main.css' : 'sass/main.scss'
        }
      }
    },

    postcss: {
      options: {
        map: false,
        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
          require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: 'public/css/main.css'
      }
    },

    watch : {
      scripts : {
        files : ['public/js/main.js', 'public/js/modules/*.js'],
        tasks : ['concat', 'babel', 'uglify'],
        options : {
          spawn : false
        }
      },
      sass: {
        files: ['sass/*.scss'],
        tasks: ['sass','postcss'],
        options: {
            spawn: false,
        }
      }
    }
  });

  //load pluings
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-babel');

  //when loaded, run
  grunt.registerTask('default', ['concat', 'babel', 'uglify', 'sass', 'watch']);

};
