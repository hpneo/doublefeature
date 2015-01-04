var Backbone = require('backbone'),
    React = require('react');

var $ = Backbone.$ = require('jquery');

var TreeViewComponent = React.createClass({
  render: function() {
    var dlOptions = {
      className: this.props.className,
      id: this.props.id
    };

    var createTreeViewItem = function(object) {
      return React.createElement('dd', { 'data-id': object.id }, object.name);
    };

    var dlItems = [React.createElement('dt', null, this.props.title), React.createElement('dd', null, this.props.allText)];

    dlItems = dlItems.concat(this.props.items.map(createTreeViewItem));

    return React.createElement('dl', dlOptions, dlItems);
  }
});

var TreeView = Backbone.View.extend({
  events: {
    'dragover dl': 'handleDragOver',
    'dragleave dl': 'handleDragLeave',
    'drop dl': 'handleDrop'
  },
  initialize: function(options) {
    this.renderOptions = options.renderOptions;

    this.setElement($(options.el, window.document)[0]);
  },
  setCollection: function(collection) {
    this.collection = collection;

    if (this.reactElement === null) {
      this.render();
    }

    this.reactElement.setProps({ items: collection });
  },
  handleDragOver: function(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }

    if (e.target.dataset.id) {
      e.target.classList.add('selected');
      e.originalEvent.dataTransfer.dropEffect = 'copy';
    }

    return false;
  },
  handleDragLeave: function(e) {
    e.target.classList.remove('selected');
  },
  handleDrop: function(e) {
    if (e.stopPropagation) {
      e.stopPropagation();
    }

    if (e.target.dataset.id) {
      if (this.renderOptions.onDrop) {
        this.renderOptions.onDrop.call(this, e);
      }
    }
  },
  render: function() {
    this.renderOptions.items = this.collection;

    var treeViewComponent = React.createElement(TreeViewComponent, this.renderOptions),
        element = React.render(treeViewComponent, this.el);

    this.reactElement = element;

    return this;
  }
});

module.exports = TreeView;