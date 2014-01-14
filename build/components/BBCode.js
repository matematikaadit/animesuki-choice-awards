/** @jsx React.DOM */
var BBCode = React.createClass({displayName: 'BBCode',

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