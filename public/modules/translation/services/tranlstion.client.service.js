'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('translation').config(function($translateProvider) {
	$translateProvider.translations('en',{
		HEADLINE: 'Dream Team',
		chooseLang: 'Language',
		enLanguage: 'English',
		heLanguage: 'Hebrew',
		signUp: 'Sign Up',
		signIn: 'Sign In',
		thePLAllededlyBet: 'The Premier league allegedly Bet',
		myTeam: 'My Team',
		substitutions: 'Substitutions',
		rules: 'Rules'
	})
	.translations('he',{
		HEADLINE: 'ליגת החלומות',
		chooseLang: 'שפה',
		enLanguage: 'אנגלית',
		heLanguage: 'עברית',
		signUp: 'הרשמה',
		signIn: 'התחברות',
		thePLAllededlyBet: "ע'לאק התערבות",
		myTeam: 'הקבוצה שלי',
		substitutions: 'חילופים',
		rules: 'חוקים'
	});
	$translateProvider.preferredLanguage('en');
});
