function loadSpecificStyles(platform) {
  var platformDirectory;

  if (platform === 'darwin') {
    platformDirectory = 'mac';
  }
  else if (platform === 'win32') {
    platformDirectory = 'windows';
  }

  loadStyle('/assets/stylesheets/' + platformDirectory + '/toolbar.css');
}

function loadStyle(path) {
  var newStyleSheet = document.createElement('link');
  newStyleSheet.setAttribute('rel', 'stylesheet');
  newStyleSheet.setAttribute('type', 'text/css');
  newStyleSheet.setAttribute('href', path);

  document.head.appendChild(newStyleSheet);
}

function showModal(path, options) {
  options.position = 'center';
  options.resizable = false;
  options.toolbar = true;

  var gui = require('nw.gui');
  var newModal = gui.Window.open('app://doublefeature_development/' + path + '.html', options);

  newModal.on('document-start', function() {
    newModal.window.options = options.options;
  });

  newModal.on('document-end', function() {
    newModal.focus();
    newModal.setAlwaysOnTop(true);
  });

  newModal.on('blur', function() {
    // newModal.focus();
  });

  newModal.on('closed', function() {
    global.window = gui.Window.get().window;
    global.window.document.body.classList.remove('disabled');

    var openFileInput = document.querySelector('#open_file');
    openFileInput.value = '';

    if (options.onClose) {
      options.onClose();
    }
  });

  return newModal;
}

function populateForm(fields) {
  Object.keys(fields).forEach(function(field) {
    var value = fields[field],
        input = document.getElementById(field);

    if (input.tagName === 'IMG') {
      input.src = value;
    }
    else {
      input.value = value;
    }
  });
}