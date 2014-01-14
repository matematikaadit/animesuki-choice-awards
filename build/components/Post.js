/** @jsx React.DOM */
var Post = React.createClass({displayName: 'Post',

	render: function () {
		var preview = BBCode( {contest:this.props.context})
		this.props.votes.addListener('preview', function (votelog) {
			preview.update(votelog);
		});

		return (
			React.DOM.div(null, 
				React.DOM.p(null, "Fill in the form bellow then copy/paste the BBCode on the right."),
				React.DOM.div( {className:"row"}, 
					React.DOM.div( {className:"col-md-8"}, 
						React.DOM.h2(null, "Your Votes"),
						Votes( {context:this.props.context, votes:this.props.votes})
					),
					React.DOM.div( {className:"col-md-4"}, 
						React.DOM.h2(null, "Preview / Output"),
						preview
					)
				)
			)
		);
	},

});