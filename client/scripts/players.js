$(function() {
	var playersCollection = new pam.player.Collection();

	playersCollection.on('sync', function (model) {
		var playerTableView = new pam.player.TableView({
			collection: playersCollection
		});
		$('body').append(playerTableView.el);

		playerTableView.listenTo(playerTableView, 'showEditForm', function(playerId) {
			playerTableView.remove();
			var playerModel = playersCollection.get(playerId);
			var playerView = new pam.player.View({
				model: playerModel
			});
			$('body').append(playerView.el);
		});

		playerTableView.listenTo(playerTableView, 'showAddForm', function() {
			playerTableView.remove();
			var playerModel = new pam.player.Model();
			var playerView = new pam.player.View({
				model: playerModel,
				collection: playersCollection
			});
			$('body').append(playerView.el);
		});
	});

	playersCollection.fetch();
});