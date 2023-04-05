<script lang="ts">
    import { onMount } from "svelte";

    let pongComponent: any;

    // force component to be loaded dynamically instead of failing to SSR
    onMount(async () => {
        const pongModule = await import("./Pong.svelte");
        pongComponent = pongModule.default;
    });
</script>

<section id="main">
    <h1 class="title">Pwong</h1>
    <div class="pong-container">
        <svelte:component this={pongComponent} />
    </div>
</section>

<style lang="sass">
    @import "../../../node_modules/bulma/sass/utilities/mixins"

    .title
        font-size: 32pt
        margin: 3rem 2rem 2rem

    .pong-container
        width: max-content
        margin-left: auto
        margin-right: auto
        margin-top: -2rem

        +until-widescreen
            margin-top: 3rem
            margin-left: 0
            margin-right: 0

    
</style>