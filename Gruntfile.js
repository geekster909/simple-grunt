/*global module:false*/
module.exports = function(grunt) {

    require('time-grunt')(grunt);
    require('jit-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        sass: { 
            dist: {  
                options: { 
                    sourcemap: 'none',
                    style: 'expanded'
                },
                files: {  
                    'dist/style.css': 'assets/styles/{,*/}*.scss'       
                }
            }
        },
        // uglify to concat, minify, and make source maps
        uglify: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'assets/scripts/',
                    src: '*.js',
                    dest: 'dist',
                    ext: '.min.js'
                }]
            }
        },
       browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        'dist/styles/style.css',
                        'dist/scripts/*.min.js'
                    ]
                },
                options: {
                    watchTask: true,
                    proxy: 'local.wp.com',
                    port: 8080
                }
            }
        },
        watch: {
            sass: {
                files: ['assets/styles/scss/**/*.{scss,sass}'],
                tasks: ['sass']
            },
            uglify: {
                files: ['assets/scripts/**/*.js'],
                tasks: ['newer:uglify:main']
            }
        }
    });


    // Default task.
    grunt.registerTask('default', [
        'sass',
        'uglify',
        'browserSync',
        'watch'
    ]);

    grunt.registerTask('build', [
        'sass', 
        'uglify'
    ]);

};
