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
    canvas
        width: calc(max(100%, 1280px))
        aspect-ratio: 16/9
        margin: 5rem
</style>