describe('Collection Tests', function() {
	beforeEach(function() {
		this.collection = new pam.player.Collection();
		this.model = new pam.player.Model();
		this.server = sinon.fakeServer.create();
	});

	it('should populate the collection', function(done) {
		this.server.respondWith("GET", "http://localhost:3000/players",
            [200, { "Content-Type": "application/json" },
             '[{ "_id": 12, "firstName": "Hey there", "surname": "boo" }]']);

		
		this.collection.on('sync', function() {
			console.log(this.collection.at(0).get("firstName"));
			expect(this.collection.at(0).get("firstName")).to.be.ok();
			done();
		}, this);

		this.collection.fetch();
		this.server.respond();
	});

	it('should update the collection', function(done) {
		this.server.respondWith("POST", "http://localhost:3000/players",
            [200, { "Content-Type": "application/json" },
             '[{ "_id": 12, "firstName": "Hey there", "surname": "boo" }]']);
		
		this.collection.fetch();

		this.collection.on('sync', function() {
			console.log(this.collection.at(0).get("firstName"));
			expect(this.collection.at(0).get("firstName")).to.be.ok();
			done();
		}, this);

		this.collection.add(this.model);
		this.model.save({
			firstName: 'Andrew',
			surname: 'Hump',
		});
		this.server.respond();
	});
});