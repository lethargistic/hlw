<script lang="ts">
    import { onMount, onDestroy } from 'svelte'
    import {Editor,} from '@tiptap/core'
    import {type Nullable, getEditorExtensions} from "$lib/shared.svelte";

    // TODO now: prettify

    let { elem = $bindable<Nullable<HTMLElement>>(null), editorJSON = $bindable()} = $props();

    let bubbleMenu = $state<Nullable<HTMLElement>>()
    let editorState = $state<Record<string, Nullable<Editor>>>({editor: null})

    $effect(() => {
        editorJSON = editorState.editor?.getJSON()
    })


    const initEditor = () => {
        if (!bubbleMenu) return;

        editorState.editor = new Editor({
            element: elem,
            extensions: getEditorExtensions(bubbleMenu),
            content: `
        <h1>Hello Svelte! 🌍️ </h1>
        <p>This editor is running in Svelte.</p>
        <p>Select some text to see the bubble menu popping up.</p>
      `,
            onTransaction: ({editor}) => {
                // Update the state signal to force a re-render
                editorState = { editor }
            },
        })
    }

    onMount(() => {
        initEditor();
    })
    onDestroy(() => {
        editorState.editor?.destroy()
    })
</script>

<div style="position: relative" class="app">
    {#if editorState.editor}
        <div class="fixed-menu">
            <button
                    onclick={() => editorState.editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                    class:active={editorState.editor.isActive('heading', { level: 1 })}
            >
                H1
            </button>
            <button
                    onclick={() => editorState.editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                    class:active={editorState.editor.isActive('heading', { level: 2 })}
            >
                H2
            </button>
            <button onclick={() => editorState.editor?.chain().focus().setParagraph().run()} class:active={editorState.editor.isActive('paragraph')}>
                P
            </button>
        </div>
    {/if}

    <div class="bubble-menu" bind:this="{bubbleMenu}">
        {#if editorState.editor}
            <button onclick={() => editorState.editor?.chain().focus().toggleBold().run()} class:active={editorState.editor.isActive('bold')}>
                Bold
            </button>
            <button onclick={() => editorState.editor?.chain().focus().toggleItalic().run()} class:active={editorState.editor.isActive('italic')}>
                Italic
            </button>
            <button onclick={() => editorState.editor?.chain().focus().toggleStrike().run()} class:active={editorState.editor.isActive('strike')}>
                Strike
            </button>
        {/if}
    </div>

    <div class="content-edit" bind:this={elem}></div>
</div>

<style>
    :global {
        .tiptap {
            outline: none !important;
        }
    }

  .app {
    margin: 2rem;
  }

  button.active {
    background: black;
    color: white;
  }

  .bubble-menu {
    display: flex;
    background-color: #0D0D0D;
    padding: 0.2rem;
    border-radius: 0.5rem;
    transition: visibility 0.1s ease, opacity 0.1s ease;
  }

  .bubble-menu button {
    border: none;
    background: none;
    color: #FFF;
    font-weight: 500;
    padding: 0 0.2rem;
    opacity: 0.6;
    margin: 0;
  }

  .bubble-menu button:hover,
  .bubble-menu button.active {
    opacity: 1;
  }
</style>