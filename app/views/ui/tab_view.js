var Backbone = require('backbone');
var $ = Backbone.$ = require('jquery');

var TabView = Backbone.View.extend({
  events: {
    'click .tabs a': 'changeTab'
  },
  initialize: function(options) {
    this.setElement($(options.el, window.document)[0]);
    this.currentIndex = 0;
  },
  changeTab: function(e) {
    e.preventDefault();

    this.$el.find('.tab_page:eq(' + this.currentIndex + ')').removeClass('active');
    this.$el.find('.tabs a:eq(' + this.currentIndex + ')').removeClass('active');

    var target = $(e.target);
    this.currentIndex = target.index();

    this.$el.find('.tab_page:eq(' + this.currentIndex + ')').addClass('active');
    target.addClass('active');
  }
});

module.exports = TabView;