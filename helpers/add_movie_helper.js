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
}

function setPoster(selector, url) {
  var poster = document.querySelector(selector);

  poster.src = url;
}