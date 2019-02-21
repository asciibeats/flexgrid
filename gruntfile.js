module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        options: {
          loadPath: 'node_modules/normalize-scss/sass',
          style: 'compact',
          sourcemap: 'none'
        },
        files: {'build/<%= pkg.name %>.css': ['src/styles/index.scss']}
      }
    },
    autoprefixer: {
      options: {
      },
      dist: {
        files: {'build/<%= pkg.name %>.css': ['build/<%= pkg.name %>.css']}
      }
    },
    cssmin: {
      dist: {
        options: {},
        files: {'dist/<%= pkg.name %>.min.css': 'build/<%= pkg.name %>.css'}
      }
    },
    htmlmin: {
      dist: {
        options: {removeComments: true, collapseWhitespace: true},
        files: [{expand: true, flatten: true, src: 'src/**/*.html', dest: 'dist/'}]
      }
    },
    watch: {
      options: {livereload: true},
      sass: {
        files: ['src/**/*.scss'],
        tasks: ['sass', 'autoprefixer', 'cssmin']
      },
      html: {
        files: ['src/**/*.html'],
        tasks: ['htmlmin']
      }
    },
    copy: {
      images: {
        files: [{expand: true, flatten: true, src: 'src/images/**/*', dest: 'dist/images/'}]
      },
    },
    clean: {
      dist: ["dist", "build", ".sass-cache"]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default', ['sass', 'autoprefixer', 'cssmin', 'htmlmin', 'copy', 'watch']);
  grunt.registerTask('pure', ['sass', 'cssmin', 'htmlmin', 'copy', 'watch']);
};
