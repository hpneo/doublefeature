var Backbone = require('backbone');
var $ = Backbone.$ = require('jquery');

var ModelForm = Backbone.View.extend({
  events: {
    'submit': 'handleSubmit',
    'change': 'handleInputChange'
  },
  initialize: function(options) {
    this.modelName = options.modelName;
  },
  handleInputChange: function() {
    var self = this;

    Object.keys(this.model.attributes).forEach(function(attribute) {
      var element = self.$('#' + self.modelName + '_' + attribute);

      if (element.length > 0) {
        self.model[attribute] = element.val();
      }
    });
  },
  handleSubmit: function(e) {
    e.preventDefault();

    console.log(this.model, this.model.save);

    // this.model.save().then(function() {
    //   alert('Movie added!');
    // });
  },
  render: function() {
    var self = this;

    Object.keys(this.model.attributes).forEach(function(attribute) {
      var element = self.$('#' + self.modelName + '_' + attribute);

      if (element.length > 0) {
        element.val(self.model[attribute]);
      }
    });

    return this;
  }
});

module.exports = ModelForm;