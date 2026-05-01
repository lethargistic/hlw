// TODO now: cfg to limit on client
import {getRedis} from "$lib/utils/getRedis";

const redis = getRedis();

export const ratelimit = async (ip: string,
                         limit: number, windowSeconds: number)=> {
    const key = `ratelimit:${ip}`
    const requests = await redis.incr(key);
    if (requests === 1) await redis.expire(key, windowSeconds)

    return requests > limit;
}