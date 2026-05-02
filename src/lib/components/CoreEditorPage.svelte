<script lang="ts">
    import {type Nullable} from "$lib/shared.svelte";
    import Editor from "$lib/components/Editor.svelte";
    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import PostBar from "$lib/components/PostBar.svelte";

    // TODO soon: configure, add more plugins, make it proper
    // TODO soon: i18n
    // TODO soon: data saving
    // TODO soon: data loading
    // TODO soon: link tool
    // TODO soon: make uneditable page different
    // TODO soon: loading spinner thing for posting/editing
    // TODO soon: toasts??
    let {existing, content = null} = $props();

    let editorAreaContElem = $state<Nullable<HTMLDivElement>>(null);
    let editorContentEditElem = $state<Nullable<HTMLDivElement>>(null)
    $effect(() => {
        editorContentEditElem =
            editorAreaContElem?.firstElementChild as Nullable<HTMLDivElement>;
    });

    let editorJSON = $state<object | null>();

    let editable = $state(!existing);
</script>

<div class="full-wrap">
    <div class="inner-wrap">
        <Header/>
        <main>
            <section class="editor-seg">
                <!-- TODO: 間もなく make placeholders random -->
                <div class="editor-wrap">
                    <Editor editable={editable} {content} bind:elem={editorAreaContElem} bind:editorJSON={editorJSON}/>
                </div>
            </section>

            <PostBar {existing} bind:editable={editable} {editorContentEditElem} {editorJSON}/>
        </main>
        <Footer/>
    </div>
</div>

<style>
    .full-wrap {
        display: grid;
        place-items: center;

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
            }
        }
    }
</style>