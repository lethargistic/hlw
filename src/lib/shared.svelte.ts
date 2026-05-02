import {StarterKit} from "@tiptap/starter-kit";
import BubbleMenu from "@tiptap/extension-bubble-menu";
import {getSchema} from "@tiptap/core";
import * as v from 'valibot'
import {Placeholder} from "@tiptap/extensions";
import {computePosition, flip, shift} from "@floating-ui/dom";

export type Nullable<T> = T | null;
export const absc = <T>(obj: any) => obj as unknown as T;

export const contentExtensions = [
    StarterKit
]
export const getEditorExtensions = (bubbleMenu: HTMLElement) => [
    ...contentExtensions,
    Placeholder.configure({
        placeholder: 'Write a thing...'
    }),
    BubbleMenu.configure({
        element: bubbleMenu,
    }),
]
export const schema = getSchema(contentExtensions);

export const UPPER_AND_LOWER_CASE_ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const validateAlphanumNExtra = v.regex(/^[a-zA-Z0-9_~-]*$/, 'Alphanumeric & _~- only')

export const MAX_CUSTOM_SLUG_LEN = 32;
// i do think some people might find 8 a bit annoying and
// i'm going to rate limit edit code entries anyway so I think 6 is okay
export const MIN_CUSTOM_EDIT_CODE_LEN = 6;
export const MAX_CUSTOM_EDIT_CODE_LEN = 32;

export const postSchema = v.object({
    slug: v.pipe(v.string(), v.maxLength(MAX_CUSTOM_SLUG_LEN, `Maximum ${MAX_CUSTOM_SLUG_LEN} characters`), validateAlphanumNExtra),
    // pro tip: no one will guess ⋆✴︎˚｡⋆✴︎︎ as an edit code
    _edit_code: v.union([
        v.literal(''),
        v.pipe(
            v.string(),
            v.minLength(MIN_CUSTOM_EDIT_CODE_LEN, `Minimum ${MIN_CUSTOM_EDIT_CODE_LEN} characters`),
            v.maxLength(MAX_CUSTOM_EDIT_CODE_LEN, `Maximum ${MAX_CUSTOM_EDIT_CODE_LEN} characters`))
    ]),
    content: v.pipe(v.string(), v.nonEmpty(), v.transform(JSON.parse))
})

export const positionTooltip = (parent: boolean | HTMLElement | null) => {
    return async (tooltip: HTMLElement) => {
        if (!tooltip) return;
        if (parent === null) return;
        const anchor = parent === true ? tooltip.parentElement : parent;
        if (!anchor) return;

        const {x, y} = await computePosition(anchor, tooltip, {
            placement: 'top',
            middleware: [flip(), shift({padding: 6})]
        })
        Object.assign(tooltip.style, {
            left: `${x}px`,
            top: `${y}px`
        })
    }
}