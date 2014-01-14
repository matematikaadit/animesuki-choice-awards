/** @jsx React.DOM */
var ChoiceAwardsSeries = Class.extend({

	defaults: {
		"id": null,
		"title": null,
		"type": "TV",
	},

	init: function (conf, contest) {
		this.conf = _.extend({}, this.defaults, conf);
		this.contest = contest;
	},

	title: function () {
		return this.conf.title
			.replace(/;/g, ' ')
			.replace(/-/g, ' ')
			.replace(/,/g, ' ')
			.replace(/\\"/g, '')
			.trim();
	},

	id: function () {
		return this.conf.id;
	},

	type: function () {
		return this.conf.type;
	}

});