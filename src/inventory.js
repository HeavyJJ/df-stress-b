// Inventory helpers. An item is { sku, warehouse, qty, unitCents }.

/** Total units across all items. */
export function totalUnits(items) {
  return items.reduce((sum, item) => sum + item.qty, 0);
}

/** Stock value in integer cents: sum of qty * unitCents. */
export function stockValueCents(items) {
  return items.reduce((sum, item) => sum + item.qty * item.unitCents, 0);
}

/** SKUs whose qty is strictly below the threshold, in input order. */
export function lowStock(items, threshold) {
  return items.filter((item) => item.qty < threshold).map((item) => item.sku);
}

/** Map of warehouse -> SKUs stored there, in input order. */
export function byWarehouse(items) {
  const groups = Object.groupBy(items, (item) => item.warehouse);
  return Object.fromEntries(Object.entries(groups).map(([warehouse, list]) => [warehouse, list.map((item) => item.sku)]));
}
