import { test } from "node:test";
import assert from "node:assert/strict";
import { byWarehouse, lowStock, stockValueCents, totalUnits } from "../src/inventory.js";

const ITEMS = [
  { sku: "A-1", warehouse: "ord", qty: 4, unitCents: 250 },
  { sku: "B-2", warehouse: "dfw", qty: 0, unitCents: 1000 },
  { sku: "C-3", warehouse: "ord", qty: 12, unitCents: 99 },
];

test("totals units", () => {
  assert.equal(totalUnits(ITEMS), 16);
});

test("values stock in cents", () => {
  assert.equal(stockValueCents(ITEMS), 4 * 250 + 0 + 12 * 99);
});

test("lists low-stock SKUs", () => {
  assert.deepEqual(lowStock(ITEMS, 2), ["B-2"]);
});

test("groups SKUs by warehouse", () => {
  assert.deepEqual(byWarehouse(ITEMS), { ord: ["A-1", "C-3"], dfw: ["B-2"] });
});
