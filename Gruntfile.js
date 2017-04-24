//1. The wrapper function
module.exports = function(grunt) {

    //2. Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //Define all grunt task
        assemble: {
            // Task-level options
            options: {
                flatten: true,
                data: ['app/assemble/data/**/*.{json,yml}'],
                //helpers: 'assemble/helpers/*.js',
                // layouts are included in partials to allow recursive binding
                partials: ['app/assemble/partials/**/*.hbs']
            },
            site: {
                options: {
                    layoutdir: 'app/assemble/',
                    layout: 'default.hbs'
                },
                files: [{
                    expand: true,
                    cwd: 'app/assemble/pages/',
                    src: ['**/*.hbs'],
                    dest: 'WebContent'
                }]
            }
        },
        sass: {
            options: {
                sourcemap: 'none'
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'app/sass/',
                    src: ['*.scss', '**/*.scss'],
                    dest: 'WebContent/css',
                    ext: '.css'
                }]
            }
        },

        browserSync: {
            bsFiles: {
                src: ['app/assemble/**/*.hbs',
                    'app/sass/**/*.scss', 'app/js/*.js'
                ]
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: "WebContent"
                }
            }
        },

        watch: {
            options: {
                livereload: true
            },
            html: {
                files: 'app/assemble/**/*.hbs',
                tasks: ['assemble']
            },
            sass: {
                files: 'app/sass/**/*.scss',
                tasks: ['sass']
            },

            copy: {
                files: ['app/js/**/*.js', 'app/assets/images/*.*'],
                tasks: ['copy']
            }
        },

        copy: {
            main: {
                files: [
                    // includes files within path
                    {
                        expand: true,
												flatten: true,
                        src: ['app/js/*.js', 'app/vendor/bootstrap3.3.7/js/*.js'],
                        dest: 'WebContent/js/'
                    },
										{
                        expand: true,
												flatten: true,
                        src: ['app/vendor/bootstrap3.3.7/css/*.css'],
                        dest: 'WebContent/css/'
                    },
										{
                        expand: true,
												flatten: true,
                        src: ['app/assets/images/*.*'],
                        dest: 'WebContent/images/'
                    },
                ],
            },
        }

        // connect: {
        //     server: {
        //         options: {
        //             port: 9000, // The port on which the webserver will respond.
        //             hostname: '*', // Default 'localhost'. Setting this to '*' will make the server accessible through IP. Useful for cross-device testing.
        //             livereload: true,
        //             open: true,
        //             base: 'WebContent',
        //             keepalive: true
        //         }
        //     }
        // }

    });


    //3. Load grunt plugings
    grunt.loadNpmTasks('grunt-assemble');
    //grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-livereload');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    //4. Custom or Default tasks
    grunt.registerTask('default', ['assemble', 'sass', 'copy', 'browserSync', 'watch']);
};
