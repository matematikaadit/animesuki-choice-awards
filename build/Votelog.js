/** @jsx React.DOM */
var Votelog = Class.extend({

	init: function (contest) {
		var self = this;
		this._contest = contest;
		this._listeners = {};

		// generate empty votelog
		this._votelog = {};
		_.each(contest.categories(), function (category) {
			var empty_votes = [];
			for (var i = 0; i < contest.tallyWeights().length; i += 1) {
				empty_votes[i] = category.empty_votes();
			}
			self._votelog[category.code()] = {
				context: category,
				votes: empty_votes
			};
		});
	},

	update: function (idx, value, category, type) {
		var votes = this._votelog[category.code()].votes;
		votes[idx][type] = value;

		var self = this;
		_.each(this._listeners, function (listener) {
			listener(self._votelog);
		});

		return this;
	},

	addListener: function (key, listener) {
		this._listeners[key] = listener;
		return this;
	}

});