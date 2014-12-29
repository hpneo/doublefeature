var Application = (function() {
  function initializeMain() {
    document.body.addEventListener('click', function(e) {
      if (document.body.classList.contains('disabled')) {
        e.preventDefault();
        e.stopPropagation();

        return false;
      }
    }, true);
  }

  function initializeAddMovie() {
    global.window = window;
    
    var gui = require('nw.gui'),
        win = gui.Window.get();

    win.focus();

    var Movie = require('./app/models/movie'),
        Genre = require('./app/models/genre'),
        ModelForm = require('./app/views/ui/model_form');;

    var genres = document.querySelector('#movie_genres');

    Genre.all().then(populateGenresList);

    Movie.loadFromFile(window.options.files[0]).then(function(data) {
      var movie = new Movie(data),
          modelForm = new ModelForm({
            el: '.add_movie_wrapper',
            modelName: 'movie',
            model: movie
          });

      selectGenres(data.genres, genres, 'data-tmdb_id');
      setBackdrop('#backdrop', movie.backdrops['w780']);
      setPoster('#movie_poster', movie.posters['w500']);

      modelForm.render();
    }).catch(console.log.bind(console));
  }

  return {
    initialize: function() {
      initializeMain();
      initializeMainToolbarEvents();
      initializeMainSidebarEvents();
    },
    initializeAddMovie: initializeAddMovie
  }
})();