/** @jsx React.DOM */
var ListFormatter = Class.extend({

	init: function (contest) {
		this._contest = contest;
	},

	render: function (votelog) {
		var self = this;
		var output = '';
		var contest = this._contest;
		var item_list = null;
		_.each(votelog, function (info, cat) {
			output += self.write_header(info.context);
			switch (info.context.type()) {
				case 'series': 
				case 'limited-series':
					item_list = [];
					comments = [];
					_.each(info.votes, function (vote, i) {
						if ( ! _.isEmpty(vote.series)) {
							item_list.push(self.item_wrap(contest.getSeries(vote.series).title(), vote.comment));
							if ( ! _.isEmpty(vote.comment)) {
								comments.push(vote.comment);
							}
						}
					});
					if ( ! _.isEmpty(item_list)) {
						output += self.list_wrap(item_list);
						output += self.comment_block(comments);
					}
					else { // no items
						output += self.empty_list();
					}
					break;
				case 'character':
					item_list = [];
					comments = [];
					_.each(info.votes, function (vote, i) {
						if ( ! _.isEmpty(vote.series) &&  ! _.isEmpty(vote.text)) {
							item_list.push(self.item_wrap(vote.text + ' / ' + contest.getSeries(vote.series).title(), vote.comment));
							if ( ! _.isEmpty(vote.comment)) {
								comments.push(vote.comment);
							}
						}
					});
					if ( ! _.isEmpty(item_list)) {
						output += self.list_wrap(item_list);
						output += self.comment_block(comments);
					}
					else { // no items
						output += self.empty_list();
					}
					break;
				case 'credits-song': 
					item_list = [];
					comments = [];
					_.each(info.votes, function (vote, i) {
						if ( ! _.isEmpty(vote.series) &&  ! _.isEmpty(vote['credits-type']) && ! _.isEmpty(vote['song-nr'])) {
							item_list.push(self.item_wrap(contest.getSeries(vote.series).title() + ' ' + vote['credits-type'] + vote['song-nr'], vote.comment));
							if ( ! _.isEmpty(vote.comment)) {
								comments.push(vote.comment);
							}
						}
					});
					if ( ! _.isEmpty(item_list)) {
						output += self.list_wrap(item_list);
						output += self.comment_block(comments);
					}
					else { // no items
						output += self.empty_list();
					}
					break;
				case 'freeform':
				default:
					item_list = [];
					_.each(info.votes, function (vote, i) {
						if ( ! _.isEmpty(vote.text)) {
							item_list.push(self.item_wrap(vote.text, vote.comment));
							if ( ! _.isEmpty(vote.comment)) {
								comments.push(vote.comment);
							}
						}
					});
					if ( ! _.isEmpty(item_list)) {
						output += self.list_wrap(item_list);
						output += self.comment_block(comments);
					}
					else { // no items
						output += self.empty_list();
					}
			}
		});

		return output;
	},

	write_header: function (category) {
		return category.header() + "\n";
	},

	list_wrap: function (items) {
		return "[LIST=1]\n" + items.join('') + "[/LIST]\n\n";
	},

	item_wrap: function (item, comment) {
		if ( ! _.isEmpty(comment)) {
			return "  [*] " + item + " [INDENT][i]" + comment + "[/i][/INDENT]\n";
		}
		else { // empty comment
			return "  [*] " + item + "\n";
		}	
	},

	empty_list: function () {
		return '';
	},

	comment_block: function (comments) {
		return '';
	}

});