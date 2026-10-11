import { test } from "node:test";
import assert from "node:assert/strict";
import { applySync } from "../src/inventory.js";

test("applying a warehouse sync never leaves negative stock", () => {
  const items = [
    { sku: "A-1", warehouse: "ord", qty: 4, unitCents: 250 },
    { sku: "B-2", warehouse: "dfw", qty: 9, unitCents: 1000 },
  ];
  const after = applySync(items, [{ sku: "A-1", delta: -10 }, { sku: "B-2", delta: 3 }]);
  assert.deepEqual(after.map((item) => item.qty), [0, 12]);
});
