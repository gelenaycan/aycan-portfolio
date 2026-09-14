import test from "node:test";
import assert from "node:assert/strict";
import { handler } from "../netlify/functions/aycan-chat.js";

const post = (body) => handler({ httpMethod: "POST", body });
test("rejects unsupported methods and invalid input before calling the API", async () => {
  assert.equal((await handler({ httpMethod: "GET" })).statusCode, 405);
  for (const body of [
    "{",
    "{}",
    "null",
    '{"message":42}',
    '{"message":" "}',
    JSON.stringify({ message: "a".repeat(1501) }),
  ]) {
    assert.equal((await post(body)).statusCode, 400);
  }
  assert.equal((await post("a".repeat(10001))).statusCode, 413);
});
test("handles unavailable configuration, upstream failures, and success", async () => {
  const originalKey = process.env.OPENAI_API_KEY;
  const originalFetch = globalThis.fetch;
  try {
    delete process.env.OPENAI_API_KEY;
    assert.equal((await post('{"message":"Experience?"}')).statusCode, 503);
    process.env.OPENAI_API_KEY = "unit-test-placeholder";
    globalThis.fetch = async (_, options) => {
      const body = JSON.parse(options.body);
      assert.equal(body.store, false);
      assert.match(body.messages[0].content, /FPT Industrial/);
      assert.match(body.messages[0].content, /three-user/);
      return {
        ok: true,
        json: async () => ({
          choices: [{ message: { content: "A résumé-grounded reply." } }],
        }),
      };
    };
    const success = await post('{"message":"Experience?"}');
    assert.equal(success.statusCode, 200);
    assert.equal(JSON.parse(success.body).reply, "A résumé-grounded reply.");
    for (const status of [429, 500]) {
      globalThis.fetch = async () => ({ ok: false, status });
      assert.equal(
        (await post('{"message":"Hello"}')).statusCode,
        status === 429 ? 429 : 502,
      );
    }
    globalThis.fetch = async () => ({ ok: true, json: async () => ({}) });
    assert.equal((await post('{"message":"Hello"}')).statusCode, 502);
    globalThis.fetch = async () => {
      throw new Error("timeout");
    };
    assert.equal((await post('{"message":"Hello"}')).statusCode, 502);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalKey === undefined) delete process.env.OPENAI_API_KEY;
    else process.env.OPENAI_API_KEY = originalKey;
  }
});
