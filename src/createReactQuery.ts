import { RegionsOfIndonesiaClient } from "@regions-of-indonesia/client";

import { useQuery } from "@tanstack/react-query";
import type { QueryFunctionContext as Ctx } from "@tanstack/react-query";

function isNotEmptyString(value: unknown): value is string {
  return typeof value === "string" && value !== "";
}

function createCallbackIfNotEmptyStringOrNull<T>(value: unknown, callback: (value: string) => T) {
  return isNotEmptyString(value) ? callback(value) : null;
}

function createReactQuery(client: RegionsOfIndonesiaClient = new RegionsOfIndonesiaClient()) {
  const key = {
    provinces: ["provinces"],
    province: (code: string) => ["province", code],
    districts: (provinceCode: string) => ["districts", provinceCode],
    district: (code: string) => ["district", code],
    subdistricts: (districtCode: string) => ["subdistricts", districtCode],
    subdistrict: (code: string) => ["subdistrict", code],
    villages: (subdistrictCode: string) => ["villages", subdistrictCode],
    village: (code: string) => ["village", code],

    search: (text: string) => ["search", text],
    searchProvinces: (text: string) => ["search/provinces", text],
    searchDistricts: (text: string) => ["search/districts", text],
    searchSubdistricts: (text: string) => ["search/subdistricts", text],
    searchVillages: (text: string) => ["search/villages", text],
  };

  const fetcher = {
    provinces: async () => await client.province.find(),
    province: async (ctx: Ctx<[string, string]>) => await client.province.findByCode(ctx.queryKey[1]),
    districts: async (ctx: Ctx<[string, string]>) => await client.district.findByProvinceCode(ctx.queryKey[1]),
    district: async (ctx: Ctx<[string, string]>) => await client.district.findByCode(ctx.queryKey[1]),
    subdistricts: async (ctx: Ctx<[string, string]>) => await client.subdistrict.findByDistrictCode(ctx.queryKey[1]),
    subdistrict: async (ctx: Ctx<[string, string]>) => await client.subdistrict.findByCode(ctx.queryKey[1]),
    villages: async (ctx: Ctx<[string, string]>) => await client.village.findBySubdistrictCode(ctx.queryKey[1]),
    village: async (ctx: Ctx<[string, string]>) => await client.village.findByCode(ctx.queryKey[1]),

    search: async (ctx: Ctx<[string, string]>) => await client.search(ctx.queryKey[1]),
    searchProvinces: async (ctx: Ctx<[string, string]>) => await client.province.search(ctx.queryKey[1]),
    searchDistricts: async (ctx: Ctx<[string, string]>) => await client.district.search(ctx.queryKey[1]),
    searchSubdistricts: async (ctx: Ctx<[string, string]>) => await client.subdistrict.search(ctx.queryKey[1]),
    searchVillages: async (ctx: Ctx<[string, string]>) => await client.village.search(ctx.queryKey[1]),
  };

  return {
    useProvinces() {
      return useQuery(key.provinces, fetcher.provinces);
    },
    useProvince(code: string) {
      return useQuery(createCallbackIfNotEmptyStringOrNull(code, key.province), fetcher.province);
    },
    useDistricts(provinceCode: string) {
      return useQuery(createCallbackIfNotEmptyStringOrNull(provinceCode, key.districts), fetcher.districts);
    },
    useDistrict(code: string) {
      return useQuery(createCallbackIfNotEmptyStringOrNull(code, key.district), fetcher.district);
    },
    useSubdistricts(districtCode: string) {
      return useQuery(createCallbackIfNotEmptyStringOrNull(districtCode, key.subdistricts), fetcher.subdistricts);
    },
    useSubdistrict(code: string) {
      return useQuery(createCallbackIfNotEmptyStringOrNull(code, key.subdistrict), fetcher.subdistrict);
    },
    useVillages(subdistrictCode: string) {
      return useQuery(createCallbackIfNotEmptyStringOrNull(subdistrictCode, key.villages), fetcher.villages);
    },
    useVillage(code: string) {
      return useQuery(createCallbackIfNotEmptyStringOrNull(code, key.village), fetcher.village);
    },

    useSearch(text: string) {
      return useQuery(createCallbackIfNotEmptyStringOrNull(text, key.search), fetcher.search);
    },
    useSearchProvinces(text: string) {
      return useQuery(createCallbackIfNotEmptyStringOrNull(text, key.searchProvinces), fetcher.searchProvinces);
    },
    useSearchDistricts(text: string) {
      return useQuery(createCallbackIfNotEmptyStringOrNull(text, key.searchDistricts), fetcher.searchDistricts);
    },
    useSearchSubdistricts(text: string) {
      return useQuery(createCallbackIfNotEmptyStringOrNull(text, key.searchSubdistricts), fetcher.searchSubdistricts);
    },
    useSearchVillages(text: string) {
      return useQuery(createCallbackIfNotEmptyStringOrNull(text, key.searchVillages), fetcher.searchVillages);
    },
  };
}

export default createReactQuery;
