var pam = pam || {}; 
pam.player = pam.player || {}; 

pam.player.View = Backbone.View.extend({
	template: _.template($('#playerFormTemplate').html()),
	events: {
		'click #savePlayer': 'savePlayer'
	},
	initialize: function () {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'invalid', function() {
			alert(this.model.validationError);
		});
		this.render();
	},
	render: function() {
	    this.$el.html(this.template(this.model.attributes));
	    return this;
  	},
  	savePlayer: function() {
  		var self = this;

  		if (this.collection) {
			this.collection.add(this.model);
  		} 

		this.model.save({
  			firstName: self.$('#firstName').val()
  		}, 
  		{
			success: function() {
  				self.remove();
			}
		});
  	}
});