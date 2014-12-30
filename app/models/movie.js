var Canguro = require('canguro'),
    MovieDB = require('moviedb')('fdf3c94669f3cc0906fddc99e5cd8208'),
    TMDBMixin = require('../../mixins/tmdb_mixin');

var Movie = Canguro.defineModel('Movie', function() {
  this.hasMany('movie_genres', { model: require('./movie_genre') });
});

Movie.configuration = JSON.parse(global.window.localStorage.getItem('tmdb_configuration'));

function clearFileName(fileName) {
  var fileNameParts = fileName.split('.');
  fileNameParts.pop();
  
  fileName = fileNameParts.join('.');
  fileName = fileName.replace(/\.|-|\(|\)|\[|\]/g, ' ').trim();

  // LEGO.Batman.The.Movie.DC.Superheroes.Unite.2013.720p.BDRip.LATiNO.SPA.ENG.x264.AC3.DTS
  // Justice.League.War.2014.720p.BDRip.LATiNO.ENG.XviD.AC3.avi
  // Gravity.2013.720p.BDRip.LATiNO.ENG.XviD.AC3.avi
  // Evangelion Shin Gekijouban Q (BDrip 1280x544 x264 AAC)-ank.mp4
  // Captain America The Winter Soldier [2014]-480p-BRrip-x264-StyLishSaLH (StyLish Release).mp4

  var bannedWords = [
    '1080p',
    '720p',
    '480p',
    'x264',
    'BluRay',
    'BDRip',
    'BDrip',
    'BRRip',
    'BRrip',
    'XviD',
    'LATiNO',
    'SPA',
    'ENG',
    'AC3',
    'AAC',
    'DTS',
    'YIFY',
    'RARBG',
    'ank',
    'StyLishSaLH',
    'StyLish Release'
  ];

  bannedWords.forEach(function(bannedWord) {
    fileName = fileName.replace(bannedWord, '');
  });

  for (var year = (new Date().getFullYear()); year >= 1888; year--) {
    if (fileName.replace(year, '').trim() !== '') {
      fileName = fileName.replace(year, '').trim();
    }
  }

  return fileName.trim();
}

Movie.loadFromFile = function(file) {
  var fileName = clearFileName(file.name),
      fileSize = file.size,
      fileType = file.type;

  var getFirstResult = function(data) {
        console.log(data);
        return data.results[0];
      },
      getFullInfo = function(data) {
        return TMDBMixin.find(data.id);
      },
      appendFilePath = function(data) {
        data.file_path = file.path;
        data.tmdb_id = data.id;
        data.id = undefined;
        data.year = (data.release_date || '').split('-').shift();
        data.director = data.credits.crew.find(function(crewMember) { return crewMember.job === 'Director' });
        data.director = (data.director || {}).name;

        return data;
      };

  return TMDBMixin.search(fileName).then(getFirstResult).then(getFullInfo).then(appendFilePath);
};

Movie.prototype.get = function(prop) {
  return this[prop];
};

Movie.defineProperty('backdrops', function() {
  if (!this._backdrops) {
    this._backdrops = {};

    var configurationImages = Movie.configuration.images,
        self = this;

    Movie.configuration.images.backdrop_sizes.forEach(function(backdrop_size) {
      self._backdrops[backdrop_size] = configurationImages.base_url + backdrop_size + self.backdrop_path;
    });
  }

  return this._backdrops;
});

Movie.defineProperty('posters', function() {
  if (!this._posters) {
    this._posters = {};

    var configurationImages = Movie.configuration.images,
        self = this;

    Movie.configuration.images.poster_sizes.forEach(function(poster_size) {
      self._posters[poster_size] = configurationImages.base_url + poster_size + self.poster_path;
    });
  }

  return this._posters;
});

// Movie.searchFromTMDB = searchFromTMDB;
// Movie.findFromTMDB = findFromTMDB;
Movie.clearFileName = clearFileName;

module.exports = Movie;