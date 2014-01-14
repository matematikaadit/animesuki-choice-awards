/** @jsx React.DOM */
var Votes = React.createClass({displayName: 'Votes',

	render: function () {
		var self = this;
		var votes = this.props.votes;
		var category_nodes = [];
		_.each(this.props.context.categories(), function (category) {
			var header = ( React.DOM.h3(null, category.title()) );
			var vote_list = [];
			_.each(category.contest.tallyWeights(), function (weight, idx) {
				var form = self.categoryForm(category, idx);
				vote_list.push(
					React.DOM.div( {key:category.vid(idx)}, 
						Vote( {idx:idx, category:category, context:form, votes:votes})
					)
				);
			});

			category_nodes.push(
				React.DOM.div( {key:category.code()}, 
					header,
					React.DOM.div( {className:"form-horizontal"}, 
						vote_list
					)
				)
			);

		});

		return ( React.DOM.div(null, category_nodes) );
	},

	categoryForm: function (category, id) {

		// [!!] SeriesSelect components as well as preset components perform the votelog update on their own

		var vid = category.vid(id);
		var votes = this.props.votes;
		var rank = "#" + (id + 1);
		var form = null;
		var inputAddon = React.DOM.span( {className:"input-group-addon"}, rank);
		if ( ! category.is_preset()) {
			switch (category.type()) {
				case 'series':
					form = ( React.DOM.div( {key:vid}, SeriesSelect( {context:category, voteIdx:id, votes:votes, inputAddon:inputAddon})) );
					break;
				case 'limited-series':
					form = ( React.DOM.div( {key:vid}, SeriesSelect( {context:category, voteIdx:id, votes:votes, inputAddon:inputAddon})) );
					break;
				case 'character':
					form = ( 
						React.DOM.div( {key:vid, className:"row"}, 
							React.DOM.span( {className:"col-xs-6"}, 
								React.DOM.span( {className:"input-group"}, 
									inputAddon,
									React.DOM.input( {className:"form-control",
									       placeholder:"Character...",
									       'data-category-code':category.code(),
									       'data-idx':id,
									       onChange:this.updateText})
						        )
							),
							React.DOM.span( {className:"col-xs-6"}, 
								SeriesSelect( {context:category, voteIdx:id, votes:votes})
							)
						) 
					);
					break;
				case 'credits-song':
					form = ( 
						React.DOM.div( {key:vid, className:"row"}, 
							React.DOM.span( {className:"col-xs-7"}, 
								SeriesSelect( {context:category, voteIdx:id, votes:votes, inputAddon:inputAddon})
							),
							React.DOM.span( {className:"col-xs-3"}, 
								React.DOM.select( {className:"form-control", 'data-category-code':category.code(), 'data-idx':id, onChange:this.updateCreditsType}, 
									React.DOM.option( {value:"OP"}, "Opening"),
									React.DOM.option( {value:"ED"}, "Ending")
								)
							),
							React.DOM.span( {className:"col-xs-2"}, 
								React.DOM.input( {className:"form-control",
								       type:"text",
								       defaultValue:"1",
								       'data-category-code':category.code(),
								       'data-idx':id,
								       onChange:this.updateSongNr})
							)
						) 
					);
					break;
				case 'freeform':
				default: 
					form = ( 
						React.DOM.div( {key:vid, className:"input-group"}, 
							inputAddon,
							React.DOM.input( {className:"form-control", 
							       'data-category-code':category.code(), 
							       'data-idx':id, 
							       onChange:this.updateText})
						) 
					);
			}
		}
		else { // preset category
			form = ( React.DOM.div( {key:vid}, PresetSelect( {context:category, voteIdx:id, votes:votes})) );
		}

		return form;
	},

	updateCreditsType: function (e) {
		var el = e.target;
		var category = this.props.context.getCategory(el.getAttribute('data-category-code'));
		this.props.votes.update(el.getAttribute('data-idx'), el.value, category, 'credits-type');
	},

	updateSongNr: function (e) {
		var el = e.target;
		var category = this.props.context.getCategory(el.getAttribute('data-category-code'));
		this.props.votes.update(el.getAttribute('data-idx'), el.value, category, 'song-nr');
	},

	updateText: function (e) {
		var el = e.target;
		var category = this.props.context.getCategory(el.getAttribute('data-category-code'));
		this.props.votes.update(el.getAttribute('data-idx'), el.value, category, 'text');
	},

});