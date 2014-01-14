/** @jsx React.DOM */
var Post = React.createClass({

	render: function () {
		var preview = <BBCode contest={this.props.context}/>
		this.props.votes.addListener('preview', function (votelog) {
			preview.update(votelog);
		});

		return (
			<div>
				<p>Fill in the form bellow then copy/paste the BBCode on the right.</p>
				<div className="row">
					<div className="col-md-8">
						<h2>Your Votes</h2>
						<Votes context={this.props.context} votes={this.props.votes}/>
					</div>
					<div className="col-md-4">
						<h2>Preview / Output</h2>
						{preview}
					</div>
				</div>
			</div>
		);
	},

});