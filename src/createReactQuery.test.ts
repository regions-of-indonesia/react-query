import { describe, expect, it } from "vitest";

import createReactQuery from "./createReactQuery";

describe("Create", () => {
  it("Typeof object", async () => {
    const query = createReactQuery();

    expect(query).toBeTypeOf("object");
  });
});
