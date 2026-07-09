import { Redis } from "@upstash/redis";

const cache = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export const RedisCache = {
  fetch: async (key: string): Promise<unknown | null> => {
    try {
      //--check if cache exists
      const cached = (await cache.exists(key)) ? await cache.get(key) : null;

      if (!cached) return null;

      return cached;
    } catch (error) {
      console.log("cache error: ", error);
      return null;
    }
  },
  save: async (
    key: string,
    data?: string | number | object,
    ttl: number = 1800,
  ) => {
    try {
      //--cache data to memory
      if (!key || typeof data === "undefined") return false;
      if (typeof ttl !== "number") return false;

      await cache.set(key, data, {
        ex: ttl,
      }); // expiration time in seconds (30 minutes)

      return true;
    } catch (error) {
      console.log("save cache error: ", error);
      return false;
    }
  },
  delete: async (key: string | string[] = "", is_array = false) => {
    try {
      //--delete cached data from memory
      if (!key) return false;

      if (is_array && typeof key === "object") {
        key.forEach(async (k) => {
          if (await cache.exists(k)) {
            await cache.del(k);
          }
        });
      } else {
        if (await cache.exists(key as string)) {
          await cache.del(key as string);
        }
      }
      return true;
    } catch (error) {
      console.log("delete cache error: ", error);
      return false;
    }
  },
};
