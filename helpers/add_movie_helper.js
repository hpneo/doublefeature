function populateGenresList(genres) {
  var genresList = '';

  genres.forEach(function(genre) {
    genresList += '<option data-tmdb_id="' + Number(genre.tmdb_id) + '" value="' + genre.id + '">' + genre.name + '</option>';
  });

  document.querySelector('#movie_genres').innerHTML = genresList;
}

function selectGenres(genres, select, attribute) {
  var selectedOptionsSelector = genres.map(function(genre) {
        return 'option[' + attribute + '="' + genre.id + '"]';
      }).join(','),
      selectedOptions = select.querySelectorAll(selectedOptionsSelector);

  for (var i = 0; i < selectedOptions.length; i++) {
    var selectedOption = selectedOptions[i];
    selectedOptions[i].selected = true;
  }
}

function setBackdrop(selector, url) {
  var backdrop = document.querySelector(selector);

  backdrop.style.background = 'url("' + url + '") no-repeat top center';
  backdrop.style.backgroundSize = '100% auto';
  backdrop.classList.remove('loading_image');
}

function setPoster(selector, url) {
  var poster = document.querySelector(selector);

  poster.src = url;
}

function setView(data) {
  var Movie = require('./app/models/movie'),
      Genre = require('./app/models/genre'),
      MovieGenre = require('./app/models/movie_genre'),
      ModelForm = require('./app/views/components/model_form');

  var genres = document.querySelector('#movie_genres');
  
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
}