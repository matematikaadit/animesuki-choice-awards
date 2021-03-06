/** @jsx React.DOM */
(function () {

	var domMain = document.getElementById('app-main');

	domMain.innerHtml = 'Loading, please wait...';

	jQuery.ajax({ dataType: "json", url: App.input })
		.done(function (conf) {
			var choice_awards = new ChoiceAwards(conf);
			var votelog = new Votelog(choice_awards);
			domMain.innerHtml = '';
			React.renderComponent(
				React.DOM.div(null, 
					React.DOM.h1(null, "AnimeSuki ChoiceAwards Helper"),
					Post( {context:choice_awards, votes:votelog})
				),
				domMain
			);
		})
		.fail(function (error) {
			domMain.innerHtml = 'Loading, please wait... <b>failed to load</b>';
			console.log('Failed to GET json data. Error code:', error.status)
		});

}());