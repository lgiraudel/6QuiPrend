/* global jQuery, window, console, dust */

(function ($) {
    'use strict';

    var SixQuiPrend = window.SixQuiPrend = window.SixQuiPrend || {},
        game,
        i;

    SixQuiPrend.Game = function (conf) {
        this.conf = $.extend({
            nbPlayers:            4,
            nbCardsForEachPlayer: 10,
            nbRowsOnBoard:        5
        }, conf || {});

        this.init();
    };

    SixQuiPrend.Game.prototype.init = function () {
        var i;

        // Templates initialization
        dust.loadSource(dust.compile($('#player-tmpl').html(), 'player'));
        dust.loadSource(dust.compile($('#cards-tmpl').html(), 'cards'));
        dust.loadSource(dust.compile($('#card-tmpl').html(), 'card'));

        this.deck = new SixQuiPrend.Deck();
        this.players = [];
        this.players.length = this.conf.nbPlayers;

        for (i = 0; i < this.conf.nbPlayers; i += 1) {
            this.players[i] = new SixQuiPrend.Player({
                cards:   this.deck.getCards(this.conf.nbCardsForEachPlayer),
                index:   i,
                deck:    this.deck,
                type:    i === 0 ? 'Human' : 'IA',
                display: true
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
        var cellMaxLength = String(this.conf.nbPlayers).length + 1,
            score = null,
            line1 = '',
            line2 = '',
            i,
            j,
            currentPlayerIndexLength,
            currentPlayerScore,
            currentPlayerScoreLength;

        for (i = 0; i < this.conf.nbPlayers; i += 1) {
            score = this.players[i].getScore();

            cellMaxLength = Math.max(cellMaxLength, String(score).length);
        }

        line1 = 'Player';
        line2 = 'Score ';

        for (i = 0; i < this.conf.nbPlayers; i += 1) {
            currentPlayerIndexLength = ('#' + i).length;
            currentPlayerScore = this.players[i].getScore();
            currentPlayerScoreLength = String(currentPlayerScore).length;

            line1 += ' | ';
            line2 += ' | ';

            for (j = 0; j < cellMaxLength - currentPlayerIndexLength; j += 1) {
                line1 += ' ';
            }
            line1 += '#' + i;

            for (j = 0; j < cellMaxLength - currentPlayerScoreLength; j += 1) {
                line2 += ' ';
            }
            line2 += currentPlayerScore;
        }

        line1 += ' |';
        line2 += ' |';

        console.log(line1 + '\n' + line2);
    };

    SixQuiPrend.Game.prototype.step = function () {
        var cards = [],
            i,
            min,
            ownerIndex;

        console.log('====== NEW STEP ======');

        for (i = 0; i < this.players.length; i += 1) {
            cards.push(this.players[i].getCard());
            console.log('Player #' + i + ' use card ' + cards[i] + '[' + this.deck.getCardValue(cards[i]) + ']');
        }

        for (i = 0; i < cards.length; i += 1) {
            min = Math.min.apply(null, cards);
            ownerIndex = cards.indexOf(min);

            cards[ownerIndex] = Infinity;
            this.board.addCard(min, this.players[ownerIndex]);
        }

        this.board.show();
        this.showScore();
    };

    game = new SixQuiPrend.Game({
        nbCardsForEachPlayer: 10
    });

    for (i = 0; i < 10; i += 1) {
        game.step();
    }

}(jQuery));
