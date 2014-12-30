global.document = window.document;
global.navigator = window.navigator;
global.UI = global.UI || {};

function hideSidebar() {
  document.querySelector('#sidebar').classList.add('hidden');
  document.querySelector('#library_container').classList.add('full');
}

function showSidebar() {
  document.querySelector('#sidebar').classList.remove('hidden');
  document.querySelector('#library_container').classList.remove('full');
}

function populateGenresList(genres) {
  var TreeView = require('./app/views/components/tree_view.js');
  var treeView = new TreeView({
    el: '#sidebar_genres_container',
    collection: genres,
    renderOptions: {
      title: 'Genres',
      allText: 'All',
      className: 'genres with_icon',
      id: 'sidebar_genres'
    }
  });

  treeView.render();
}

function populateListsList(lists) {
  var TreeView = require('./app/views/components/tree_view.js');
  var treeView = new TreeView({
    el: '#sidebar_lists_container',
    collection: lists,
    renderOptions: {
      title: 'Lists',
      allText: 'All',
      className: 'lists with_icon',
      id: 'sidebar_lists'
    }
  });

  treeView.render();
}

function populateMoviesList(movies) {
  var ListView = require('./app/views/components/list_view.js');
  var listView = new ListView({
    el: '#library_container',
    collection: movies,
    renderOptions: {
      className: 'listview',
      id: 'library',
      fields: {
        id: 'id',
        image: function() {
          return this.posters['w185'];
        },
        text: 'title'
      }
    }
  });

  listView.on('collection_changed', function() {
    document.querySelector('#movies_count').textContent = this.collection.length + ' ' + (this.collection.length === 1 ? 'movie' : 'movies');
  });

  listView.render();

  global.UI.moviesList = listView;
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
        afterClose: Application.loadMovies
      });
    }
  });
  
  document.querySelector('#add').addEventListener('click', function(e) {
    openFileInput.click();
  });
}

function loadMoviesByGenre(genreId) {
  var MovieGenre = require('./app/models/movie_genre'),
      Movie = require('./app/models/movie'),
      setCollection = global.UI.moviesList.setCollection.bind(global.UI.moviesList),
      promise;

  if (genreId) {
    promise = MovieGenre.where({ genre_id: genreId }).load().then(function(records) {
      var movieIds = records.map(function(record) { return record.movie_id });

      return Movie.where({ id: movieIds }).load();
    })
  }
  else {
    promise = Movie.all();
  }

  promise.then(setCollection).catch(console.log.bind(console));
}

function initializeMainSidebarEvents() {
  document.querySelector('#sidebar').addEventListener('click', function(e) {
    var target = e.target,
        targetParent = target.parentElement;

    if (target.tagName === 'DD') {
      if (targetParent.id === 'sidebar_genres') {
        loadMoviesByGenre(e.target.dataset.id);
      }
    }
  });

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