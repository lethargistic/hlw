<script lang="ts">
    import CoreEditorPage from "$lib/components/CoreEditorPage.svelte";
    const {data} = $props();
    const { content } = $derived(data);
</script>

<CoreEditorPage editable={false} {content}/>