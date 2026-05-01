// TODO now: cfg to limit on client
import {getRedis} from "$lib/utils/getRedis";
import { Ratelimit } from "@upstash/ratelimit"

const redis = getRedis();

export const getLimiter = (limit: number, windowSeconds: number) => new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(limit, `${windowSeconds} s`),
})