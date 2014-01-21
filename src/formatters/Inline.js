/** @jsx React.DOM */
var InlineFormatter = ListFormatter.extend({

	init: function (contest) {
		this._super(contest);
	},

	write_header: function (category) {
		return category.header() + ' ';
	},

	list_wrap: function (items) {
		return items.join(', ') + "\n";
	},

	item_wrap: function (item, comment) {
		return item;
	},

	empty_list: function () {
		return "\n";
	},

	comment_block: function (comments) {
		if ( ! _.isEmpty(comments)) {
			return "[indent]" + comments.join("\n") + "[/indent]\n";
		}
		else { // empty
			return '';
		}
	}

});