const {
  defaultRule,
  agedBrieRule,
  backStageRule,
  sulfurasRule,
  conjuredManaCakeRule,
} = require("./rules");

class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  increaseQuality() {
    if (this.quality < 50) {
      this.quality = this.quality + 1;
    }
  }

  decreaseQuality() {
    if (this.quality > 0) {
      this.quality = this.quality - 1;
    }
  }

  zeroQuality() {
    this.quality = 0;
  }

  halfQuality() {
    this.quality = this.quality / 2;
  }

  decreaseSellIn() {
    this.sellIn = this.sellIn - 1;
  }

  isNotOverSell() {
    return this.sellIn >= 0;
  }
}

class Shop {
  constructor(
    items = [],
    rules = [
      agedBrieRule,
      backStageRule,
      sulfurasRule,
      conjuredManaCakeRule,
      defaultRule,
    ]
  ) {
    this.items = items;
    this.rules = rules;
  }

  updateQuality() {
    this.items.forEach((item) => {
      const rule = this.rules.find((rule) => rule.isAccepted(item));
      rule.updateQuality(item);
      rule.onNegativeSelllin(item);
    });

    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
