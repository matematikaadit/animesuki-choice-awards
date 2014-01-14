/** @jsx React.DOM */
var Vote = React.createClass({displayName: 'Vote',

	getInitialState: function () {
		return { showComments: false }
	},

	render: function () {
		var category = this.props.category;
		var idx = this.props.idx;

		if ( ! this.state.showComments) {
			return (
				React.DOM.div(null, 
					React.DOM.div( {className:"form-group", key:"main"}, 
						React.DOM.div( {className:"col-xs-9"},  this.props.context ),
						React.DOM.div( {className:"col-xs-3"}, 
							React.DOM.button( {className:"btn btn-default btn-xs", onClick:this.addComment}, "Add Comment")
						)
					)
				)
			);
		}
		else { // don't show comments
			return (
				React.DOM.div(null, 
					React.DOM.div( {className:"form-group", key:"main"}, 
						React.DOM.div( {className:"col-xs-9"},  this.props.context ),
						React.DOM.div( {className:"col-xs-3"}, 
							React.DOM.button( {className:"btn btn-default btn-xs", onClick:this.removeComment}, "Del Comment")
						)
					),
					React.DOM.div( {className:"form-group", key:"comment"}, 
						React.DOM.div( {className:"col-xs-9"}, 
							React.DOM.textarea( {className:"form-control vote-comment", defaultValue:"", onChange:this.updateComment} )
						)
					)
				)
			);
		}
	},

	addComment: function() {
		this.setState({ showComments: true });
	},

	removeComment: function() {
		this.props.votes.update(this.props.idx, '', this.props.category, 'comment');
		this.setState({ showComments: false });
	},

	updateComment: function (e) {
		var el = e.target;
		this.props.votes.update(this.props.idx, el.value, this.props.category, 'comment');
	}

});