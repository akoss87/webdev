var app = new Vue({
  el: '#app',
  data: {
    figures: [
      'bear',
      'chicken',
      'crocodile',
      'fox',
      'giraffe',
      'jellyfish',
      'kangaroo',
      'koala',
      'lion',
      'octopus',
      'panda',
      'polar',
      'tiger',
      'wolf',
      'zebra',
    ],
    // cards: [
    //   [false, false, false, false, false, false, false, false, false, false, false, false],
    //   [false, false, false, false, false, false, false, false, false, false, false, false],
    //   [false, false, false, false, false, false, false, false, false, false, false, false],
    //   [false, false, false, false, false, false, false, false, false, false, false, false],
    //   [false, false, false, false, false, false, false, false, false, false, false, false],
    //   [false, false, false, false, false, false, false, false, false, false, false, false],
    // ],
    // generáljuk a created eseményben
    cards: [],
    firstCard: null,
    secondCard: null,
    stepCount: 0,
  },
  created: function () {
    // 1. minden figurát kétszer beleteszünk az availableFigures tömbbe
    var availableFigures = this.figures.concat(this.figures);

    // 2. beállítjuk a kártyák kezdőállapotát
    for (var i = 0; i < 6; i++) {
      var cardRow = [];

      for (var j = 0; j < 5; j++) {
        // generálunk egy számot 0 és availableFigures.length - 1 között
        var index = Math.floor(Math.random() * availableFigures.length);
        cardRow.push({ isUp: false, figure: availableFigures[index] });
        availableFigures.splice(index, 1);
      }

      this.cards.push(cardRow);
    }
  },
  methods: {
    getFigureCssUrl(figure) {
      return "url('images/" + figure + ".jpg')";
    },
    onCardClick: function (rowIndex, colIndex) {
      var card = this.cards[rowIndex][colIndex];

      // még nem volt kártya felfordítva
      if (this.firstCard == null) {
        this.firstCard = card;
        card.isUp = true;
      }
      // már egy kártya fel volt fordítva
      else if (this.secondCard == null) {
        if (card == this.firstCard)
          return;

        this.secondCard = card;
        card.isUp = true;
      }
      // már két kártya fel van fordítva
      else {
        // megtaláltak-egy párt
        if (this.firstCard.figure == this.secondCard.figure) {
          // eltüntetjük a felfordított kártyákat
          this.firstCard.isUp = null;
          this.secondCard.isUp = null;
        }
        else {
          // lefordítjuk a felfordított kártyákat
          this.firstCard.isUp = false;
          this.secondCard.isUp = false;
        }

        // ha a két felfordított kártya közül valamelyikre kattintottak
        if (card == this.firstCard || card == this.secondCard) {
          this.firstCard = null;
        }
        // ha NEM a két felfordított kártya közül valamelyikre kattintottak
        else {
          this.firstCard = card;
          card.isUp = true;
        }

        this.secondCard = null;

        this.stepCount++;
      }
    }
  }
})