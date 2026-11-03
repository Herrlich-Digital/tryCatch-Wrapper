import { describe, expect, test } from "bun:test";
import { tryCatch } from "./index.ts";

describe("tryCatch", () => {
  test("liefert data und error null bei Erfolg", async () => {
    const result = await tryCatch(Promise.resolve(42));
    expect(result).toEqual({ data: 42, error: null });
  });

  test("liefert error und data null bei Fehler", async () => {
    const error = new Error("kaputt");
    const result = await tryCatch(Promise.reject(error));
    expect(result).toEqual({ data: null, error });
  });

  test("reicht auch Nicht-Error-Werte als error durch", async () => {
    const result = await tryCatch<number, string>(Promise.reject("nope"));
    expect(result.error).toBe("nope");
    expect(result.data).toBeNull();
  });
});
