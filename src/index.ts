export type * from "@regions-of-indonesia/types";
import type { Client } from "@regions-of-indonesia/client";

import { useQuery } from "@tanstack/react-query";
import type { QueryFunctionContext as CTX } from "@tanstack/react-query";

type QueryKey = string[];

const isCode = (value: unknown) => typeof value === "string" && value !== "";
const isName = (value: unknown) => typeof value === "string" && value !== "";

/**
 *
 * @param client Regions of Indonesia client
 * @returns hooks
 */
const create = (client: Client) => {
  const name = "regions-of-indonesia";

  const str_provinces = "provinces";
  const str_districts = "districts";
  const str_subdistricts = "subdistricts";
  const str_villages = "villages";
  const str_region = "region";
  const str_search = "search";

  const name_provinces = `${name}/${str_provinces}`;
  const name_districts = `${name}/${str_districts}`;
  const name_subdistricts = `${name}/${str_subdistricts}`;
  const name_villages = `${name}/${str_villages}`;
  const name_region = `${name}/${str_region}`;
  const name_search = `${name}/${str_search}`;

  const fetcher_provinces = () => client.province.find();
  const fetcher_province = (ctx: CTX<QueryKey>) => client.province.find.by(ctx.queryKey[1]);
  const fetcher_districts = (ctx: CTX<QueryKey>) => client.district.find(ctx.queryKey[1]);
  const fetcher_district = (ctx: CTX<QueryKey>) => client.district.find.by(ctx.queryKey[1]);
  const fetcher_subdistricts = (ctx: CTX<QueryKey>) => client.subdistrict.find(ctx.queryKey[1]);
  const fetcher_subdistrict = (ctx: CTX<QueryKey>) => client.subdistrict.find.by(ctx.queryKey[1]);
  const fetcher_villages = (ctx: CTX<QueryKey>) => client.village.find(ctx.queryKey[1]);
  const fetcher_village = (ctx: CTX<QueryKey>) => client.village.find.by(ctx.queryKey[1]);
  const fetcher_region = (ctx: CTX<QueryKey>) => client.region(ctx.queryKey[1]);
  const fetcher_search = (ctx: CTX<QueryKey>) => client.search(ctx.queryKey[1]);
  const fetcher_search_provinces = (ctx: CTX<QueryKey>) => client.search.provinces(ctx.queryKey[1]);
  const fetcher_search_districts = (ctx: CTX<QueryKey>) => client.search.districts(ctx.queryKey[1]);
  const fetcher_search_subdistricts = (ctx: CTX<QueryKey>) => client.search.subdistricts(ctx.queryKey[1]);
  const fetcher_search_villages = (ctx: CTX<QueryKey>) => client.search.villages(ctx.queryKey[1]);

  return {
    useProvinces: () => useQuery({ queryKey: [name_provinces], queryFn: fetcher_provinces }),
    useProvince: (code: string) => useQuery({ queryKey: [name_provinces, code], enabled: isCode(code), queryFn: fetcher_province }),
    useDistricts: (parent: string) =>
      useQuery({ queryKey: [name_provinces, parent, str_districts], enabled: isCode(parent), queryFn: fetcher_districts }),
    useDistrict: (code: string) => useQuery({ queryKey: [name_districts, code], enabled: isCode(code), queryFn: fetcher_district }),
    useSubdistricts: (parent: string) =>
      useQuery({ queryKey: [name_districts, parent, str_subdistricts], enabled: isCode(parent), queryFn: fetcher_subdistricts }),
    useSubdistrict: (code: string) =>
      useQuery({ queryKey: [name_subdistricts, code], enabled: isCode(code), queryFn: fetcher_subdistrict }),
    useVillages: (parent: string) =>
      useQuery({ queryKey: [name_subdistricts, parent, str_villages], enabled: isCode(parent), queryFn: fetcher_villages }),
    useVillage: (code: string) => useQuery({ queryKey: [name_villages, code], enabled: isCode(code), queryFn: fetcher_village }),
    useRegion: (code: string) => useQuery({ queryKey: [name_region, code], enabled: isCode(code), queryFn: fetcher_region }),
    useSearch: (name: string) => useQuery({ queryKey: [name_search, name], enabled: isName(name), queryFn: fetcher_search }),
    useSearchProvinces: (name: string) =>
      useQuery({ queryKey: [name_search, name, str_provinces], enabled: isName(name), queryFn: fetcher_search_provinces }),
    useSearchDistricts: (name: string) =>
      useQuery({ queryKey: [name_search, name, str_districts], enabled: isName(name), queryFn: fetcher_search_districts }),
    useSearchSubdistricts: (name: string) =>
      useQuery({ queryKey: [name_search, name, str_subdistricts], enabled: isName(name), queryFn: fetcher_search_subdistricts }),
    useSearchVillages: (name: string) =>
      useQuery({ queryKey: [name_search, name, str_villages], enabled: isName(name), queryFn: fetcher_search_villages }),
  };
};

export { create };
