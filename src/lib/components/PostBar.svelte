<script lang="ts">
    import {createPost} from "../../routes/post.remote.ts";
    import {type Nullable, positionTooltip, postSchema} from "$lib/shared.svelte";
    import type {RemoteFormField} from "@sveltejs/kit";
    import Icon from "$lib/components/icons/Icon.svelte";
    import {blur} from "svelte/transition";
    import {cubicInOut} from "svelte/easing";

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

    // tooltips
    let tooltipState = $state({text: '', field: ''});
    const enterTooltip = (text: string, field: string) => {
        if (text) tooltipState.text = text;
        tooltipState.field = field;
    }

    let copyTooltipElem = $state<Nullable<HTMLElement>>(null);
    let copyTimeoutId = $state<Nullable<NodeJS.Timeout>>(null);
    const changeCopyTooltip = (text: string, time: number) => {
        const snapshot = tooltipState.text;

        if (text) tooltipState.text = text;

        // remathing the position
        if (!copyTooltipElem) return;
        positionTooltip(true)(copyTooltipElem)

        copyTimeoutId = setTimeout(() => {
            tooltipState.text = snapshot;
        }, time)
    }
    $effect(() => {
        if (copyTimeoutId && tooltipState.field === '') clearTimeout(copyTimeoutId)
    })

    const leaveTooltip = () => {
        tooltipState.field = '';
    }

    const copyWithTooltip = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            changeCopyTooltip('copied!', 2000);
        } catch (err) {
            console.error('Oh no, failed to copy: ', err);
        }
    }
</script>

{#snippet fieldError(field: RemoteFormField<string>)}
    {#each field.issues() as issue}
        <span class="field-error">{issue.message}</span>
    {/each}
{/snippet}
<!--cfg the parent has to set tooltip state as well-->
{#snippet copyTooltip(text: string, field: string)}
    <!-- jetbrains fix when -->
    <!--suppress ALL-->
    <div bind:this={copyTooltipElem} {@attach positionTooltip(true)}
         transition:blur={{duration: 100, easing: cubicInOut}}
         class="tooltip" role="tooltip"
         onpointerenter={() => enterTooltip('', field)}
         onpointerleave={leaveTooltip}>
        <div>
            {text}
        </div>
    </div>
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
            <!-- TODO tmrw: make this into a component with html arg because eyesore also animate the tooltip -->
            <button class="ui-button copy-btn" type="button"
                    onclick={() => copyWithTooltip(window.location.href)}
                    onpointerenter={() => enterTooltip('copy link', 'copy-btn')}
                    onpointerleave={leaveTooltip}>
                <Icon name="copy"/>
                {#if tooltipState.field === 'copy-btn'}
                    {@render copyTooltip(tooltipState.text, 'copy-btn')}
                {/if}
            </button>

            <button class="ui-button lock-btn" type="button">
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