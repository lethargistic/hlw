<script lang="ts">
    import {createPost} from "../../routes/post.remote.ts";
    import {postSchema} from "$lib/shared.svelte";
    import type {RemoteFormField} from "@sveltejs/kit";
    import Icon from "$lib/components/icons/Icon.svelte";

    let {existing, editable = $bindable(false), editorContentEditElem, editorJSON} = $props();


    const handlePostInputKeys = async (e: KeyboardEvent) => {
        if (e.key === "ArrowUp") {
            if (!editorContentEditElem) return;

            const range = document.createRange();
            const selection = window.getSelection();

            editorContentEditElem.focus();
            range.selectNodeContents(editorContentEditElem);
            range.collapse(false);
            if (!selection) return;
            selection.removeAllRanges();
            selection.addRange(range);

            e.preventDefault();
        }
    }
</script>

{#snippet fieldError(field: RemoteFormField<string>)}
    {#each field.issues() as issue}
        <span class="field-error">{issue.message}</span>
    {/each}
{/snippet}
<section class="post-seg">
    {#if !existing}
        <form class="bar post-bar" {...createPost.preflight(postSchema)}
              oninput={() => createPost.validate()}>
            <label>
                {@render fieldError(createPost.fields.slug)}
                <input onkeydown={handlePostInputKeys}
                       autocomplete="off"
                       id="slug-input"
                       placeholder="Custom url"
                       {...createPost.fields.slug.as('text')}
                >
            </label>
            <label>
                {@render fieldError(createPost.fields._edit_code)}
                <input onkeydown={handlePostInputKeys}
                       autocomplete="off" id="edit-code-input"
                       placeholder="Custom edit code"
                       {...createPost.fields._edit_code.as('text')}
                >
            </label>
            <input type="hidden" {...createPost.fields.content.as('text', JSON.stringify(editorJSON))}>
            {@render fieldError(createPost.fields.content)}
            <button tabindex="0" class="post-btn">
                Post
            </button>
        </form>
    {:else if existing && editable}
        <form class="bar edit-bar">

        </form>
    {:else if existing && !editable}
        <form class="bar view-bar">
            <button class="ui-button copy-btn" type="button">
                <Icon name="copy"/>
            </button>

            <!-- TODO now: tooltips waaah-->
            <button class="lock-btn" type="button">
                <Icon name="lock"/>
            </button>
            <!-- tooltip -->
            <input type="text"
                   placeholder="Edit code">
            <button type="button">
                Edit
            </button>
            <!-- tooltip -->
        </form>
    {/if}
</section>

<style>
    .post-seg {
        display: grid;

        & .view-bar {

            .lock-btn {
                margin-left: auto;
            }

            button {
                all: unset;
                cursor: pointer;
                opacity: 0.3;
                transition: all 0.2s;
            }

            button:hover {
                opacity: 1;
                transform: scale(1.025);
            }
        }

        & .edit-bar {

        }

        & .post-bar {
            gap: 0.5rem;

            --input-height: 1rem;

            & label {
                position: relative;
            }

            & .field-error {
                position: absolute;
                bottom: calc(var(--input-height) + 0.5rem);
            }

            & post-input {
                height: var(--input-height);
            }

            & .post-btn {
                margin-left: auto;
            }
        }

        & .bar {
            display: flex;
        }
    }
</style>