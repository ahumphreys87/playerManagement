describe('Collection Tests', function() {
	beforeEach(function() {
		this.view = new pam.player.View({
			model: new pam.player.Model()
		});
	});

	it('it should have a click event on save', function() {
		expect(this.view.events['click #savePlayer']).to.be.ok();
	});
});