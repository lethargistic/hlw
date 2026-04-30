<script lang="ts">
    import {type Nullable} from "$lib/shared.svelte";
    import Editor from "$lib/components/Editor.svelte";

    // TODO soon: configure, add more plugins, make it proper
    // TODO soon: i18n
    // TODO soon: data saving
    // TODO soon: data loading
    // TODO soon: link tool

    const handlePublish = (e: Event) => {
        if (e instanceof KeyboardEvent && e.key !== 'Enter') {
            return;
        }

        // TODO now: publish
    }

    let editorAreaContElem = $state<Nullable<HTMLDivElement>>(null);
    let editorContentEditElem = $state<Nullable<HTMLDivElement>>(null)
    $effect(() => {
        editorContentEditElem =
            editorAreaContElem?.firstElementChild as Nullable<HTMLDivElement>;
    });

    $inspect(editorAreaContElem);
    $inspect('edit', editorContentEditElem);

    const handlePublishInputKeys = async (e: KeyboardEvent) => {
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
                    <Editor bind:elem={editorAreaContElem}/>
                </div>
            </section>
            <section class="publish-seg">
                <div class="publish-inputs">
                    <input onkeydown={handlePublishInputKeys}
                           autocomplete="off" type="text" maxlength="32" id="edit-code-input" placeholder="Custom edit code">
                    <input onkeydown={handlePublishInputKeys}
                           autocomplete="off" type="text" maxlength="32" id="slug-input" placeholder="Custom url">
                    <button class="publish-btn" aria-label="publish" onclick={handlePublish}>
                        Publish
                    </button>
                </div>

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
                & .publish-seg {
                    display: grid;

                    & .publish-inputs {
                        display: flex;
                        gap: 0.5rem;

                        & .publish-btn {
                            margin-left: auto;
                        }
                    }
                }
            }
        }
    }
</style>