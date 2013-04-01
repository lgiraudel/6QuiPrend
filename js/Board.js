/*global jQuery */

(function () {
	'use strict';

	var SixQuiPrend = window.SixQuiPrend = window.SixQuiPrend || {};

	SixQuiPrend.Board = function (conf) {
		this.conf = jQuery.extend({
			nbRows:  4,
			cards: null,
			deck:  null
		}, conf || {});

		this.init();
	};

	SixQuiPrend.Board.prototype.init = function () {
		this.rows = new Array(this.conf.rows);
		for (var i = 0; i < this.conf.cards.length; i++) {
			this.rows[i] = [];
			this.rows[i].push(this.conf.cards[i]);
		}
	};

	SixQuiPrend.Board.prototype.show = function () {
		var str;

		console.log('Board status :');
		for (var i = 0; i < this.conf.nbRows; i++) {
			str = 'Row ' + i + ' :';

			for (var j = 0; j < this.rows[i].length; j++) {
				str += ' ' + this.rows[i][j] + '[' +  this.conf.deck.getCardValue(this.rows[i][j]) + ']';
			}
			console.log(str);
		}
	};

	SixQuiPrend.Board.prototype.getLastCardInRow = function (row) {
		return this.rows[row][this.rows[row].length - 1];
	};

	SixQuiPrend.Board.prototype.findRow = function (card) {
		var rowIndex = null,
			lastValueInRow = null;

		for (var i = 0; i < this.rows.length; i++) {
			lastValueInRow = this.getLastCardInRow(i);

			if (lastValueInRow < card && (rowIndex === null || lastValueInRow > this.getLastCardInRow(rowIndex))) {
				rowIndex = i;
			}
		}

		return rowIndex;
	};

	SixQuiPrend.Board.prototype.getSmallestRow = function () {
		var rowWithLessPoints = null,
			rowWithLessPointsValue = Infinity;

		for (var i = 0; i < this.rows.length; i++) {
			var rowValue = this.conf.deck.getCardsValue(this.rows[i]);

			if (rowValue < rowWithLessPointsValue) {
				rowWithLessPoints = i;
				rowWithLessPointsValue = rowValue;
			}
		}

		return rowWithLessPoints;
	};

	SixQuiPrend.Board.prototype.addCard = function (card, player) {
		var rowIndex = this.findRow(card);

		if (rowIndex !== null) {
			if (this.rows[rowIndex].length === 5) {
				player.addPoints(this.rows[rowIndex]);
				this.rows[rowIndex].length = 0;
			}
		} else {
			rowIndex = this.getSmallestRow();

			player.addPoints(this.rows[rowIndex]);
			this.rows[rowIndex].length = 0;
		}
		console.log('Player #' + player.conf.index + ' add card ' + card + '[' + this.conf.deck.getCardValue(card) + '] on row #' + rowIndex);
		this.rows[rowIndex].push(card);
	};
}());