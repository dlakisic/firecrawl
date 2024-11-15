import { Logger } from "../../src/lib/logger";
import { SearchResult } from "../../src/lib/entities";
import { googleSearch } from "./googlesearch";
import { fireEngineMap } from "./fireEngine";
import { searchapi_search } from "./searchapi";
import { serper_search } from "./serper";

export async function search({
  query,
  advanced = false,
  num_results = 7,
  tbs = null,
  filter = null,
  lang = "en",
  country = "us",
  location = undefined,
  proxy = null,
  sleep_interval = 0,
  timeout = 5000,
  tbm = null,
}: {
  query: string;
  advanced?: boolean;
  num_results?: number;
  tbs?: string;
  filter?: string;
  lang?: string;
  country?: string;
  location?: string;
  proxy?: string;
  sleep_interval?: number;
  timeout?: number;
  tbm?: string;
}): Promise<SearchResult[]> {
  try {
    if (process.env.SEARCHAPI_API_KEY) {
      return await searchapi_search(query, {
        num_results,
        tbs,
        filter,
        lang,
        country,
        location
      });
    }
    if (process.env.SERPER_API_KEY) {
      return await serper_search(query, {
        num_results,
        tbs,
        filter,
        lang,
        country,
        location,
      });
    }
    return await googleSearch(
      query,
      advanced,
      num_results,
      tbs,
      filter,
      lang,
      country,
      proxy,
      sleep_interval,
      timeout,
      tbm
    );
  } catch (error) {
    Logger.error(`Error in search function: ${error}`);
    return [];
  }
}
