<script lang="ts">
    import Typing from "../lib/Typing.svelte";
    import type { InputData } from "../lib/InputCapture.svelte"
    import InputCapture from "../lib/InputCapture.svelte";

    const wordList: InputData[] = [
        [["W",173],["e",78],["b",86],[" ",218],["D",120],["e",201],["v"]], // Web dev
        [["G",160],["a",93],["m",81],["e",83],[" ",277],["D",234],["e",182],["v"]], //Game dev
        [["V",65],["R"]], // VR
        [["U",291],["n",63],["i",256],["t",94],["y"]], // Unity
        [["L",235],["i",74],["n",159],["u",73],["x"]], // Linux
        [["B",318],["u",190],["i",178],["l",135],["d",124],["i",43],["n",107],["g",162],[" ",249],["c",188],["o",110],["m",310],["p",43],["u",125],["t",140],["e",82],["r",162],["s"]], // Building computers
        [["R",141],["e",176],["v",165],["e",104],["r",217],["s",61],["e",197],[" ",252],["e",84],["n",246],["g",102],["i",171],["n",174],["e",116],["e",113],["r",225],["i",53],["n",89],["g"]], // Reverse engineering
        [["T",154],["a",222],["b",121],["l",67],["e",208],["t",79],["o",85],["p",142],[" ",312],["G",314],["a",431],["m",7],["e",87],["s"]], // Tabletop Games
        [["C",193],["o",116],["o",100],["k",207],["i",34],["n",119],["g"]], // Cooking
        [["R",182],["e",504],["c",106],["o",79],["r",183],["d",82],["i",51],["n",104],["g",82],[" ",175],["m",73],["y",197],["s",63],["e",133],["l",214],["f",269],[" ",361],["t",67],["y",110],["p",225],["i",58],["n",73],["g"]], // Recording myself typing
    ]
</script>

<svelte:head>
    <title>Marius Steffens' Portfolio</title>
    <meta name="description" content="Marius Steffens' Portfolio" />
</svelte:head>

<section class="column" id="about">
    <div class="box">
        <div class="typing">
            <span>I like <Typing {wordList} /></span>
        </div>
        <InputCapture />
    </div>
</section>

<style lang="sass">
    #about
        margin: 2rem 4rem
    .typing
        margin-top: 1rem
        font-size: 5rem
</style>
