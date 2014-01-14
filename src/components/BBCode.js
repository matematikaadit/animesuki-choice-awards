/** @jsx React.DOM */
var BBCode = React.createClass({

	_last_votelog: null,

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

	formatter: function (type) {
		var formatter = null;
		switch (type) {
			case 'inline': 
				formatter = new InlineFormatter(this.props.contest);
				break;
			case 'list':
			default:
				formatter = new ListFormatter(this.props.contest);
		}

		return formatter;
	},

	update: function (votelog) {
		var self = this;
		this._last_votelog = votelog;
		this.setState({
			preview: self.formatter(this.state.formatter).render(votelog) 
		});
	},

	listFormat: function () {
		var self = this;
		if (this._last_votelog != null) {
			this.setState({ 
				formatter: 'list',
				preview: self.formatter('list').render(this._last_votelog) 
			});
		}
		else { // no votelog
			this.setState({ formatter: 'list' });
		}
	},

	inlineFormat: function () {
		var self = this;
		if (this._last_votelog != null) {
			this.setState({ 
				formatter: 'inline',
				preview: self.formatter('inline').render(this._last_votelog) 
			});
		}
		else { // no votelog
			this.setState({ formatter: 'inline' });
		}
	},

});