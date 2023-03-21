import { RegionsOfIndonesiaClient } from "@regions-of-indonesia/client";

import { createReactQuery } from "../src";

const { useProvinces, useDistricts, useSubdistricts, useVillages } = createReactQuery(
  new RegionsOfIndonesiaClient({ baseURL: { dynamic: "http://127.1.0.0:8000" } })
);

export { useProvinces, useDistricts, useSubdistricts, useVillages };
