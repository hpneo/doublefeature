var Application = (function() {
  function initializeMain() {
    document.body.addEventListener('click', function(e) {
      if (document.body.classList.contains('disabled')) {
        e.preventDefault();
        e.stopPropagation();

        return false;
      }
    }, true);

    var MovieDB = require('moviedb')('fdf3c94669f3cc0906fddc99e5cd8208');

    if (localStorage.getItem('tmdb_configuration')) {
      loadGenres();
      // loadLists();
      loadMovies();
    }
    else {
      MovieDB.configuration(function(error, response) {
        localStorage.setItem('tmdb_configuration', JSON.stringify(response));

        loadGenres();
        // loadLists();
        loadMovies();
      });
    }
  }

  function loadGenres() {
    var Genre = require('./app/models/genre');

    Genre.count().then(function(count) {
      if (count === 0) {
        return Genre.loadFromTMDB();
      }
      else {
        return Genre.all();
      }
    }).then(populateGenresList).catch(console.log.bind(console));
  }

  function loadLists() {
    var List = require('./app/models/list');

    List.all().then(populateListsList).catch(console.log.bind(console));
  }

  function loadMovies() {
    var Movie = require('./app/models/movie');
    
    Movie.all().then(populateMoviesList).catch(console.log.bind(console));
  }

  function initializeAddMovie() {
    global.window = window;
    
    var gui = require('nw.gui'),
        win = gui.Window.get();

    win.focus();

    var Movie = require('./app/models/movie'),
        Genre = require('./app/models/genre');

    Genre.all().then(populateGenresList);

    document.body.classList.add('loading');

    Movie.loadFromFile(window.options.files[0]).then(function(data) {
      if (data.tmdb_id) {
        setView(data);
      }
      else {
        data.name = prompt('No se encontró información del archivo agregado, indícanos el nombre de la película:');
        return Movie.loadFromName(data).then(setView);
      }
    }).catch(console.log.bind(console));
  }

  return {
    initialize: function() {
      initializeMain();
      initializeMainToolbarEvents();
      initializeMainSidebarEvents();
    },
    initializeAddMovie: initializeAddMovie,
    loadMovies: loadMovies
  }
})();