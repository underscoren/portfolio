<script>
    import "normalize.css"
	import Footer from "../Footer.svelte";
	import Navbar from "../Navbar.svelte";
    import "../lib/css/main.sass"
</script>

<div class="app">
    <Navbar />

    <main>
        <slot />
    </main>

    <Footer />
</div>

<style lang="sass">
    main
        display: flex
        flex-direction: column
        min-height: 100vh
</style>
