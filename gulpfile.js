var $        = require('gulp-load-plugins')();
var argv     = require('yargs').argv;
var browser  = require('browser-sync');
var gulp     = require('gulp');
var panini   = require('panini');
var rimraf   = require('rimraf');
var sequence = require('run-sequence');
var rename   = require('gulp-rename');
var sitemap  = require('gulp-sitemap');

// Check for --production flag
var isProduction = false;

// Port to use for the development server.
var PORT = 8000;

// Browsers to target when prefixing CSS.
var COMPATIBILITY = ['last 2 versions', 'ie >= 9'];

// File paths to various assets are defined here.
var PATHS = {
  assets: [
    'src/assets/**/*',
    'src/assets/data',
    'src/assets/scss/components/foundation-icons/**',
    '!src/assets/{!img,js,scss}/**/*'
  ],
  cname: [
    'src/data'
  ],
  sass: [
    'bower_components/foundation-sites/scss',
    'bower_components/motion-ui/src/'
  ],
  vendors: [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/jquery-zoom/jquery.zoom.js',
    'bower_components/what-input/what-input.js',
    'bower_components/foundation-sites/dist/foundation.js'

  ],
  javascript: [
    'src/assets/js/app.js'
  ]
};

// Delete the "dist" folder
// This happens every time a build starts
gulp.task('clean', function(done) {
  rimraf('dist', done);
});

// Copy files out of the assets folder
// This task skips over the "img", "js", and "scss" folders, which are parsed separately
gulp.task('copy', function() {
  gulp.src(PATHS.assets).pipe(gulp.dest('dist/assets'));
  gulp.src('src/data/CNAME').pipe(gulp.dest('dist'));
  //gulp.src('src/data/sitemap.xml').pipe(gulp.dest('dist'));
  gulp.src('src/data/robots.txt').pipe(gulp.dest('dist'));
  gulp.src('bower_components/jquery/dist/jquery.min.map').pipe(gulp.dest('dist/assets/js'));
});

// Copy page templates into finished HTML files
gulp.task('pages', function() {
  gulp.src('src/pages/**/*.{html,hbs,handlebars}')
    .pipe(panini({
      root: 'src/pages/',
      layouts: 'src/layouts/',
      partials: 'src/partials/',
      data: 'src/data/',
      helpers: 'src/helpers/'
    }))
    .pipe(gulp.dest('dist'));

  gulp.src('src/pages/**/*.{html,hbs,handlebars}')
    .pipe(sitemap({
      siteUrl: 'http://www.digitaliserad.nu'
    }))
    .pipe(gulp.dest('dist'));
    
});

gulp.task('pages:reset', function(cb) {
  panini.refresh();
  gulp.start('pages');
  cb();
});


// Compile Sass into CSS
// In production, the CSS is compressed
gulp.task('sass', function() {
  var uncss = $.if(isProduction, $.uncss({
    html: ['src/**/*.html'],
    ignore: [
      new RegExp('^meta\..*'),
      new RegExp('^\.is-.*')
    ]
  }));

  var minifycss = $.if(isProduction, $.minifyCss());

  return gulp.src('src/assets/scss/app.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: PATHS.sass
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: COMPATIBILITY
    }))
    .pipe(uncss)
    .pipe(minifycss)
    .pipe($.if(!isProduction, $.sourcemaps.write()))
    .pipe(gulp.dest('dist/assets/css'));
});

// Combine JavaScript into two files
// In production, the file is minified
gulp.task('vendors', function() {
  return gulp.src(PATHS.vendors)
    .pipe($.concat('vendors.js'))
    .pipe(gulp.dest('dist/assets/js'));
});

gulp.task('javascript', function() {
  var uglify = $.if(isProduction, $.uglify()
    .on('error', function (e) {
      console.log(e);
    }));

  return gulp.src(PATHS.javascript)
    .pipe($.sourcemaps.init())
    .pipe(uglify)
    .pipe($.if(!isProduction, $.sourcemaps.write()))
    .pipe(gulp.dest('dist/assets/js'));
});

// Copy images to the "dist" folder
// In production, the images are compressed
gulp.task('images', function() {
  var imagemin = $.if(isProduction, $.imagemin({
    progressive: true
  }));

  return gulp.src('src/assets/img/**/*')
    .pipe(imagemin)
    .pipe(gulp.dest('dist/assets/img'));
});


// Build the "dist" folder by running all of the above tasks
gulp.task('build', function(done) {
  sequence('clean', ['pages', 'sass', 'vendors', 'javascript', 'images', 'copy'], done);

});

// Start a server with LiveReload to preview the site in
gulp.task('server', ['build'], function() {
  browser.init({
    server: 'dist', 
    port: PORT

  });
});



// Build the site, run the server, and watch for file changes
gulp.task('default', ['build', 'server'], function() {
  gulp.watch(PATHS.assets, ['copy', browser.reload]);
  gulp.watch(['src/pages/**/*.html'], ['pages', browser.reload]);
  gulp.watch(['src/{layouts,partials}/**/*.html'], ['pages:reset', browser.reload]);
  gulp.watch(['src/assets/scss/**/*.scss'], ['sass', browser.reload]);
  gulp.watch(['src/assets/js/**/*.js'], ['vendors', browser.reload]);
  gulp.watch(['src/assets/js/**/*.js'], ['javascript', browser.reload]);
  gulp.watch(['src/assets/img/**/*'], ['images', browser.reload]);
});
