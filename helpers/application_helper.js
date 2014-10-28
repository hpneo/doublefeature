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