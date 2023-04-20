'use strict';
var gulp = require('gulp'),
	del = require('del'),
	watch = require('gulp-watch'),
	less = require('gulp-less'),
	autoprefixer = require('gulp-autoprefixer'),
	uglify = require('gulp-uglify-es').default,
	sourcemaps = require('gulp-sourcemaps'),
	rigger = require('gulp-rigger'),
	cssMin = require('gulp-minify-css'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	inject = require('gulp-inject'),
	plumber = require('gulp-plumber'),
	babel = require("gulp-babel"),
	reload = browserSync.reload;

var path = {
	inject: {
		html: 'public/**/*.html',
		jsCommon: 'public/scripts/common/*.js',
		jsPage: 'public/scripts/page/*.js',
		jsAssets: 'public/scripts/assets/*.js'
	},
	build: {
		html: 'public/',
		htmlIndex: 'public/index.html',
		jsCommon: 'public/scripts/common/',
		jsPage: 'public/scripts/page/',
		jsAssets: 'public/scripts/assets/',
		style: 'public/styles/',
		images: 'public/images',
		fonts: 'public/fonts'
	},
	src: {
		html: 'src/pages/*.html',
		styleCommon: ['src/styles/common/*.less', 'src/styles/components/*.less'],
		stylePage: 'src/styles/pages/*.less',
		jsCommon: ['src/scripts/*.js', 'src/scripts/common/*.js', 'node_modules/scrollmagic/scrollmagic/minified/*js'],
		jsPage: ['src/scripts/pages/*.js'],
		jsAssets: ['src/scripts/assets/*.js'],
		fonts: 'src/fonts/**/*.*',
		images: 'src/images/**/*.*'
	},
	watch: {
		html: 'src/**/*.html',
		style: 'src/**/*.less',
		js: 'src/**/*.js',
		fonts: 'src/fonts/**/*.*',
		images: 'src/images/**/*.*'
	},
	clean: './public'
};

//Прод
var pathProd = {
	inject: {
		html: 'public-prod/**/*.html',
		jsCommon: 'public-prod/scripts/common/*.js',
		jsPage: 'public-prod/scripts/page/*.js',
		jsAssets: 'public-prod/scripts/assets/*.js'
	},
	build: {
		html: 'public-prod/',
		htmlIndex: 'public-prod/index.html',
		jsCommon: 'public-prod/scripts/common/',
		jsPage: 'public-prod/scripts/page/',
		jsAssets: 'public-prod/scripts/assets/',
		style: 'public-prod/styles/',
		images: 'public-prod/images',
		fonts: 'public-prod/fonts'
	},
	src: {
		html: 'src/pages/*.html',
		styleCommon: ['src/styles/common/*.less', 'src/styles/components/*.less'],
		stylePage: 'src/styles/pages/*.less',
		jsCommon: ['src/scripts/*.js', 'src/scripts/common/*.js', 'node_modules/scrollmagic/scrollmagic/minified/*js'],
		jsPage: ['src/scripts/pages/*.js'],
		jsAssets: ['src/scripts/assets/*.js'],
		fonts: 'src/fonts/**/*.*',
		images: 'src/images/**/*.*'
	},
	clean: './public-prod'
};

var config = {
	server: {
		baseDir: "./public"
	},
	tunnel: false,
	host: 'localhost',
	port: 1313,
	logPrefix: "Frontend"
};

//Прод
var configProd = {
	server: {
		baseDir: "./public-prod"
	},
	tunnel: false,
	host: 'localhost',
	port: 1314,
	logPrefix: "Frontend"
};

gulp.task('clean:build', function (cb) {
	return del([path.clean], cb);
})

//Прод
gulp.task('clean-prod:build', function (cb) {
	return del([pathProd.clean], cb);
})

gulp.task('style-common:build', function () {
	return gulp.src(path.src.styleCommon)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(autoprefixer({
			browsers: ['last 5 versions'],
			cascade: false
		}))
		.pipe(cssMin())
		.pipe(concat('common.min.css'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.style))
		.pipe(reload({
			stream: true
		}));
});

//Прод
gulp.task('style-common-prod:build', function () {
	return gulp.src(pathProd.src.styleCommon)
		.pipe(plumber())
		.pipe(less())
		.pipe(autoprefixer({
			browsers: ['last 5 versions'],
			cascade: false
		}))
		.pipe(cssMin())
		.pipe(concat('common.min.css'))
		.pipe(gulp.dest(pathProd.build.style))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('style-page:build', function () {
	return gulp.src(path.src.stylePage)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(autoprefixer({
			browsers: ['last 5 versions'],
			cascade: false
		}))
		.pipe(cssMin())
		.pipe(rename(function (path) {
			path.basename += '-styles';
		}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.style))
		.pipe(reload({
			stream: true
		}));
});

//Прод
gulp.task('style-page-prod:build', function () {
	return gulp.src(pathProd.src.stylePage)
		.pipe(plumber())
		.pipe(less())
		.pipe(autoprefixer({
			browsers: ['last 5 versions'],
			cascade: false
		}))
		.pipe(cssMin())
		.pipe(rename(function (pathProd) {
			pathProd.basename += '-styles';
		}))
		.pipe(gulp.dest(pathProd.build.style))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('js-common:build', function () {
	return gulp.src(path.src.jsCommon)
		.pipe(plumber())
		.pipe(rigger())
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(uglify())
		.pipe(concat('common.min.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.jsCommon))
		.pipe(reload({
			stream: true
		}));
})

//Прод
gulp.task('js-common-prod:build', function () {
	return gulp.src(pathProd.src.jsCommon)
		.pipe(plumber())
		.pipe(rigger())
		.pipe(babel())
		.pipe(uglify())
		.pipe(concat('common.min.js'))
		.pipe(gulp.dest(pathProd.build.jsCommon))
		.pipe(reload({
			stream: true
		}));
})

gulp.task('js-page:build', function () {
	return gulp.src(path.src.jsPage)
		.pipe(plumber())
		.pipe(rigger())
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.jsPage))
		.pipe(reload({
			stream: true
		}));
})

gulp.task('js-assets:build', function () {
	return gulp.src(path.src.jsAssets)
		.pipe(plumber())
		.pipe(rigger())
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.build.jsAssets))
		.pipe(reload({
			stream: true
		}));
})

//Прод
gulp.task('js-page-prod:build', function () {
	return gulp.src(pathProd.src.jsPage)
		.pipe(plumber())
		.pipe(rigger())
		.pipe(babel())
		.pipe(uglify())
		.pipe(gulp.dest(pathProd.build.jsPage))
		.pipe(reload({
			stream: true
		}));
})

gulp.task('js-assets-prod:build', function () {
	return gulp.src(pathProd.src.jsAssets)
		.pipe(plumber())
		.pipe(rigger())
		.pipe(uglify())
		.pipe(gulp.dest(pathProd.build.jsAssets))
		.pipe(reload({
			stream: true
		}));
})

gulp.task('images:build', function () {
	return gulp.src(path.src.images)
		.pipe(plumber())
		.pipe(gulp.dest(path.build.images))
		.pipe(reload({
			stream: true
		}));
});


//Прод
gulp.task('images-prod:build', function () {
	return gulp.src(pathProd.src.images)
		.pipe(plumber())
		.pipe(gulp.dest(pathProd.build.images))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('fonts:build', function () {
	return gulp.src(path.src.fonts)
		.pipe(plumber())
		.pipe(gulp.dest(path.build.fonts))
		.pipe(reload({
			stream: true
		}));
});

//Прод
gulp.task('fonts-prod:build', function () {
	return gulp.src(pathProd.src.fonts)
		.pipe(plumber())
		.pipe(gulp.dest(pathProd.build.fonts))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('html:build', ['js-common:build', 'js-page:build', 'fonts:build', 'images:build'], function () {
	return gulp.src(path.src.html)
		.pipe(plumber())
		.pipe(rigger())
		.pipe(gulp.dest(path.build.html))
		.pipe(reload({
			stream: true
		}));
});

//Прод
gulp.task('html-prod:build', ['js-common-prod:build', 'js-page-prod:build', 'fonts-prod:build', 'images-prod:build'], function () {
	return gulp.src(pathProd.src.html)
		.pipe(plumber())
		.pipe(rigger())
		.pipe(gulp.dest(pathProd.build.html))
		.pipe(reload({
			stream: true
		}));
});

gulp.task('inject-common:build', ['html:build'], function () {
	return gulp.src(path.inject.html)
		.pipe(inject(gulp.src(path.inject.jsCommon, {
			read: false
		}), {
			relative: true
		}))
		.pipe(gulp.dest(path.build.html));
})

//Прод
gulp.task('inject-common-prod:build', ['html-prod:build'], function () {
	return gulp.src(pathProd.inject.html)
		.pipe(inject(gulp.src(pathProd.inject.jsCommon, {
			read: false
		}), {
			relative: true
		}))
		.pipe(gulp.dest(pathProd.build.html));
})

gulp.task('inject-page:build', ['inject-common:build'], function () {
	return gulp.src(path.inject.html)
		.pipe(inject(gulp.src('public/scripts/page/history.js', {
			read: false
		}), {
			starttag: '<!-- inject:history:js -->',
			relative: true
		}))
		.pipe(inject(gulp.src('public/scripts/page/index.js', {
			read: false
		}), {
			starttag: '<!-- inject:index:js -->',
			relative: true
		})).pipe(inject(gulp.src('public/scripts/page/index.js', {
			read: false
		}), {
			starttag: '<!-- inject:index:js -->',
			relative: true
		}))
		.pipe(inject(gulp.src('public/scripts/page/news.js', {
			read: false
		}), {
			starttag: '<!-- inject:news:js -->',
			relative: true
		}))
		.pipe(inject(gulp.src('public/scripts/page/products.js', {
			read: false
		}), {
			starttag: '<!-- inject:products:js -->',
			relative: true
		}))
		.pipe(inject(gulp.src('public/scripts/page/project-detail.js', {
			read: false
		}), {
			starttag: '<!-- inject:project-detail:js -->',
			relative: true
		}))
		.pipe(inject(gulp.src('public/scripts/page/projects.js', {
			read: false
		}), {
			starttag: '<!-- inject:projects:js -->',
			relative: true
		}))
		.pipe(inject(gulp.src('public/scripts/page/about.js', {
			read: false
		}), {
			starttag: '<!-- inject:about:js -->',
			relative: true
		}))
		.pipe(inject(gulp.src('public/scripts/page/search.js', {
			read: false
		}), {
			starttag: '<!-- inject:search:js -->',
			relative: true
		}))
		.pipe(inject(gulp.src('public/scripts/page/partnership.js', {
			read: false
		}), {
			starttag: '<!-- inject:partnership:js -->',
			relative: true
		}))


		.pipe(inject(gulp.src('public/scripts/assets/jquery-3.3.1.min.js', {
			read: false
		}), {
			starttag: '<!-- inject:jquery:js -->',
			relative: true
		}))
		.pipe(inject(gulp.src('public/scripts/assets/jquery.nice-select.min.js', {
			read: false
		}), {
			starttag: '<!-- inject:nice-select:js -->',
			relative: true
		}))
		.pipe(inject(gulp.src('public/scripts/assets/slick.min.js', {
			read: false
		}), {
			starttag: '<!-- inject:slick-slider:js -->',
			relative: true
		}))
		.pipe(inject(gulp.src('public/scripts/assets/ofi.min.js', {
			read: false
		}), {
			starttag: '<!-- inject:object-fit-images:js -->',
			relative: true
		}))
		.pipe(inject(gulp.src('public/scripts/assets/ScrollMagic.min.js', {
			read: false
		}), {
			starttag: '<!-- inject:scroll-magic:js -->',
			relative: true
		}))
		.pipe(inject(gulp.src('public/scripts/assets/jquery.sticky-kit.min.js', {
			read: false
		}), {
			starttag: '<!-- inject:sticky-kit:js -->',
			relative: true
		}))
		.pipe(inject(gulp.src('public/scripts/assets/particles.min.js', {
			read: false
		}), {
			starttag: '<!-- inject:particles:js -->',
			relative: true
		}))
		.pipe(inject(gulp.src('public/scripts/assets/particles.js', {
			read: false
		}), {
			starttag: '<!-- inject:particles-config:js -->',
			relative: true
		}))
		.pipe(gulp.dest(path.build.html));
})

//Прод
gulp.task('inject-page-prod:build', ['inject-common-prod:build'], function () {
	return gulp.src(pathProd.inject.html)
		.pipe(inject(gulp.src('public-prod/scripts/page/history.js', {
			read: false
		}), {
			starttag: '<!-- inject:history:js -->',
			relative: true
		}))
		.pipe(inject(gulp.src('public-prod/scripts/page/index.js', {
			read: false
		}), {
			starttag: '<!-- inject:index:js -->',
			relative: true
		})).pipe(inject(gulp.src('public-prod/scripts/page/index.js', {
			read: false
		}), {
			starttag: '<!-- inject:index:js -->',
			relative: true
		}))
		.pipe(inject(gulp.src('public-prod/scripts/page/news.js', {
			read: false
		}), {
			starttag: '<!-- inject:news:js -->',
			relative: true
		}))
		.pipe(inject(gulp.src('public-prod/scripts/page/products.js', {
			read: false
		}), {
			starttag: '<!-- inject:products:js -->',
			relative: true
		}))
		.pipe(inject(gulp.src('public-prod/scripts/page/project-detail.js', {
			read: false
		}), {
			starttag: '<!-- inject:project-detail:js -->',
			relative: true
		}))
		.pipe(inject(gulp.src('public-prod/scripts/page/projects.js', {
			read: false
		}), {
			starttag: '<!-- inject:projects:js -->',
			relative: true
		}))
		.pipe(inject(gulp.src('public-prod/scripts/page/about.js', {
			read: false
		}), {
			starttag: '<!-- inject:about:js -->',
			relative: true
		}))
		.pipe(inject(gulp.src('public-prod/scripts/page/search.js', {
			read: false
		}), {
			starttag: '<!-- inject:search:js -->',
			relative: true
		}))
		.pipe(inject(gulp.src('public-prod/scripts/page/partnership.js', {
			read: false
		}), {
			starttag: '<!-- inject:partnership:js -->',
			relative: true
		}))

		.pipe(inject(gulp.src('public-prod/scripts/assets/jquery-3.3.1.min.js', {
			read: false
		}), {
			starttag: '<!-- inject:jquery:js -->',
			relative: true
		}))
		.pipe(inject(gulp.src('public-prod/scripts/assets/jquery.nice-select.min.js', {
			read: false
		}), {
			starttag: '<!-- inject:nice-select:js -->',
			relative: true
		}))
		.pipe(inject(gulp.src('public-prod/scripts/assets/ofi.min.js', {
			read: false
		}), {
			starttag: '<!-- inject:object-fit-images:js -->',
			relative: true
		}))
		.pipe(inject(gulp.src('public-prod/scripts/assets/ScrollMagic.min.js', {
			read: false
		}), {
			starttag: '<!-- inject:scroll-magic:js -->',
			relative: true
		}))
		.pipe(inject(gulp.src('public-prod/scripts/assets/slick.min.js', {
			read: false
		}), {
			starttag: '<!-- inject:slick-slider:js -->',
			relative: true
		}))
		.pipe(inject(gulp.src('public-prod/scripts/assets/jquery.sticky-kit.min.js', {
			read: false
		}), {
			starttag: '<!-- inject:sticky-kit:js -->',
			relative: true
		}))
		.pipe(inject(gulp.src('public-prod/scripts/assets/particles.min.js', {
			read: false
		}), {
			starttag: '<!-- inject:particles:js -->',
			relative: true
		}))
		.pipe(inject(gulp.src('public-prod/scripts/assets/particles.js', {
			read: false
		}), {
			starttag: '<!-- inject:particles-config:js -->',
			relative: true
		}))
		.pipe(gulp.dest(pathProd.build.html));
})

gulp.task('webserver', ['inject-common:build', 'inject-page:build'], function () {
	return browserSync(config)
});

//Прод
gulp.task('webserver-prod', ['inject-common-prod:build', 'inject-page-prod:build'], function () {
	return browserSync(configProd)
});

gulp.task('watch', ['inject-common:build', 'inject-page:build'], function () {
	watch([path.watch.style], function (event, cb) {
		gulp.start('style-common:build');
		gulp.start('style-page:build');
	});
	watch([path.watch.js], function (event, cb) {
		gulp.start('js-common:build');
		gulp.start('js-page:build');
	});
	watch([path.watch.html], function (event, cb) {
		gulp.start('html:build');
		gulp.start('inject-common:build')
	});
	// watch([path.watch.images], function (event, cb) {
	// 	gulp.start('images:build');
	// });
	watch([path.watch.fonts], function (event, cb) {
		gulp.start('fonts:build');
	});
});

// Версия разработки - gulp dev
// Версия прода - gulp prod
gulp.task('dev', [
	'style-common:build',
	'style-page:build',
	'images:build',
	'fonts:build',
	'js-common:build',
	'js-page:build',
	'js-assets:build',
	'html:build',
	'inject-common:build',
	'inject-page:build',
	'webserver', 'watch'
]);


gulp.task('prod', [
	'style-common-prod:build',
	'style-page-prod:build',
	'images-prod:build',
	'fonts-prod:build',
	'js-common-prod:build',
	'js-page-prod:build',
	'js-assets-prod:build',
	'html-prod:build',
	'inject-common-prod:build',
	'inject-page-prod:build',
	'webserver-prod'
]);