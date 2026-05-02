<script lang="ts">
    import CoreEditorPage from "$lib/components/CoreEditorPage.svelte";
    const {data} = $props();
    const { slug, content } = $derived(data);
</script>

<CoreEditorPage editable={false} {content}/>