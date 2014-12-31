# Building Double Feature

Double Feature is built using [node-webkit](https://github.com/rogerwang/node-webkit), [Grunt](http://gruntjs.com/) and [grunt-node-webkit-builder](https://github.com/mllrsohn/grunt-node-webkit-builder).

If you want to build Double Feature for your platform, you need to create a folder for the builder, called `doublefeature_builder`, and place the [source](https://github.com/hpneo/doublefeature) inside of it (you can clone the repository, and must be named `doublefeature`).

Inside `doublefeature_builder` you need to add two files:

`Gruntfile.js`:

```javascript
module.exports = function(grunt) {
  var version = '0.11.4';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    nodewebkit: {
      options: {
        buildDir: './dist',
        forceDownload: false,
        version: version,
        credits: './doublefeature/credits.html',
        macCredits: './doublefeature/credits.html',
        platforms: ['osx32', 'osx64', 'linux32', 'linux64', 'win32', 'win64'],
        macIcns: './icon.icns',
        macPlist: './Info.plist',
        winIco: './icon.ico'
      },
      src: './doublefeature/**/*'
    }
  });

  grunt.loadNpmTasks('grunt-node-webkit-builder');
  grunt.registerTask('dist', ['nodewebkit']);
  grunt.registerTask('start', 'Start app', function() {
    var options = {
      args: ['./doublefeature']
    };

    
    var arch = (process.arch === 'x64' ? '64' : '32');

    switch(process.platform) {
      case 'linux':
        options['cmd'] = './cache/' + version + '/linux' + arch + '/nw';
      break;
      case 'darwin':
        options['cmd'] = './cache/' + version + '/osx' + arch + '/node-webkit.app/Contents/MacOS/node-webkit';
      break;
      case 'win32':
        options['cmd'] = './cache/' + version + '/win' + arch + '/nw';
      break;
    }

    grunt.util.spawn(options);
  });
};
```

`grunt-node-webkit-builder` has one task, called `nodewebkit`, which downloads the node-webkit binaries and saves them in a new folder called `cache`. This task is used in the `dist` task, which creates the executables, according the platforms described in the `platforms` option. This Gruntfile also has a `start` task, which runs Double Feature, using the previously downloaded binaries.

`package.json`:

```javascript
{
  "name": "doublefeature_builder",
  "description": "Build executables for doublefeature project",
  "devDependencies": {
    "grunt": "latest",
    "grunt-node-webkit-builder": "1.0.0"
  }
}
```

This manifest only defines the version of `grunt-node-webkit-builder`. You need to install this Node module, and the modules inside the source folder as well.

---

Optional: You need to copy the icons inside the source folder in the builder folder (`icon.hqx`, `icon.icns` and `icon.ico`). This may be fixed in the future.