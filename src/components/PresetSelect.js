/** @jsx React.DOM */
var PresetSelect = React.createClass({

	render: function () {
		var presets = this.props.context.presets();
		var option_nodes = [ <option value="-" key="-"></option> ];

		_.each(presets, function (entry) {
			option_nodes.push(
				<option value={entry}>{entry}</option>
			);
		});

		return (
			<select className="form-control" onChange={this.handleChange}>
				{option_nodes}
			</select>
		);
	},

	handleChange: function (e) {
		var el = e.target;
		this.props.votes.update(this.props.voteIdx, el.value, this.props.context, 'text');
	},

});