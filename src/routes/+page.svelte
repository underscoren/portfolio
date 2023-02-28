<script lang="ts">
    import Typing from "../lib/Typing.svelte";
    import type { InputData } from "../lib/InputCapture.svelte"
    import InputCapture from "../lib/InputCapture.svelte";
	import Heading from "$lib/Heading.svelte";
	import Project from "$lib/Project.svelte";
	import Experience from "$lib/Experience.svelte";
	import Pill from "$lib/Pill.svelte";

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

    import SOLpreview from "../lib/img/project/SOL/preview.gif"
    import fallingsandPreview from "../lib/img/project/fallingsand/preview.mp4"
    import barodocsPreview from "../lib/img/project/barodocs/preview.gif"
    import vsfurnacePreview from "../lib/img/project/vsfurnace/preview.gif"
    import blender2nbtPreview from "../lib/img/project/blender2nbt/preview.mp4"
    import pianoPreview from "../lib/img/project/piano/preview.png"
    import cpunkPreview from "../lib/img/project/cpunk/preview.mp4"
</script>

<svelte:head>
    <title>Marius Steffens' Portfolio</title>
    <meta name="description" content="Marius Steffens' Portfolio" />
</svelte:head>

<section id="main">
    <div class="box">
        <div class="typing">
            <span>I like <Typing {wordList} /></span>
        </div>
        <!-- <InputCapture /> -->
        <!-- big video thing -->
        <div class="bg-video-container">
            <div class="text-container content">
                <p>Hi! I'm Marius, and I've been programming since I was 12. I discovered my love for all things computers when I saw a demo of <a target="_blank" rel="noreferrer" href="https://www.google.com/search?q=lego+mindstorms&tbm=isch">Lego Mindstorms</a> during a school trip, and later learned JavaScript while bored during ICT lessons.</p>
                <p>Since then, I've been working on all sort of things that interest me - typically some sort of web-based tool or application, though I've also dabbled with Linux, ripped game assets for modding (and learned about the engines in the process), and even wrote my own 2D OpenGL game engine completely from scratch!</p>
                <p>After finishing university, I've joined a Game Dev bootcamp while also working on a project for a big industry client. It was very intensive, but I've learned a lot about project management and game development, and I will even obtain an Unity Associate Programmer qualification. In my spare time, I enjoy playing a wide variety of games - everthing from factory builders, to RPGs, to rhythm games, and VR titles; and I also used to run a boardgames club while in high school, as well as occasionally GM for my friends' TTRPG games.</p>
                <p>Here you can find some of the projects I've worked on over the years, which I hope you'll find interesting. Feel free to contact me for more info - my email and other links are at the very bottom of the page.</p>
            </div>
        </div>
        <Heading id="game-dev">Game Dev</Heading>
        <div class="columns is-fullhd main-container">
            <div class="column">
                <Project>
                    <span slot="image">
                        <img src={SOLpreview} alt="">
                    </span>
                    <span slot="title">Symphony of Life</span>
                    <span slot="pills">
                        <Pill color="blue">VR</Pill>
                        <Pill color="blue">Unity</Pill>
                        <Pill color="red">C#</Pill>
                        <Pill color="red">OpenXR</Pill>
                        <Pill color="green">Client Project</Pill>
                    </span>
                    <span slot="description">Short, immersive VR experience to be displayed at events and festivals. Worked directly with client to develop ideas and design prototype. Rapidly iterated on design and created MVP within a three month period.</span>
                    <span slot="highlights">
                        <p>Roles:</p>
                        <ul>
                            <li>Team Lead</li>
                            <li>Lead Programmer</li>
                        </ul>
                        <p>Responsibilities:</p>
                        <ul>
                            <li>Planning and Task Delegation</li>
                            <li>Script Architecture</li>
                            <li>Programming and Optimisation Guidance</li>
                        </ul>
                    </span>
                </Project>
            </div>
            <div class="column is-2"></div> <!-- spacer -->
            <div class="column">
                <Project>
                    <span slot="image">
                        <video autoplay loop muted src={fallingsandPreview} />
                    </span>
                    <span slot="title">Cell</span>
                    <span slot="pills">
                        <Pill color="blue">Custom Engine</Pill>
                        <Pill color="red">C++</Pill>
                        <Pill color="red">OpenGL</Pill>
                        <Pill color="green">University Project</Pill>
                    </span>
                    <span slot="description">2D falling sand puzzle platformer made using my custom game engine with minimal libraries. Developed as a project to better my understanding of rendering, game engines, and C++. Engine development took up majority of the time, game was unfortunately not finished.</span>
                    <span slot="highlights">
                        <p style="margin-bottom: 0.5rem">Highlights:</p>
                        <ul>
                            <li>Custom engine for “falling sand” simulation</li>
                            <li>Written in C++ with minimal libraries (no SDL or SFML)</li>
                            <li>Cross platform (Windows/Linux/Mac)</li>
                            <li>Unique gameplay concept, combining puzzle platforming with sand physics</li>
                            <li>Researched and developed solo in five month period</li>
                        </ul>
                    </span>
                </Project>
            </div>
        </div>
        <Heading id="web-dev">Web Dev</Heading>
        <div class="columns is-fullhd main-container">
            <div class="column">
                <Project>
                    <span slot="image">
                        <img src={barodocsPreview} alt="">
                    </span>
                    <span slot="title">Barodocs</span>
                    <span slot="pills">
                        <Pill color="blue">React</Pill>
                        <Pill color="red">Bootstrap</Pill>
                        <Pill color="red">jQuery</Pill>
                        <Pill color="green">Personal Project</Pill>
                    </span>
                    <span slot="description">Game item wiki generated on-device using data scraped from retail game files. Reverse engineered complex XML parsing with the help of source code available for modders. Originally written only with jQuery/HTML, later re-written with React.</span>
                    <span slot="highlights">
                        <p style="margin-bottom: 0.5rem">Highlights:</p>
                        <ul>
                            <li>React SPA</li>
                            <li>Mobile friendly (Responsive design)</li>
                            <li>Try it out yourself <a target="_blank" rel="noreferrer" href="https://barodocs.ddns.net">here</a></li>
                            <li>Source available <a target="_blank" rel="noreferrer" href="https://github.com/underscoren/barodocs">here</a></li>
                        </ul>
                    </span>
                </Project>
            </div>
            <div class="column is-2"></div> <!-- spacer -->
            <div class="column">
                <Project>
                    <span slot="image">
                        <img src={vsfurnacePreview} alt="">
                    </span>
                    <span slot="title">VS Furnace Calc</span>
                    <span slot="pills">
                        <Pill color="blue">Svelte</Pill>
                        <Pill color="red">TypeScript</Pill>
                        <Pill color="red">Bulma</Pill>
                        <Pill color="green">Personal Project</Pill>
                    </span>
                    <span slot="description">Dynamic game furnace temperature simulator. Reverse-engineered simulation logic spread across multiple abstract components in a complex codebase.</span>
                    <span slot="highlights">
                        <p style="margin-bottom: 0.5rem">Highlights:</p>
                        <ul>
                            <li>Svelte / TypeScript (Modern frontend toolchain)</li>
                            <li>Custom game-inspired UX</li>
                            <li>Website viewable here (link TBC)</li>
                            <li>Source available <a target="_blank" rel="noreferrer" href="https://github.com/underscoren/vs-furnace-calc">here</a></li>
                        </ul>
                    </span>
                </Project>
            </div>
        </div>
        <h1>Minor Projects</h1>
        <div class="columns is-fullhd main-container">
            <div class="column">
                <Project type="mini">
                    <span slot="image">
                        <video autoplay loop muted src={blender2nbtPreview} />
                    </span>
                    <span slot="title">Blender-to-NBT</span>
                    <span slot="description">A blender plugin for creating exact 1-meter block cubes and exporting a NBT structure file for use in Minecraft and related programs. [<a target="_blank" rel="noreferrer" href="https://github.com/underscoren/blender-to-nbt">Source</a>]</span>
                </Project>
            </div>
            <div class="column">
                <Project type="mini">
                    <span slot="image">
                        <img src={pianoPreview} alt="" >
                    </span>
                    <span slot="title">Piano Learning Tool</span>
                    <span slot="description">Originally a little tool to help me learn all the keyboard note names interactively using the Web MIDI API, later developed sheet music, accidental, and octave-specific modes. Also includes a very basic WebAudio API-powered piano synth. [<a target="_blank" rel="noreferrer" href="https://github.com/underscoren/piano-learn-tool">Source</a>]</span>
                </Project>
            </div>
            <div class="column">
                <Project type="mini">
                    <span slot="image">
                        <video autoplay loop muted src={cpunkPreview} />
                    </span>
                    <span slot="title">Cyberpunk Red Tools</span>
                    <span slot="description">A set of tools for creating characters and story beats, written only using jQuery and Bootstrap. One of my earliest projects, in the process of being re-written with modern frontend toolchains (SvelteKit/TS). [<a target="_blank" rel="noreferrer" href="https://github.com/underscoren/cp-red-tools-old">Source</a>]</span>
                </Project>
            </div>
        </div>
        <Heading id="experience">Experience</Heading>
        <div class="experience-container">
            <Experience type="work">
                <span slot="title">Creative Solutions - Ithra</span>
                <span slot="date">(12/22 - 02/23)</span>
                <span slot="highlights">
                    <p>Client Project - Symphony of Life</p>
                    <ul>
                        <li>Short VR Experience (Prototype)</li>
                        <li>Team lead (4 people)</li>
                        <li>Lead Programmer (Unity / C#)</li>
                    </ul>
                </span>
            </Experience>
            <Experience type="school">
                <span slot="title">Skills City</span>
                <span slot="date">(10/22 - 01/23)</span>
                <span slot="highlights">
                    <p>Game Dev Bootcamp</p>
                    <ul>
                        <li>Unity Engine</li>
                        <li>C# Programming</li>
                        <li>VR Game Development</li>
                    </ul>
                </span>
            </Experience>
            <Experience type="school">
                <span slot="title">University of Essex</span>
                <span slot="date">(2019 - 2022)</span>
                <span slot="highlights">
                    <p>Computer Science Bsc (2.1, Hons)</p>
                    <ul>
                        <li>Computer Game Programming</li>
                        <li>C++ Programming</li>
                        <li>Web Development</li>
                    </ul>
                </span>
            </Experience>
        </div>
        <div class="line"></div>
    </div>
</section>

<style lang="sass">
    @import "../lib/css/colors"
    @import "../../node_modules/bulma/sass/grid/columns"
    @import "../../node_modules/bulma/sass/utilities/mixins"
    
    $left-offset: 12%
    $left-offset-full: calc($left-offset + 4%)

    $left-offset-mobile: calc($left-offset * 2/3 )
    $left-offset-full-mobile: calc($left-offset-full * 2/3)
    
    a
        text-decoration: underline

        /** show icon for external links only */
        &[target="_blank"]::after
            text-decoration: underline dotted
            content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' fill='hsl(229deg, 53%, 53%)' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z'/%3E%3Cpath fill-rule='evenodd' d='M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z'/%3E%3C/svg%3E")
            margin-left: 0.25rem

    #main
        position: relative

    .typing
        margin: 3rem 0 2rem $left-offset-full
        font-size: 5rem

        +until-widescreen
            font-size: 1.25rem
    
    .bg-video-container
        width: 100vw
        /* height: 110vh */
        background-color: $black
        margin-bottom: 5rem
        padding: 3rem

        +until-widescreen
            padding: 3rem 1rem
        
        .text-container
            margin: auto
            width: 60%
            color: $white

            +until-widescreen
                width: 100%
    
    h1
        margin: 3rem 0 2rem $left-offset-full
        font-size: 1.75rem

    .main-container
        margin-left: $left-offset-full
        margin-right: 10%


    .experience-container
        margin: 12rem $left-offset 10rem
            

    .line
        position: absolute
        top: 0
        left: $left-offset
        height: 100%
        width: 0.5rem
        background-color: $dk-blue
        z-index: -1
        transform: translate(-50%)

    +until-widescreen
        .main-container
            margin-left: $left-offset-full-mobile
            margin-right: 1rem
        
        .experience-container
            margin-top: 8rem
            margin-left: $left-offset-mobile
        
        .line
            left: $left-offset-mobile

        /* Force every column to render as full-width block */
        .columns
            display: block !important

</style>
