import {error as sverror} from "@sveltejs/kit";
import {supabaseAdmin} from "$lib/utils/supabaseAdminClient";

export const load = async ({params}) => {
    const {data: post, error} = await supabaseAdmin
        .from('posts')
        .select('slug, content')
        .eq('slug', params.slug)
        .single();

    if (error && error.code !== 'PGRST116') sverror(500, {message: 'Couldn\'t check if url is available'});
    if (!post) sverror(404, {message: 'Not found'});

    return { ...post };
}