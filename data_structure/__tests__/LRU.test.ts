import { LRUCache } from "../LRU";

describe("LRUCache", () => {
  it("throws on invalid capacity", () => {
    expect(() => new LRUCache(0)).toThrow(RangeError);
    expect(() => new LRUCache(-1)).toThrow(RangeError);
    expect(() => new LRUCache(1.5)).toThrow(RangeError);
    expect(() => new LRUCache(NaN)).toThrow(RangeError);
  });

  it("returns null for missing keys", () => {
    const cache = new LRUCache<string, number>(2);
    expect(cache.get("missing")).toBeNull();
  });

  it("stores and retrieves values", () => {
    const cache = new LRUCache<string, number>(2);
    cache.update("a", 1);
    cache.update("b", 2);
    expect(cache.get("a")).toBe(1);
    expect(cache.get("b")).toBe(2);
    expect(cache.size).toBe(2);
  });

  it("keeps keys ordered from most to least recently used", () => {
    const cache = new LRUCache<string, number>(3);
    cache.update("a", 1);
    cache.update("b", 2);
    cache.update("c", 3);
    expect(cache.keys()).toEqual(["c", "b", "a"]);

    cache.get("a");
    expect(cache.keys()).toEqual(["a", "c", "b"]);
  });

  it("evicts the least recently used key when full", () => {
    const cache = new LRUCache<string, number>(2);
    cache.update("a", 1);
    cache.update("b", 2);
    cache.update("c", 3);

    expect(cache.get("a")).toBeNull();
    expect(cache.keys()).toEqual(["c", "b"]);
    expect(cache.size).toBe(2);
  });

  it("get refreshes recency so the key survives eviction", () => {
    const cache = new LRUCache<string, number>(2);
    cache.update("a", 1);
    cache.update("b", 2);
    cache.get("a");
    cache.update("c", 3);

    expect(cache.get("a")).toBe(1);
    expect(cache.get("b")).toBeNull();
  });

  it("updating an existing key overwrites the value without evicting", () => {
    const cache = new LRUCache<string, number>(2);
    cache.update("a", 1);
    cache.update("b", 2);
    cache.update("a", 10);

    expect(cache.size).toBe(2);
    expect(cache.get("a")).toBe(10);
    expect(cache.keys()).toEqual(["a", "b"]);
  });
});
