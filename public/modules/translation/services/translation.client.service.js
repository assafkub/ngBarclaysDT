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
		rules: 'Rules',
		editProfile: 'Edit Profile',
		manageSocialAccount : 'Manage Social Accounts',
		changePasswd : 'Change Password',
		signOut: 'Signout',
		position: 'Position',
		name: 'Name',
		goalsFor: 'Goals For',
		goalsAgainst: 'Goals Against',
		goalsDifference: 'Goals Difference',
		points : 'Points',
	})
	.translations('he',{
		HEADLINE: 'ליגת החלומות',
		chooseLang: 'שפה',
		enLanguage: 'אנגלית',
		heLanguage: 'עברית',
		signUp: 'הרשמה',
		signIn: 'התחברות',
		thePLAllededlyBet: 'ע\'לאק התערבות',
		myTeam: 'הקבוצה שלי',
		substitutions: 'חילופים',
		rules: 'חוקים',
		editProfile: 'עריכת פרופיל',
		manageSocialAccount : 'ניהול חשבונות חיצוניים',
		changePasswd : 'שינוי סיסמא',
		signOut: 'התנתקות',
		position: 'מיקום',
		name: 'שם הקבוצה',
		goalsFor: 'שערי זכות',
		goalsAgainst: 'שערי חובה',
		goalsDifference: 'יחס',
		points : 'נקודות',
	});
	$translateProvider.preferredLanguage('en');
});