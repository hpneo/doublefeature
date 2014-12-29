var Backbone = require('backbone');
var $ = Backbone.$ = require('jquery');

var ModelForm = Backbone.View.extend({
  events: {
    'submit': 'handleSubmit',
    'change': 'handleInputChange'
  },
  initialize: function(options) {
    this.setElement($(options.el, window.document)[0]);
    
    this.modelName = options.modelName;
    this.associations = options.associations;
    this.afterSave = options.afterSave;
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

    var self = this;

    this.model.save().then(function() {
      console.log(self.afterSave);

      if (self.afterSave) {
        self.afterSave(self.$el, self.model);
      }
    }).catch(console.log.bind(console));
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