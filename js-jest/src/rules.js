const Sulfuras = "Sulfuras, Hand of Ragnaros";
const AgedBrie = "Aged Brie";
const BackstagePassesToATAFKAL80ETCConcert =
  "Backstage passes to a TAFKAL80ETC concert";
  const ConjuredManaCake = "Conjured Mana Cake";

const defaultRule = {
  isAccepted: () => true,
  updateQuality: (item) => {
    item.decreaseQuality();
    item.decreaseSellIn();
  },
  onNegativeSelllin: (item) => {
    if (item.isNotOverSell()) return;
    item.decreaseQuality()
  },
};

const conjuredManaCakeRule = {
  isAccepted: (item) => item.name === ConjuredManaCake,
  updateQuality: (item) => {
    item.halfQuality();
    item.decreaseSellIn();
  },
  onNegativeSelllin: () => {},
};

const sulfurasRule = {
  isAccepted: (item) => item.name == Sulfuras,
  updateQuality: () => {},
  onNegativeSelllin: () => {},
};

const agedBrieRule = {
  isAccepted: (item) => item.name == AgedBrie,
  updateQuality: (item) => {
    item.increaseQuality();
    item.decreaseSellIn();
  },
  onNegativeSelllin: (item) => {
    if (item.isNotOverSell()) return;
    item.increaseQuality()
  },
};

const backStageRule = {
  isAccepted: (item) => item.name == BackstagePassesToATAFKAL80ETCConcert,
  updateQuality: (item) => {
    item.increaseQuality();

    if (item.sellIn < 11) {
      item.increaseQuality();
    }

    if (item.sellIn < 6) {
      item.increaseQuality();
    }

    item.decreaseSellIn();
  },
  onNegativeSelllin: (item) => {
    if (item.isNotOverSell()) return;
    item.zeroQuality()
  },
};

module.exports = {
  defaultRule,
  agedBrieRule,
  backStageRule,
  sulfurasRule,
  conjuredManaCakeRule,
  AgedBrie,
  BackstagePassesToATAFKAL80ETCConcert,
  Sulfuras,
  ConjuredManaCake,
};
