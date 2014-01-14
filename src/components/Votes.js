/** @jsx React.DOM */
var Votes = React.createClass({

	render: function () {
		var self = this;
		var votes = this.props.votes;
		var category_nodes = [];
		_.each(this.props.context.categories(), function (category) {
			var header = ( <h3>{category.title()}</h3> );
			var vote_list = [];
			_.each(category.contest.tallyWeights(), function (weight, idx) {
				var form = self.categoryForm(category, idx);
				vote_list.push(
					<div key={category.vid(idx)}>
						<Vote idx={idx} category={category} context={form} votes={votes}/>
					</div>
				);
			});

			category_nodes.push(
				<div key={category.code()}>
					{header}
					<div className="form-horizontal">
						{vote_list}
					</div>
				</div>
			);

		});

		return ( <div>{category_nodes}</div> );
	},

	categoryForm: function (category, id) {

		// [!!] SeriesSelect components as well as preset components perform the votelog update on their own

		var vid = category.vid(id);
		var votes = this.props.votes;
		var rank = "#" + (id + 1);
		var form = null;
		var inputAddon = <span className="input-group-addon">{rank}</span>;
		if ( ! category.is_preset()) {
			switch (category.type()) {
				case 'series':
					form = ( <div key={vid}><SeriesSelect context={category} voteIdx={id} votes={votes} inputAddon={inputAddon}/></div> );
					break;
				case 'limited-series':
					form = ( <div key={vid}><SeriesSelect context={category} voteIdx={id} votes={votes} inputAddon={inputAddon}/></div> );
					break;
				case 'character':
					form = ( 
						<div key={vid} className="row">
							<span className="col-xs-6">
								<span className="input-group">
									{inputAddon}
									<input className="form-control"
									       placeholder="Character..."
									       data-category-code={category.code()}
									       data-idx={id}
									       onChange={this.updateText}/>
						        </span>
							</span>
							<span className="col-xs-6">
								<SeriesSelect context={category} voteIdx={id} votes={votes}/>
							</span>
						</div> 
					);
					break;
				case 'credits-song':
					form = ( 
						<div key={vid} className="row">
							<span className="col-xs-7">
								<SeriesSelect context={category} voteIdx={id} votes={votes} inputAddon={inputAddon}/>
							</span>
							<span className="col-xs-3">
								<select className="form-control" data-category-code={category.code()} data-idx={id} onChange={this.updateCreditsType}>
									<option value="OP">Opening</option>
									<option value="ED">Ending</option>
								</select>
							</span>
							<span className="col-xs-2">
								<input className="form-control"
								       type="text"
								       defaultValue="1"
								       data-category-code={category.code()}
								       data-idx={id}
								       onChange={this.updateSongNr}/>
							</span>
						</div> 
					);
					break;
				case 'freeform':
				default: 
					form = ( 
						<div key={vid} className="input-group">
							{inputAddon}
							<input className="form-control" 
							       data-category-code={category.code()} 
							       data-idx={id} 
							       onChange={this.updateText}/>
						</div> 
					);
			}
		}
		else { // preset category
			form = ( <div key={vid}><PresetSelect context={category} voteIdx={id} votes={votes}/></div> );
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