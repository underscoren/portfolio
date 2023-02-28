<script lang="ts">
    import { onMount } from "svelte";

    let pongComponent: any;

    // force component to be loaded dynamically instead of SSR
    onMount(async () => {
        const pongModule = await import("./Pong.svelte");
        pongComponent = pongModule.default 
    });
</script>

<section id="main">
    <div class="pong-container">
        <svelte:component this={pongComponent} />
    </div>
</section>

<style lang="sass">
    .pong-container
        width: max-content
        margin-left: auto
        margin-right: auto
        margin-top: 5rem
</style>