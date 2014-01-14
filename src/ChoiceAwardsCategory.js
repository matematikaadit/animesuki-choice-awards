/** @jsx React.DOM */
var ChoiceAwardsCategory = Class.extend({

	defaults: {
		"code": null,
		"name": null,
		"type": "series",
		"allowedTypes": [],
		"maxVoteCount": 3,
		"presetValues": []
	},

	init: function (conf, contest) {
		this.conf = _.extend({}, this.defaults, conf);
		this.contest = contest;
	},

	title: function () {
		return this.conf.name;
	},

	code: function () {
		return this.conf.code;
	},

	type: function () {
		return this.conf.type;
	},

	elligibleSeries: function () {
		return this.contest.series(this.conf.allowedTypes);
	},

	is_preset: function () {
		return this.conf.presetValues.length != 0;
	},

	presets: function () {
		return this.conf.presetValues;
	},

	/**
	 * vid = vote id
	 */
	vid: function (index) {
		return this.conf.code + '-' + index;
	},

	empty_votes: function () {
		switch (this.type()) {
			case 'series': 
				return { 'series': null, 'comment': null };
			case 'limited-series':
				return { 'series': null, 'comment': null };
			case 'character':
				return { 'text': null, 'series': null, 'comment': null };
			case 'credits-song': 
				return { 'series': null, 'credits-type': 'OP', 'song-nr': 1, 'comment': null };
			case 'freeform':
			default: 
				return { 'text': null, 'comment': null };
		}
	},

	header: function () {
		return '-{'+this.code()+'}- ['+this.title()+']';
	}

});