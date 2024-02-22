const { Shop, Item } = require("../src/gilded_rose");
const {
  AgedBrie,
  BackstagePassesToATAFKAL80ETCConcert,
  Sulfuras,
  ConjuredManaCake,
} = require("../src/rules");
describe("Gilded Rose", function () {
  it("empty list should return empty", () => {
    const gildedRose = new Shop();
    expect(gildedRose.updateQuality()).toEqual([]);
  });

  it("normal item with zero quality can not be negative", () => {
    const gildedRose = new Shop([new Item("", 0, 0)]);
    expect(gildedRose.updateQuality()).toEqual([new Item("", -1, 0)]);
    expect(gildedRose.updateQuality()).toEqual([new Item("", -2, 0)]);

    for (let i = 0; i < 100; i++) {
      gildedRose.updateQuality();
    }

    expect(gildedRose.items).toEqual([{ name: "", quality: 0, sellIn: -102 }]);
  });

  it("normal item", () => {
    const gildedRose = new Shop([new Item("", 1, 1)]);
    expect(gildedRose.updateQuality()).toEqual([new Item("", 0, 0)]);
  });

  it("normal item with sellIn lower than 0 but quality higher than 0 will decrease quality by 2", () => {
    const gildedRose = new Shop([new Item("", -1, 10)]);
    expect(gildedRose.updateQuality()).toEqual([new Item("", -2, 8)]);
  });

  it("Aged brie", () => {
    const gildedRose = new Shop([new Item(AgedBrie, 0, 0)]);
    expect(gildedRose.updateQuality()).toEqual([new Item(AgedBrie, -1, 2)]);
    expect(gildedRose.updateQuality()).toEqual([new Item(AgedBrie, -2, 4)]);

    for (let i = 0; i < 50; i++) {
      gildedRose.updateQuality();
    }

    expect(gildedRose.updateQuality()).toEqual([new Item(AgedBrie, -53, 50)]);
  });

  it("Backstage passes...", () => {
    const gildedRose = new Shop([
      new Item(BackstagePassesToATAFKAL80ETCConcert, 0, 0),
    ]);
    expect(gildedRose.updateQuality()).toEqual([
      new Item(BackstagePassesToATAFKAL80ETCConcert, -1, 0),
    ]);
    expect(gildedRose.updateQuality()).toEqual([
      new Item(BackstagePassesToATAFKAL80ETCConcert, -2, 0),
    ]);

    for (let i = 0; i < 100; i++) {
      gildedRose.updateQuality();
    }
    expect(gildedRose.updateQuality()).toEqual([
      new Item(BackstagePassesToATAFKAL80ETCConcert, -103, 0),
    ]);
  });

  it("Backstage passes with sellIn equal to 11 and quality lower than 50 will increase quality by 1", () => {
    const gildedRose = new Shop([
      new Item(BackstagePassesToATAFKAL80ETCConcert, 11, 49),
    ]);
    expect(gildedRose.updateQuality()).toEqual([
      new Item(BackstagePassesToATAFKAL80ETCConcert, 10, 50),
    ]);
  });

  it("Backstage passes with sellIn lower than 11 and quality lower than 50 will increase quality by 1", () => {
    const gildedRose = new Shop([
      new Item(BackstagePassesToATAFKAL80ETCConcert, 10, 49),
    ]);
    expect(gildedRose.updateQuality()).toEqual([
      new Item(BackstagePassesToATAFKAL80ETCConcert, 9, 50),
    ]);
  });

  it("Backstage passes with sellIn equal to 6 and quality lower than 50 will increase quality by 1", () => {
    const gildedRose = new Shop([
      new Item(BackstagePassesToATAFKAL80ETCConcert, 6, 49),
    ]);
    expect(gildedRose.updateQuality()).toEqual([
      new Item(BackstagePassesToATAFKAL80ETCConcert, 5, 50),
    ]);
  });

  it("Backstage passes with sellIn lower than 6 and quality lower than 50 will increase quality by 1", () => {
    const gildedRose = new Shop([
      new Item(BackstagePassesToATAFKAL80ETCConcert, 5, 49),
    ]);
    expect(gildedRose.updateQuality()).toEqual([
      new Item(BackstagePassesToATAFKAL80ETCConcert, 4, 50),
    ]);
  });

  it("Backstage passes with sellIn lower than 6 and quality lower than 50 will increase quality by 3", () => {
    const gildedRose = new Shop([
      new Item(BackstagePassesToATAFKAL80ETCConcert, 5, 10),
    ]);
    expect(gildedRose.updateQuality()).toEqual([
      new Item(BackstagePassesToATAFKAL80ETCConcert, 4, 13),
    ]);
  });

  it("sulfuras never reduce both quality and sellIn", () => {
    const gildedRose = new Shop([new Item(Sulfuras, 1, 1)]);

    expect(gildedRose.updateQuality()).toEqual([new Item(Sulfuras, 1, 1)]);
    expect(gildedRose.updateQuality()).toEqual([new Item(Sulfuras, 1, 1)]);
  });

  it("sulfuras with zero quality still never reduce both quality and sellIn", () => {
    const gildedRose = new Shop([new Item(Sulfuras, 0, 0)]);

    expect(gildedRose.updateQuality()).toEqual([new Item(Sulfuras, 0, 0)]);
    expect(gildedRose.updateQuality()).toEqual([new Item(Sulfuras, 0, 0)]);

    for (let i = 0; i < 100; i++) {
      gildedRose.updateQuality();
    }
    expect(gildedRose.updateQuality()).toEqual([new Item(Sulfuras, 0, 0)]);
  });

  it("Sulfuras with sellIn lower than 0 but quality higher than 0 also not decrease quality and sellIn", () => {
    const gildedRose = new Shop([new Item(Sulfuras, -1, 10)]);
    expect(gildedRose.updateQuality()).toEqual([new Item(Sulfuras, -1, 10)]);
  });

  it("conjured item will decrease quality by half", () => {
    const gildedRose = new Shop([new Item(ConjuredManaCake, 1, 10)]);
    expect(gildedRose.updateQuality()).toEqual([
      new Item(ConjuredManaCake, 0, 5),
    ]);
  });

  it("conjured item's quality can not lower than zero", () => {
    const gildedRose = new Shop([new Item(ConjuredManaCake, 1, 0)]);
    expect(gildedRose.updateQuality()).toEqual([
      new Item(ConjuredManaCake, 0, 0),
    ]);
  });
});
