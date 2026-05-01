import {form, getRequestEvent} from "$app/server";
import {supabaseAdmin} from "$lib/utils/supabaseAdminClient";
import {
    MIN_CUSTOM_EDIT_CODE_LEN, postSchema,
    schema, UPPER_AND_LOWER_CASE_ALPHABET,
} from "$lib/shared.svelte";
import {invalid, redirect, error as sverror} from "@sveltejs/kit";
import {customAlphabet} from "nanoid";
import {getLimiter} from "$lib/serverUtils";

const generateToken = (len: number) => customAlphabet(UPPER_AND_LOWER_CASE_ALPHABET, len)()

const limiter = getLimiter(5, 60);

// TODO now: validate schema on client
export const createPost = form(
    postSchema,
    async ({slug, edit_code, content}) => {
        // rate limiting
        const ip = getRequestEvent().getClientAddress();
        const { success } = await limiter.limit(ip)
        if (!success) sverror(429, { message: 'Rate limit exceeded'})

        // slug
        const finalSlug = slug || generateToken(8);

        {
            const {data: exists, error} = await supabaseAdmin
                .from('posts')
                .select('slug')
                .eq('slug', finalSlug)
                .single()

            if (exists) return invalid('Slug already exists')
            if (error && error.code !== 'PGRST116') sverror(500, {message: 'Couldn\'t check slug'})
        }

        // custom slug
        const customSlug = Boolean(slug);

        // edit code
        const finalEditCode = edit_code || generateToken(10);

        // TODO now: validate edit code len on client
        if (edit_code && edit_code.length < MIN_CUSTOM_EDIT_CODE_LEN)
            return invalid('Edit code too short')

        // content
        let checker;
        try {
            checker = schema.nodeFromJSON(content);
        } catch {
            return invalid('Invalid text')
        }

        // it's loseless right?
        const cleanJSON = checker.toJSON();

        const {error} = await supabaseAdmin
            .from('posts')
            .insert({
                slug: finalSlug,
                custom_slug: customSlug,
                edit_code: finalEditCode,
                content: cleanJSON
            })

        if (error) {
            sverror(500, {message: 'Error saving post'})
        }

        redirect(303, `/${finalSlug}`);
    }
)