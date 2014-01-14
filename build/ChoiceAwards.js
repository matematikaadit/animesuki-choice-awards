/** @jsx React.DOM */
var ChoiceAwards = Class.extend({

	init: function (conf) {
		var self = this;
		this._listeners = [];
		// read rules
		this._rules = conf.rules;
		// read categories
		this._categories = [];
		self._category_refs = {};
		_.each(conf.categories, function (entry) {
			var category = new ChoiceAwardsCategory(entry, self)
			self._categories.push(category);
			self._category_refs[category.code()] = category;
		});
		// read series
		this._series = [];
		this._series_refs = {};
		_.each(conf.series, function (entry) {
			var series = new ChoiceAwardsSeries(entry, self)
			self._series.push(series);
			self._series_refs[series.id()] = series;
		});
	},

	categories: function () {
		return this._categories;
	},

	series: function (allowedTypes) {
		var filtered_series = [];
		
		_.each(this._series, function (entry) {
			if (_.contains(allowedTypes, entry.type())) {
				filtered_series.push(entry);
			}
		});

		return filtered_series;
	},

	tallyWeights: function () {
		return this._rules['tally-weights'];
	},

	getCategory: function (code) {
		return this._category_refs[code];
	},

	getSeries: function (series_id) {
		return this._series_refs[series_id];	
	}

});