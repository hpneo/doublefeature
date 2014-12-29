function hideSidebar() {
  document.querySelector('#sidebar').classList.add('hidden');
  document.querySelector('#library').classList.add('full');
}

function showSidebar() {
  document.querySelector('#sidebar').classList.remove('hidden');
  document.querySelector('#library').classList.remove('full');
}

function populateGenresList(genres) {
  var genresList = '<dt>Genres</dt>';
  genresList += '<dd class="selected">All</dd>';

  genres.forEach(function(genre) {
    genresList += '<dd id="#genre_' + genre.id + '" data-id="' + genre.id + '">' + genre.name + '</dd>';
  });

  document.querySelector('#sidebar_genres').innerHTML = genresList;
}

function populateMoviesList(movies) {
  var moviesList = '';

  movies.forEach(function(movie) {
    moviesList += '<div class="listview_item">';
    moviesList += '<img src="' + movie.posters['w185'] + '" class="poster">';
    moviesList += '<span>' + movie.title + '</span>';
    moviesList += '</div>';
  });

  document.querySelector('#movies_count').textContent = movies.length + ' movie(s)';

  document.querySelector('#library').innerHTML = moviesList;
}

function initializeMainToolbarEvents() {
  var openFileInput = document.querySelector('#open_file');
  
  openFileInput.addEventListener('change', function(e) {
    if (e.target.files.length > 0) {
      document.body.classList.add('disabled');

      showModal('add_movie', {
        width: 500,
        height: 545,
        options: {
          files: e.target.files
        },
        onClose: Application.loadMovies
      });
    }
  });
  
  document.querySelector('#add').addEventListener('click', function(e) {
    openFileInput.click();
  });
}

function initializeMainSidebarEvents() {
  document.querySelector('#toggle_sidebar').addEventListener('click', function() {
    if (this.classList.contains('active')) {
      hideSidebar();
    }
    else {
      showSidebar();
    }

    this.classList.toggle('active');
  });

  document.querySelector('#settings').addEventListener('click', function() {
    showModal('settings', { width: 500, height: 400 });
  });
}