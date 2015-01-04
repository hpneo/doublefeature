var Backbone = require('backbone'),
    React = require('react');

var $ = Backbone.$ = require('jquery');

var ListViewComponent = React.createClass({
  render: function() {
    var sectionOptions = {
      className: this.props.className,
      id: this.props.id
    };

    var listItemFields = this.props.fields;

    var createListViewItem = function(object) {
      var id = object[listItemFields.id],
          image = object[listItemFields.image],
          text = object[listItemFields.text];

      if (typeof listItemFields.image === 'function') {
        image = listItemFields.image.call(object);
      }

      return React.createElement('div', { className: 'listview_item', 'data-id': id, draggable: true },
        React.createElement('img', { src: image, className: 'poster' }),
        React.createElement('span', null, text)
      );
    };

    var sectionItems = this.props.items.map(createListViewItem);

    return React.createElement('section', sectionOptions, sectionItems);
  }
});

var ListView = Backbone.View.extend({
  events: {
    'dragstart .listview_item': 'setDraggableData'
  },
  initialize: function(options) {
    this.renderOptions = options.renderOptions;

    this.setElement($(options.el, window.document)[0]);
  },
  getCollection: function() {
    return this.originalCollection.slice(0);
  },
  restoreCollection: function() {
    this.setCollection(this.originalCollection);
  },
  setCollection: function(collection) {
    this.collection = collection;

    if (this.reactElement === null) {
      this.render();
    }

    this.reactElement.setProps({ items: collection });
    this.trigger('collection_changed');
  },
  setDraggableData: function(e) {
    var dataTransfer = e.originalEvent.dataTransfer;
    dataTransfer.effectAllowed = 'copy';
    dataTransfer.setData('text/plain', e.target.dataset.id);
  },
  render: function() {
    this.renderOptions.items = this.collection;
    this.originalCollection = this.collection.slice(0);

    var listViewComponent = React.createElement(ListViewComponent, this.renderOptions),
        element = React.render(listViewComponent, this.el);

    this.reactElement = element;
    this.trigger('collection_changed');

    return this;
  }
});

module.exports = ListView;