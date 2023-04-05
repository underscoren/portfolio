<script lang="ts">
	import { onMount } from "svelte";
    import { PongGame } from "./Pong";
    
    let canvas: HTMLCanvasElement;
    
    onMount(() => {
        const pongGame = new PongGame(canvas);
        (window as any).pongGame = pongGame; // debug
    });
</script>

<canvas bind:this={canvas}></canvas>

<style lang="sass">
    @import "../../../node_modules/bulma/sass/utilities/mixins"

    canvas
        width: calc(max(100%, 1280px))
        aspect-ratio: 16/9
        margin: 5rem

        +until-widescreen
            width: 100vw
            margin: 0
</style>