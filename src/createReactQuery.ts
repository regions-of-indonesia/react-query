import { RegionsOfIndonesiaClient } from "@regions-of-indonesia/client";

import { useQuery } from "@tanstack/react-query";
import type { QueryFunctionContext as Context } from "@tanstack/react-query";

type QueryKey = [string, string];

const iskey = (value: unknown): value is string => typeof value === "string" && value !== "",
  validkey = <T>(value: unknown, callback: (value: string) => T) => (iskey(value) ? callback(value) : ([] as unknown as QueryKey));

const initial = <QK, QF>(queryKey: QK, queryFn: QF, enabled?: boolean) => ({ queryKey, queryFn, enabled });

const createReactQuery = (client: RegionsOfIndonesiaClient = new RegionsOfIndonesiaClient(), options: { name?: string } = {}) => {
  const { name = "regions-of-indonesia" } = options,
    named = (value: string) => (typeof name === "string" ? [name, value].join("/") : value),
    keyname = {
      ps: named("provinces"),
      p: named("province"),
      ds: named("districts"),
      d: named("district"),
      ss: named("subdistricts"),
      s: named("subdistrict"),
      vs: named("villages"),
      v: named("village"),

      f: named("search"),
      fP: named("search/provinces"),
      fD: named("search/districts"),
      fS: named("search/subdistricts"),
      fV: named("search/villages"),
    },
    key = {
      ps: [keyname.ps],
      p: (code: string) => [keyname.p, code] as QueryKey,
      ds: (provinceCode: string) => [keyname.ds, provinceCode] as QueryKey,
      d: (code: string) => [keyname.d, code] as QueryKey,
      ss: (districtCode: string) => [keyname.ss, districtCode] as QueryKey,
      s: (code: string) => [keyname.s, code] as QueryKey,
      vs: (subdistrictCode: string) => [keyname.vs, subdistrictCode] as QueryKey,
      v: (code: string) => [keyname.v, code] as QueryKey,

      f: (name: string) => [keyname.f, name] as QueryKey,
      fP: (name: string) => [keyname.fP, name] as QueryKey,
      fD: (name: string) => [keyname.fD, name] as QueryKey,
      fS: (name: string) => [keyname.fS, name] as QueryKey,
      fV: (name: string) => [keyname.fV, name] as QueryKey,
    },
    fetcher = {
      ps: () => client.province.find(),
      p: <C extends Context<QueryKey>>(ctx: C) => client.province.findByCode(ctx.queryKey[1]),
      ds: <C extends Context<QueryKey>>(ctx: C) => client.district.findByProvinceCode(ctx.queryKey[1]),
      d: <C extends Context<QueryKey>>(ctx: C) => client.district.findByCode(ctx.queryKey[1]),
      ss: <C extends Context<QueryKey>>(ctx: C) => client.subdistrict.findByDistrictCode(ctx.queryKey[1]),
      s: <C extends Context<QueryKey>>(ctx: C) => client.subdistrict.findByCode(ctx.queryKey[1]),
      vs: <C extends Context<QueryKey>>(ctx: C) => client.village.findBySubdistrictCode(ctx.queryKey[1]),
      v: <C extends Context<QueryKey>>(ctx: C) => client.village.findByCode(ctx.queryKey[1]),

      f: <C extends Context<QueryKey>>(ctx: C) => client.search(ctx.queryKey[1]),
      fP: <C extends Context<QueryKey>>(ctx: C) => client.province.search(ctx.queryKey[1]),
      fD: <C extends Context<QueryKey>>(ctx: C) => client.district.search(ctx.queryKey[1]),
      fS: <C extends Context<QueryKey>>(ctx: C) => client.subdistrict.search(ctx.queryKey[1]),
      fV: <C extends Context<QueryKey>>(ctx: C) => client.village.search(ctx.queryKey[1]),
    };

  return {
    useProvinces: () => useQuery(initial(key.ps, fetcher.ps)),
    useProvince: (code?: string) => useQuery(initial(validkey(code, key.p), fetcher.p, iskey(code))),
    useDistricts: (provinceCode?: string) => useQuery(initial(validkey(provinceCode, key.ds), fetcher.ds, iskey(provinceCode))),
    useDistrict: (code?: string) => useQuery(initial(validkey(code, key.d), fetcher.d, iskey(code))),
    useSubdistricts: (districtCode?: string) => useQuery(initial(validkey(districtCode, key.ss), fetcher.ss, iskey(districtCode))),
    useSubdistrict: (code?: string) => useQuery(initial(validkey(code, key.s), fetcher.s, iskey(code))),
    useVillages: (subdistrictCode?: string) => useQuery(initial(validkey(subdistrictCode, key.vs), fetcher.vs, iskey(subdistrictCode))),
    useVillage: (code?: string) => useQuery(initial(validkey(code, key.v), fetcher.v, iskey(code))),

    useSearch: (name?: string) => useQuery(initial(validkey(name, key.f), fetcher.f, iskey(name))),
    useSearchProvinces: (name?: string) => useQuery(initial(validkey(name, key.fP), fetcher.fP, iskey(name))),
    useSearchDistricts: (name?: string) => useQuery(initial(validkey(name, key.fD), fetcher.fD, iskey(name))),
    useSearchSubdistricts: (name?: string) => useQuery(initial(validkey(name, key.fS), fetcher.fS, iskey(name))),
    useSearchVillages: (name?: string) => useQuery(initial(validkey(name, key.fV), fetcher.fV, iskey(name))),
  };
};

export default createReactQuery;
