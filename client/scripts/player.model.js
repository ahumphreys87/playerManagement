var pam = pam || {}; 
pam.player = pam.player || {}; 

pam.player.Model = Backbone.Model.extend({
	idAttribute: '_id',
	defaults: {
		firstName: null,
		surname: null,
		address: null
	},
	validate: function(attrs, options) {
		if (attrs.firstName !== 'Andrew') {
			return 'Player must be called Andrew!';
		}
	}
});