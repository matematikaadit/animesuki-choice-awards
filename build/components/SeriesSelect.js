/** @jsx React.DOM */
var SeriesSelect = React.createClass({displayName: 'SeriesSelect',

	render: function () {
		var category = this.props.context;
		var option_nodes = [ React.DOM.option( {value:"-", key:"-"}) ];

		_.each(category.elligibleSeries(), function (entry) {
			option_nodes.push(
				React.DOM.option( {value:entry.id(), key:entry.id()}, 
					entry.title()
				)
			);
		});

		return (
			React.DOM.div( {className:"input-group"}, 
				this.props.inputAddon,
				React.DOM.select( {className:"form-control", onChange:this.handleChange}, 
					option_nodes
				)
			)
		);
	},

	handleChange: function (e) {
		var el = e.target;
		if (el.value != '-') {
			this.props.votes.update(this.props.voteIdx, el.value, this.props.context, 'series');
		}
		else { // el.value == '-'
			this.props.votes.update(this.props.voteIdx, null, this.props.context, 'series');
		}
	},

});