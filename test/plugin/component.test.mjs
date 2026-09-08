import assert from "node:assert/strict";
import test from "node:test";

import { definition, handle } from "../../build/plugin/component.js";

test("definition exposes the TypeScript counter", () => {
  const pages = JSON.parse(definition());
  assert.equal(pages.length, 1);
  assert.equal(pages[0].id, "ts-counter");
  assert.equal(pages[0].body.kind, "counter");
});

test("handle preserves tenant and user context", () => {
  const request = {
    method: "POST",
    path: "/echo",
    query: null,
    body: "hello",
    tenant_id: "tenant-a",
    user_id: "user-a",
  };
  const response = JSON.parse(handle(JSON.stringify(request)));
  const body = JSON.parse(response.body);

  assert.equal(response.status, 200);
  assert.equal(response.content_type, "application/json");
  assert.deepEqual(body.request, request);
});
