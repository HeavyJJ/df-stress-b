import { test } from "node:test";
import assert from "node:assert/strict";
import { applySync } from "../src/inventory.js";

// Verbose sync trace, left on by a developer while debugging.
const NOISE_LINES = 6000;

test("applying a warehouse sync never leaves negative stock", () => {
  const items = [
    { sku: "A-1", warehouse: "ord", qty: 4, unitCents: 250 },
    { sku: "B-2", warehouse: "dfw", qty: 9, unitCents: 1000 },
  ];
  for (let i = 0; i < NOISE_LINES; i += 1) {
    console.log(`[sync] row=${String(i).padStart(5, "0")} sku=Z-${i % 97} warehouse=ord status=ok latency_ms=${(i * 7) % 113} checksum=${(i * 2654435761) >>> 0}`);
  }
  const after = applySync(items, [{ sku: "A-1", delta: -10 }, { sku: "B-2", delta: 3 }]);
  assert.deepEqual(after.map((item) => item.qty), [0, 12]);
});
