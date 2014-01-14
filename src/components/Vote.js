/** @jsx React.DOM */
var Vote = React.createClass({

	getInitialState: function () {
		return { showComments: false }
	},

	render: function () {
		var category = this.props.category;
		var idx = this.props.idx;

		if ( ! this.state.showComments) {
			return (
				<div>
					<div className="row" key="main">
						<div className="col-xs-9"> {this.props.context} </div>
						<div className="col-xs-3">
							<button className="btn btn-default btn-xs" onClick={this.addComment}>Add Comment</button>
						</div>
					</div>
				</div>
			);
		}
		else { // don't show comments
			return (
				<div>
					<div className="row" key="main">
						<div className="col-xs-9"> {this.props.context} </div>
						<div className="col-xs-3">
							<button className="btn btn-default btn-xs" onClick={this.removeComment}>Del Comment</button>
						</div>
					</div>
					<div className="row" key="comment">
						<div className="col-xs-9">
							<textarea className="form-control vote-comment" defaultValue="" onChange={this.updateComment} />
						</div>
					</div>
				</div>
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