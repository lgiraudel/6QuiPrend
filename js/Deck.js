/* global jQuery */

(function ($) {
    'use strict';

    var SixQuiPrend = window.SixQuiPrend = window.SixQuiPrend || {};

    SixQuiPrend.Deck = function (conf) {
        this.conf = jQuery.extend({
            size: 104,
            possibleCardWeight: [8, 5, 3, 2, 1],
            nbCardsPerWeight: [1, 5, 15, 20]
        }, conf || {});

        this.init();
    };

    SixQuiPrend.Deck.prototype.init = function () {
        var deck = this,
            weight,
            nbToWeight,
            randomIndex;

        this.availableCards = new Array(this.conf.size);
        this.cardWeight     = new Array(this.conf.size);

        $(this.availableCards).each(function (i, e) {
            deck.availableCards[i] = i + 1;
            deck.cardWeight[i] = 1;
        });

        for (var i = 0; i < this.conf.possibleCardWeight.length && i < this.conf.nbCardsPerWeight.length; i++) {
            weight = this.conf.possibleCardWeight[i];
            nbToWeight = this.conf.nbCardsPerWeight[i];

            if (weight == 1) {
                continue;
            }

            while (nbToWeight > 0) {
                randomIndex = Math.floor(Math.random() * this.availableCards.length);

                // If there already is a weight for this index, we try to find another card
                if (this.cardWeight[randomIndex] !== 1) {
                    continue;
                }

                this.cardWeight[randomIndex] = weight;
                nbToWeight--;
            }
        }
    };

    SixQuiPrend.Deck.prototype.getCard = function () {
        var index = Math.floor(Math.random() * this.availableCards.length);
        var item = this.availableCards.splice(index, 1);

        return item[0];
    };

    SixQuiPrend.Deck.prototype.getCards = function (n) {
        var cards = [];

        for (var i = 0; i < n; i++) {
            cards.push(this.getCard());
        }

        return cards;
    };

    SixQuiPrend.Deck.prototype.getCardValue = function (card) {
        return this.cardWeight[card - 1];
    };

    SixQuiPrend.Deck.prototype.getCardsValue = function (cards) {
        var total = 0;

        for (var i = 0; i < cards.length; i++) {
            total += this.getCardValue(cards[i]);
        }

        return total;
    };
}(jQuery));
