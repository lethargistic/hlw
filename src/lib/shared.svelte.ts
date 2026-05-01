import {StarterKit} from "@tiptap/starter-kit";
import BubbleMenu from "@tiptap/extension-bubble-menu";
import {getSchema} from "@tiptap/core";
import * as v from 'valibot'

export type Nullable<T> = T | null;
export const absc = <T>(obj: any) => obj as unknown as T;

export const contentExtensions = [
    StarterKit
]
export const getEditorExtensions = (bubbleMenu: HTMLElement) => [
        ...contentExtensions,
        BubbleMenu.configure({
            element: bubbleMenu,
        }),
    ]
export const schema = getSchema(contentExtensions);

export const UPPER_AND_LOWER_CASE_ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const validateAlphanumNExtra = v.regex(/^[a-zA-Z0-9._~-]*$/)

export const MAX_CUSTOM_SLUG_LEN = 32;
// i do think some people might find 8 a bit annoying and
// i'm going to rate limit edit code entries anyway so I think 6 is okay
export const MIN_CUSTOM_EDIT_CODE_LEN = 6;
export const MAX_CUSTOM_EDIT_CODE_LEN = 32;

export const postSchema = v.object({
    slug: v.pipe(v.string(), v.maxLength(MAX_CUSTOM_SLUG_LEN), validateAlphanumNExtra),
    // pro tip: no one will guess ⋆✴︎˚｡⋆✴︎︎ as an edit code
    edit_code: v.pipe(
        v.string(),
        v.maxLength(MAX_CUSTOM_EDIT_CODE_LEN)),
    content: v.pipe(v.string(), v.nonEmpty(), v.transform(JSON.parse))
})