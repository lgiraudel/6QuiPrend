/*global jQuery */

(function () {
	'use strict';

	var SixQuiPrend = window.SixQuiPrend = window.SixQuiPrend || {};

	SixQuiPrend.Game = function (conf) {
		this.conf = jQuery.extend({
			nbPlayers:            4,
			nbCardsForEachPlayer: 10,
			nbRowsOnBoard:        5
		}, conf || {});

		this.init();
	};

	SixQuiPrend.Game.prototype.init = function () {
		this.deck = new SixQuiPrend.Deck();
		this.players = new Array(this.conf.nbPlayers);

		for (var i = 0; i < this.conf.nbPlayers; i++) {
			this.players[i] = new SixQuiPrend.Player({
				cards: this.deck.getCards(this.conf.nbCardsForEachPlayer),
				index: i,
				deck:  this.deck
			});
		}
		this.board = new SixQuiPrend.Board({
			nbRows: this.conf.nbRowsOnBoard,
			cards:  this.deck.getCards(this.conf.nbRowsOnBoard),
			deck:   this.deck
		});

		this.board.show();
	};

	SixQuiPrend.Game.prototype.showScore = function () {
		var cellMaxLength = (this.conf.nbPlayers + '').length + 1,
			score = null,
			line1 = '',
			line2 = '';

		for (var i = 0; i < this.conf.nbPlayers; i++) {
			score = this.players[i].getScore();

			cellMaxLength = Math.max(cellMaxLength, (score + '').length);
		}

		line1 = 'Player';
		line2 = 'Score ';

		for (var i = 0; i < this.conf.nbPlayers; i++) {
			var currentPlayerIndexLength = ('#' + i).length;
			var currentPlayerScore = this.players[i].getScore();
			var currentPlayerScoreLength = (currentPlayerScore + '').length;

			line1 += ' | ';
			line2 += ' | ';

			for (var j = 0; j < cellMaxLength - currentPlayerIndexLength; j++) {
				line1 += ' ';
			}
			line1 += '#' + i;

			for (var j = 0; j < cellMaxLength - currentPlayerScoreLength; j++) {
				line2 += ' ';
			}
			line2 += currentPlayerScore;
		}

		line1 += ' |';
		line2 += ' |';

		console.log(line1 + '\n' + line2);
	};

	SixQuiPrend.Game.prototype.step = function () {
		console.log('====== NEW STEP ======');
		var cards = [];

		for (var i = 0; i < this.players.length; i++) {
			cards.push(this.players[i].getCard());
			console.log('Player #' + i + ' use card ' + cards[i] + '[' + this.deck.getCardValue(cards[i]) + ']');
		}

		for (var i = 0; i < cards.length; i++) {
			var min = Math.min.apply(null, cards);
			var ownerIndex = cards.indexOf(min);

			cards[ownerIndex] = Infinity;
			this.board.addCard(min, this.players[ownerIndex]);
		}
		this.board.show();

		this.showScore();
	};

	var game = new SixQuiPrend.Game();
	for (var i = 0; i < 10; i++) {
		game.step();
	}
}());