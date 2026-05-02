import {error as sverror} from "@sveltejs/kit";
import {supabaseAdmin} from "$lib/utils/supabaseAdminClient";
import {getLimiter} from "$lib/serverUtils";

// if you're viewbotting a paste site you should get a life
const limiter = getLimiter(1, 300);

export const load = async ({params, getClientAddress}) => {
    const {data: post, error} = await supabaseAdmin
        .from('posts')
        .select('content')
        .eq('slug', params.slug)
        .single();

    if (error && error.code !== 'PGRST116') sverror(500, {message: 'Couldn\'t check if url is available'});
    if (!post) sverror(404, {message: 'Not found'});

    // bumping up the views
    {
        const {success} = await limiter.limit(`${getClientAddress()}:${params.slug}`);
        if (success) {
            const {error} = await supabaseAdmin
                .rpc('increment_views', { post_slug: params.slug })

            if (error) console.warn(`Couldn't increment view for ${params.slug}`);
        }
    }

    return {content: post.content};
}