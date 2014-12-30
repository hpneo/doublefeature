global.document = window.document;
global.navigator = window.navigator;

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
    el: '#sidebar',
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

  listView.render();
  document.querySelector('#movies_count').textContent = movies.length + ' movie(s)';

  console.log(listView);
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