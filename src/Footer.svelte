<script lang="ts">
    export const prerender = true;
    import svelteLogoURL from "./lib/img/tools/svelte-logo.svg"
    import bulmaLogoURL from "./lib/img/tools/Bulma Icon.svg"
    import tsLogoURL from "./lib/img/tools/ts-logo-512.svg"
    import sassLogoURL from "./lib/img/tools/Sass Logo - Seal (Color).svg"
    import loveURL from "./lib/img/tools/heart.svg"
</script>

<div class="footer" id="footer">
    <span>Contact: <a href="mailto:marius.steffens@outlook.com">Marius.Steffens@outlook.com</a>  | Site designed, written, and hosted by me. Made with <a href="https://svelte.dev/"><img src={svelteLogoURL} alt="Svelte"></a> <a href="https://bulma.io/"><img src={bulmaLogoURL} alt="Bulma"></a> <a href="https://sass-lang.com/"><img src={sassLogoURL} alt="Sass"></a> <a href="https://www.typescriptlang.org/"><img src={tsLogoURL} alt="TypeScript"></a> and <a href="https://www.youtube.com/watch?v=WpYeekQkAdc"><img id="heart" src={loveURL} alt=""></a>. Source available <a target="_blank" rel="noreferrer noopener" href="https://github.com/underscoren">here</a></span>
</div>

<style lang="sass">
    @import "./lib/css/colors"
    @import "../node_modules/bulma/sass/layout/footer"

    #footer
        display: flex
        align-content: center
        background-color: $dk-grey
        justify-content: center
        align-content: center
        color: $white

        span
            display: flex

        img
            height: 1.5rem
        
        #heart
            margin: 0 0.3rem

        a
            &:first-child, &:last-child
                margin: 0 0.25rem

            &:not(:first-child)
                margin-right: 0.33rem

            &:nth-child(2)
                margin-left: 0.33rem
</style>