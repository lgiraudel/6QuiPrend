/*global jQuery, window, dust, console */

(function ($) {
	'use strict';

	var SixQuiPrend = window.SixQuiPrend = window.SixQuiPrend || {};

	SixQuiPrend.Player = function (conf) {
		this.conf = $.extend({
			cards:   null,
			index:   null,
      type:    'IA',
      display: true
		}, conf || {});

		this.init();
	};

	SixQuiPrend.Player.prototype.init = function () {
    var i,
      output;

		this.score = 0;
    this.cards = [];

    this.templates = {
      player: 'player',
      cards:  'cards',
      card:   'card'
    };

    for (i = 0; i < this.conf.cards.length; i += 1) {
      this.cards.push({
        value: this.conf.cards[i],
        weight: this.conf.deck.getCardValue(this.conf.cards[i])
      });
    }

    if (this.conf.display) {
      output = dust.render(this.templates.player, {
        name: 'User #' + this.conf.index,
        type: this.conf.type,
        cards: this.cards
      }, function (err, out) {
        $('#players').append(out);
      });
    }
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
}(jQuery));