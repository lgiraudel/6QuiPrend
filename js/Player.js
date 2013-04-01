/*global jQuery */

(function () {
	'use strict';

	var SixQuiPrend = window.SixQuiPrend = window.SixQuiPrend || {};

	SixQuiPrend.Player = function (conf) {
		this.conf = jQuery.extend({
			cards: null,
			index: null
		}, conf || {});

		this.init();
	};

	SixQuiPrend.Player.prototype.init = function () {
		this.score = 0;
	};

	SixQuiPrend.Player.prototype.getCard = function () {
		var cardIndex, card;

		cardIndex = Math.floor(Math.random() * this.conf.cards.length);
		card = this.conf.cards.splice(cardIndex, 1);

		return card[0];
	};

	SixQuiPrend.Player.prototype.addPoints = function (cards) {
		var points = this.conf.deck.getCardsValue(cards);

		console.log('Player #' + this.conf.index + ' add ' + points + ' points');

		this.score += cards.length;
	};

	SixQuiPrend.Player.prototype.getScore = function () {
		return this.score;
	};
}());