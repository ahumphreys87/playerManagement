var pam = pam || {}; 
pam.player = pam.player || {}; 

pam.player.TableView = Backbone.View.extend({
	template: _.template($('#playerTableTemplate').html()),
	events: {
		'click #addPlayer': 'addPlayer',
		'click .editPlayer': 'editPlayer',
		'click .deletePlayer': 'deletePlayer'
	},
	initialize: function () {
		this.listenTo(this.collection, 'change remove', this.render);
		this.render();
	},
	render: function() {
		this.$el.html(this.template({
	    	players: this.collection.toJSON()
	    }));
	    return this;
  	},
  	addPlayer: function() {
  		this.trigger('showAddForm');
  	},
  	editPlayer: function(e) {
  		this.trigger('showEditForm', $(e.currentTarget).data('playerid'));
  	},
  	deletePlayer: function(e) {
  		if (confirm('Are you sure you want to delete this player')) {
  			var player = this.collection.get($(e.currentTarget).data('playerid'));
  			player.destroy();
  		}
  	}
});