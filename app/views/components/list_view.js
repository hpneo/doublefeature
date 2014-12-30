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

      return React.createElement('div', { className: 'listview_item', 'data-id': id },
        React.createElement('img', { src: image, className: 'poster' }),
        React.createElement('span', null, text)
      );
    };

    var sectionItems = this.props.items.map(createListViewItem);

    return React.createElement('section', sectionOptions, sectionItems);
  }
});

var ListView = Backbone.View.extend({
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
    this.trigger('collection_changed');
  },
  render: function() {
    this.renderOptions.items = this.collection;

    var temporaryContainer = window.document.createDocumentFragment();
    temporaryContainer.appendChild(window.document.createElement('div'));

    var listViewComponent = React.createElement(ListViewComponent, this.renderOptions),
        element = React.render(listViewComponent, this.el);

    this.reactElement = element;
    this.trigger('collection_changed');

    return this;
  }
});

module.exports = ListView;