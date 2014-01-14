/** @jsx React.DOM */
var BBCode = React.createClass({

	getInitialState: function () {
		return { formatter: 'list', preview: '' }
	},

	render: function () {
		return (
			<div>
				<div>
					<button className="btn btn-default btn-xs" onClick={this.listFormat}>List Style</button> 
					-
					<button className="btn btn-default btn-xs" onClick={this.inlineFormat}>Inline Style</button>				
				</div>
				<hr/>
				<textarea className="form-control bbcode" rows="30" value={this.state.preview}/> 
			</div>
		);
	},

	update: function (votelog) {
		var formatter = null;
		switch (this.state.formatter) {
			case 'inline': 
				formatter = new InlineFormatter(this.props.contest);
				this.setState({ preview: formatter.render(votelog) });
				break;
			case 'list':
			default:
				formatter = new ListFormatter(this.props.contest);
				this.setState({ preview: formatter.render(votelog) });
		}
	},

	listFormat: function () {
		this.setState({ formatter: 'list' });
	},

	inlineFormat: function () {
		this.setState({ formatter: 'inline' });
	},

});