<script lang="ts">
	import Typing from "../lib/Typing.svelte";
	import type { InputData } from "../lib/InputCapture.svelte"
	import InputCapture from "../lib/InputCapture.svelte";

    const wordList: InputData[] = [
		[["W",312],["e",82],["b",120],[" ",306],["D",139],["e",222],["v",undefined]],
		[["G",170],["a",100],["m",82],["e",84],[" ",244],["D",176],["e",223],["v",undefined]]
	]
</script>

<svelte:head>
    <title>Marius Steffens' Portfolio</title>
    <meta name="description" content="Marius Steffens' Portfolio" />
</svelte:head>

<section class="column" id="about">
	<div class="box">
		<h1>About</h1>
		<p></p>
		<InputCapture />
		<div class="typing">
			<span>I like <Typing {wordList} /></span>
		</div>
	</div>
</section>

<style>
    
</style>
