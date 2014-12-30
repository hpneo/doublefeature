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
  render: function() {
    this.renderOptions.items = this.collection;

    var treeViewComponent = React.createElement(TreeViewComponent, this.renderOptions),
        element = React.render(treeViewComponent, this.el);

    this.reactElement = element;

    return this;
  }
});

module.exports = TreeView;