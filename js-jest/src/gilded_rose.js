class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const AgedBrie = "Aged Brie";
const BackstagePassesToATAFKAL80ETCConcert =
  "Backstage passes to a TAFKAL80ETC concert";
const Sulfuras = "Sulfuras, Hand of Ragnaros";
const ConjuredManaCake = "Conjured Mana Cake";

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name === ConjuredManaCake) {
        this.items[i].quality = this.items[i].quality / 2;
        this.decreaseSellIn(i);
        continue;
      }

      if (
        this.items[i].name != AgedBrie &&
        this.items[i].name != BackstagePassesToATAFKAL80ETCConcert
      ) {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != Sulfuras) {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (this.items[i].name == BackstagePassesToATAFKAL80ETCConcert) {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      this.decreaseSellIn(i)
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != AgedBrie) {
          if (this.items[i].name != BackstagePassesToATAFKAL80ETCConcert) {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != Sulfuras) {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality =
              this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }

  decreaseSellIn(i) {
    if (this.items[i].name != Sulfuras) {
      this.items[i].sellIn = this.items[i].sellIn - 1;
    }
  }
}

module.exports = {
  Item,
  Shop,
  AgedBrie,
  BackstagePassesToATAFKAL80ETCConcert,
  Sulfuras,
  ConjuredManaCake,
};
