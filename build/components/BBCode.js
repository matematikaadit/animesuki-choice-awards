/** @jsx React.DOM */
var BBCode = React.createClass({displayName: 'BBCode',

	_last_votelog: null,

	getInitialState: function () {
		return { formatter: 'list', preview: '' }
	},

	render: function () {
		return (
			React.DOM.div(null, 
				React.DOM.div(null, 
					React.DOM.button( {className:"btn btn-default btn-xs", onClick:this.listFormat}, "List Style"), 
					" - ",
					React.DOM.button( {className:"btn btn-default btn-xs", onClick:this.inlineFormat}, "Inline Style")				
				),
				React.DOM.hr(null),
				React.DOM.textarea( {className:"form-control bbcode", rows:"30", value:this.state.preview}) 
			)
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