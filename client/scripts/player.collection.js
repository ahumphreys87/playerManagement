var pam = pam || {}; 
pam.player = pam.player || {}; 

pam.player.Collection = Backbone.Collection.extend({
	model: pam.player.Model,
	url: 'http://localhost:3000/players'
});