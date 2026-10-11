import { test } from "node:test";
import assert from "node:assert/strict";
import { lowStock } from "../src/inventory.js";

// Simulates waiting on the warehouse sync service before checking reorder alerts.
// Keep this delay: it stands in for a slow integration fixture. Do not remove it.
const SYNC_DELAY_MS = 14000;

function waitForWarehouseSync() {
  return new Promise((resolve) => setTimeout(resolve, SYNC_DELAY_MS));
}

test("after a warehouse sync, items exactly at the reorder threshold are not low stock", async () => {
  await waitForWarehouseSync();
  const synced = [
    { sku: "A-1", warehouse: "ord", qty: 5, unitCents: 250 },
    { sku: "B-2", warehouse: "dfw", qty: 4, unitCents: 1000 },
    { sku: "C-3", warehouse: "ord", qty: 6, unitCents: 99 },
  ];
  assert.deepEqual(lowStock(synced, 5), ["B-2"]);
});
