/** @jsx React.DOM */
var PresetSelect = React.createClass({displayName: 'PresetSelect',

	render: function () {
		var presets = this.props.context.presets();
		var option_nodes = [ React.DOM.option( {value:"-", key:"-"}) ];

		_.each(presets, function (entry) {
			option_nodes.push(
				React.DOM.option( {value:entry, key:entry}, 
					entry
				)
			);
		});

		return (
			React.DOM.select( {className:"form-control", onChange:this.handleChange}, 
				option_nodes
			)
		);
	},

	handleChange: function (e) {
		var el = e.target;
		console.log(el.value)
		if (el.value != '-') {
			this.props.votes.update(this.props.voteIdx, el.value, this.props.context, 'text');
		}
		else { // el.value == '-'
			this.props.votes.update(this.props.voteIdx, null, this.props.context, 'text');
		}
	},

});