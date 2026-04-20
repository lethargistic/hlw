<script lang="ts">
    import type {Nullable} from "$lib/shared.svelte";

    const handlePublish = (e: Event) => {
        if (e instanceof KeyboardEvent && e.key !== 'Enter') {
            return;
        }

        // TODO now: publish
    }

    // TODO now: think of best interaction logic
    let titleInput = $state<Nullable<HTMLInputElement>>(null);
    let editorArea = $state<Nullable<HTMLTextAreaElement>>(null);
    const handleTitleInputKeys = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            if (!editorArea) return;

            e.preventDefault();
            editorArea.focus();
            editorArea.setSelectionRange(editorArea.value.length, editorArea.value.length);
        }
        if (e.key === "ArrowDown") {
            if (!editorArea) return;

            editorArea.focus();
            editorArea.setSelectionRange(editorArea.value.length, editorArea.value.length);
        }
    }

    const isAtFirstLine = (textarea: HTMLTextAreaElement) => {
        const firstNewLine = textarea.value.indexOf("\n");
        return firstNewLine === -1 || textarea.selectionStart <= firstNewLine;
    }

    const handleEditorKeys = (e: KeyboardEvent) => {
        if (!editorArea || !titleInput) return;
        if (e.key === "ArrowUp" && isAtFirstLine(editorArea)) {
            e.preventDefault();
            titleInput.focus();
            titleInput.setSelectionRange(titleInput.value.length, titleInput.value.length);
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
                <!-- TODO: 間もなく make these random -->
                <input bind:this={titleInput} onkeydown={handleTitleInputKeys} class="font-lexend" type="text" maxlength="32" id="title-input" placeholder="Title goes here...">
                <textarea bind:this={editorArea} onkeydown={handleEditorKeys} id="editor-area" placeholder="Write something..."></textarea>
            </section>
            <section class="publish-seg">
                <button class="publish" aria-label="publish" onclick={handlePublish}>
                    Publish
                </button>
                <p>Your link: <span>ewewewe</span></p>
            </section>
        </main>
        <footer>
            © 2026 i consume yuri media to survive
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
                    & #title-input {
                        font-size: 3rem;
                        padding: 2rem 0 0 0;

                        font-weight: 350;

                        text-overflow: ellipsis;
                        overflow-y: auto;
                    }

                    & #editor-area {
                        min-height: 100vh;
                        padding: 2.5rem 0.15rem 0;

                        font-size: 1.5rem;

                        resize: none;
                    }

                    & textarea, input {
                        all: unset;
                        width: 100%;
                        white-space: pre-wrap;
                        overflow-wrap: break-word;
                    }

                    & textarea,input:focus-visible {
                        outline: none !important;
                    }
                }
            }
        }
    }
</style>