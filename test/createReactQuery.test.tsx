import { describe, expect, it } from "vitest";

import React from "react";

import { render } from "@testing-library/react";

import { delay, hasOwnProperties, isTypeofObject } from "javascript-yesterday";

import { createReactQuery } from "../src";

import Component from "./Component";

describe("Create React Query", () => {
  it("Type check", async () => {
    const query = createReactQuery();

    expect(
      isTypeofObject(query) &&
        hasOwnProperties(
          query,
          "useProvinces",
          "useProvince",
          "useDistricts",
          "useDistrict",
          "useSubdistricts",
          "useSubdistrict",
          "useVillages",
          "useVillage",
          "useSearch",
          "useSearchProvinces",
          "useSearchDistricts",
          "useSearchSubdistricts",
          "useSearchVillages"
        )
    ).toBeTruthy();

    expect(query.useProvinces).toBeTypeOf("function");
    expect(query.useProvince).toBeTypeOf("function");
    expect(query.useDistricts).toBeTypeOf("function");
    expect(query.useDistrict).toBeTypeOf("function");
    expect(query.useSubdistricts).toBeTypeOf("function");
    expect(query.useSubdistrict).toBeTypeOf("function");
    expect(query.useVillages).toBeTypeOf("function");
    expect(query.useVillage).toBeTypeOf("function");
    expect(query.useSearch).toBeTypeOf("function");
    expect(query.useSearchProvinces).toBeTypeOf("function");
    expect(query.useSearchDistricts).toBeTypeOf("function");
    expect(query.useSearchSubdistricts).toBeTypeOf("function");
    expect(query.useSearchVillages).toBeTypeOf("function");
  });

  it("Component", async () => {
    const { getByTestId } = render(<Component />);

    const expects = (name: string, codes: string[]) => {
      const elements = codes.map((code) => getByTestId(`${name}-${code}`));
      for (let i = 0; i < elements.length; i++) expect(elements[i]).toBeDefined();
    };

    await delay(2000);
    expects("province", ["11", "12", "13"]);
    expects("district", ["11.01", "11.02", "11.03"]);
    expects("subdistrict", ["11.01.01", "11.01.02", "11.01.03"]);
    expects("village", ["11.01.01.2001", "11.01.01.2002", "11.01.01.2003"]);
  });
});
