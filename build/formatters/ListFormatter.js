/** @jsx React.DOM */
var ListFormatter = Class.extend({

	init: function (contest) {
		this._contest = contest;
	},

	render: function (votelog) {
		var self = this;
		var output = '';
		var contest = this._contest;
		_.each(votelog, function (info, cat) {
			output += info.context.header() + "\n";
			switch (info.context.type()) {
				case 'series': 
				case 'limited-series':
					items = '';
					_.each(info.votes, function (vote, i) {
						if ( ! _.isEmpty(vote.series)) {
							items += self.item_wrap(contest.getSeries(vote.series).title(), vote.comment);
						}
					});
					if ( ! _.isEmpty(items)) {
						output += self.list_wrap(items);
					}
					break;
				case 'character':
					items = '';
					_.each(info.votes, function (vote, i) {
						if ( ! _.isEmpty(vote.series) &&  ! _.isEmpty(vote.text)) {
							items += self.item_wrap(vote.text + ' / ' + contest.getSeries(vote.series).title(), vote.comment);
						}
					});
					if ( ! _.isEmpty(items)) {
						output += self.list_wrap(items);
					}
					break;
				case 'credits-song': 
					items = '';
					_.each(info.votes, function (vote, i) {
						if ( ! _.isEmpty(vote.series) &&  ! _.isEmpty(vote['credits-type']) && ! _.isEmpty(vote['song-nr'])) {
							items += self.item_wrap(contest.getSeries(vote.series).title() + ' ' + vote['credits-type'] + vote['song-nr'], vote.comment);
						}
					});
					if ( ! _.isEmpty(items)) {
						output += self.list_wrap(items);
					}
					break;
				case 'freeform':
				default:
					items = '';
					_.each(info.votes, function (vote, i) {
						if ( ! _.isEmpty(vote.text)) {
							items += self.item_wrap(vote.text, vote.comment);
						}
					});
					if ( ! _.isEmpty(items)) {
						output += self.list_wrap(items);
					}
			}
		});

		return output;
	},

	list_wrap: function (items) {
		return "[LIST=1]\n" + items + "[/LIST]\n\n";
	},

	item_wrap: function (item, comment) {
		if ( ! _.isEmpty(comment)) {
			return "  [*] " + item + " [INDENT][i]" + comment + "[/i][/INDENT]\n";
		}
		else { // empty comment
			return "  [*] " + item + "\n";
		}
	}

});