//1. The wrapper function
module.exports = function(grunt) { 

	//2. Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		//Define assemble task
		assemble: {

            // Task-level options
            options: {
                flatten: true,
                data: ['assemble/data/**/*.{json,yml}'],
                helpers: 'assemble/helpers/*.js',                
                // layouts are included in partials to allow recursive binding
                partials: ['assemble/partials/*.hbs']
            },
            site: {
                options: { layoutdir: 'assemble/layouts/site', layout: 'default.hbs' },
                files: [
                    { expand: true, cwd: 'assemble/pages/site/', src: ['**/*.hbs'], dest: 'WebContent/site/' }
                ]
            }
        },
		
		connect: {
            server: {
                options: {
                    port: 9000, // The port on which the webserver will respond.
                    hostname: '*', // Default 'localhost'. Setting this to '*' will make the server accessible through IP. Useful for cross-device testing.
                    livereload: 1338,
                    base: 'app',					
					keepalive: true
                }
            }
        },
		
		sass: {
			options: {
				sourcemap: 'none'
			},
			dist: {
				files: [
					{ expand: true, cwd: 'sass/site', src: ['*.scss', '**/*.scss'], dest: 'WebContent/site/css', ext: '.css'},
					{ expand: true, cwd: 'sass/blog', src: ['*.scss', '**/*.scss'], dest: 'WebContent/blog/css', ext: '.css'}
				]
			}
		}
		
	});
	
	
	//3. Load grunt plugings
	grunt.loadNpmTasks('grunt-assemble');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-sass');
	
	
	//4. Custom or Default tasks
	grunt.registerTask('default', ['connect']);
};