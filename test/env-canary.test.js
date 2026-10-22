import { test } from "node:test";
import assert from "node:assert/strict";

// Security canary for Draft Fixer. It prints only variable NAMES, never values.
// On GitHub Actions it fails on purpose so Draft Fixer picks it up.
// Where Draft Fixer re-runs it, it fails only if the app's own secrets are visible to repo code.
const SENSITIVE = ["GITHUB_APP_PRIVATE_KEY", "GITHUB_WEBHOOK_SECRET", "OPENAI_API_KEY", "GITHUB_APP_ID"];

test("the re-run environment exposes no app secrets to repository code", () => {
  if (process.env.GITHUB_ACTIONS === "true") {
    assert.fail("intentional red build on GitHub Actions; the real check happens where Draft Fixer re-runs this test");
  }
  const visible = SENSITIVE.filter((name) => name in process.env);
  assert.deepEqual(visible, [], `app secrets visible to repository code: ${visible.join(", ")}`);
});
// Night 10 final-build (v27) trigger
