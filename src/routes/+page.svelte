<script lang="ts">
    import {type Nullable, postSchema} from "$lib/shared.svelte";
    import Editor from "$lib/components/Editor.svelte";
    import {createPost} from "./post.remote.ts";
    import type {RemoteFormField} from "@sveltejs/kit";

    // TODO soon: configure, add more plugins, make it proper
    // TODO soon: i18n
    // TODO soon: data saving
    // TODO soon: data loading
    // TODO soon: link tool

    let editorAreaContElem = $state<Nullable<HTMLDivElement>>(null);
    let editorContentEditElem = $state<Nullable<HTMLDivElement>>(null)
    $effect(() => {
        editorContentEditElem =
            editorAreaContElem?.firstElementChild as Nullable<HTMLDivElement>;
    });

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

    let editorJSON = $state<object | null>();
</script>

<div class="full-wrap">
    <div class="inner-wrap">
        <header>
            <div class="icon">
                vlvt
            </div>
            <div class="account">
                account
            </div>
        </header>
        <main>
            <section class="editor-seg">
                <!-- TODO: 間もなく make placeholders random -->
                <div class="editor-wrap">
                    <Editor bind:elem={editorAreaContElem} bind:editorJSON={editorJSON}/>
                </div>
            </section>

            {#snippet fieldError(field: RemoteFormField<string>)}
                {#each field.issues() as issue}
                    <span class="field-error">{issue.message}</span>
                {/each}
            {/snippet}
            <section class="post-seg">
                <form class="post-inputs" {...createPost.preflight(postSchema)}
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

                <p>Your link: <span>ewewewe</span></p>
            </section>
        </main>
        <footer>
            © 2026 Lethargistic. I licked it, it's mine.
        </footer>
    </div>
</div>

<style>
    .full-wrap {
        display: grid;
        place-items: center;

        & header {
            display: flex;

            & .account {
                margin-left: auto;
            }
        }

        & .inner-wrap {
            max-width: 1024px;
            width: 100%;
            padding: 3rem 0 4rem 0;

            & main {
                & .editor-seg {
                    min-height: 100vh;
                    padding: 2.5rem 0.15rem 0;
                    box-sizing: border-box;

                    & .editor-wrap {
                        all: unset;
                        resize: none;

                        width: 100%;
                        min-height: 100%;

                        font-size: 1.5rem;

                        white-space: pre-wrap;
                        overflow-wrap: break-word;
                    }
                }

                & .post-seg {
                    display: grid;

                    & .post-inputs {
                        display: flex;
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
                }
            }
        }
    }
</style>