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
        Genre = require('./app/models/genre'),
        MovieGenre = require('./app/models/movie_genre'),
        ModelForm = require('./app/views/components/model_form');

    var genres = document.querySelector('#movie_genres');

    Genre.all().then(populateGenresList);

    document.body.classList.add('loading');

    Movie.loadFromFile(window.options.files[0]).then(function(data) {
      var movie = new Movie(data),
          modelForm = new ModelForm({
            el: '.add_movie_wrapper',
            modelName: 'movie',
            model: movie,
            afterSave: function(view, model) {
              var ids = view.find('#movie_genres').val();

              Genre.where({ id: ids }).load().then(function(records) {
                var promises = records.map(function(genre) {
                  var movieGenre = new MovieGenre({
                    movie_id: model.id,
                    genre_id: genre.id
                  });

                  return movieGenre.save();
                });

                return Promise.all(promises);
              }).then(function() {
                win.close();
              });
            }
          });

      selectGenres(data.genres, genres, 'data-tmdb_id');
      setBackdrop('#backdrop', movie.backdrops['w780']);
      setPoster('#movie_poster', movie.posters['w500']);

      modelForm.render();

      document.body.classList.remove('loading');

      console.log(movie);
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