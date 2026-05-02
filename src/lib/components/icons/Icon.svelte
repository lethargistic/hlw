<script lang="ts">
    // icons from https://lucide.dev/, thanks!

    let {name, width = 24, height = 24, currentColor = "var(--text-color)"} = $props();
</script>

<div class="factory-icon"
     style={`--current-color: ${currentColor}; --factory-width: ${width}px; --factory-height: ${height}px;`}>
    {#if name === "lock"}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.4444 11H6.55556C5.69645 11 5 11.8954 5 13V20C5 21.1046 5.69645 22 6.55556 22H17.4444C18.3036 22 19 21.1046 19 20V13C19 11.8954 18.3036 11 17.4444 11Z"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M7 11V7.44444C7 6.2657 7.52678 5.13524 8.46447 4.30175C9.40215 3.46825 10.6739 3 12 3C13.3261 3 14.5979 3.46825 15.5355 4.30175C16.4732 5.13524 17 6.2657 17 7.44444V11"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    {:else if name === "copy"}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
             class="lucide lucide-copy-icon lucide-copy">
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
        </svg>
    {/if}
</div>

<style>
    :global {
        .factory-icon {
            /* changed in js */
            --current-color: var(--text-color);
            --factory-width: 24px;
            --factory-height: 24px;

            & svg, img {
                color: var(--current-color);
                width: var(--factory-width);
                height: var(--factory-height);
            }
        }
    }
</style>

