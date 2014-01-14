/** @jsx React.DOM */
var SeriesSelect = React.createClass({

	render: function () {
		var category = this.props.context;
		var option_nodes = [ <option value="-" key="-"></option> ];

		_.each(category.elligibleSeries(), function (entry) {
			option_nodes.push(
				<option value={entry.id()} key={entry.id()}>
					{entry.title()}
				</option>
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
		this.props.votes.update(this.props.voteIdx, el.value, this.props.context, 'series');
	},

});