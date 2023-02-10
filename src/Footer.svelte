<script lang="ts">
    export const prerender = true;
    import svelteLogoURL from "./lib/img/tools/svelte-logo.svg"
    import bulmaLogoURL from "./lib/img/tools/Bulma Icon.svg"
    import tsLogoURL from "./lib/img/tools/ts-logo-512.svg"
    import sassLogoURL from "./lib/img/tools/Sass Logo - Seal (Color).svg"
    import loveURL from "./lib/img/tools/heart.svg"
</script>

<div class="footer" id="footer">
    <span class="block">Contact: <a class="external" href="mailto:marius.steffens@outlook.com">Marius.Steffens@outlook.com</a></span><span class="is-hidden is-inline-fullhd">  | </span>
    <span class="block">Site designed, written, and hosted by me.</span> 
    <span class="block">Made with 
        <a href="https://svelte.dev/"><img src={svelteLogoURL} alt="Svelte"></a> 
        <a href="https://bulma.io/"><img src={bulmaLogoURL} alt="Bulma"></a> 
        <a href="https://sass-lang.com/"><img src={sassLogoURL} alt="Sass"></a> 
        <a href="https://www.typescriptlang.org/"><img src={tsLogoURL} alt="TypeScript"></a> and 
        <a href="https://www.youtube.com/watch?v=WpYeekQkAdc"><img id="heart" src={loveURL} alt=""></a>.
    </span> 
    <span class="block">Source available <a target="_blank" rel="noreferrer noopener" href="https://github.com/underscoren">here</a></span>
</div>

<style lang="sass">
    @import "./lib/css/colors"
    @import "../node_modules/bulma/sass/layout/footer"
    @import "../node_modules/bulma/sass/utilities/mixins"
    @import "../node_modules/bulma/sass/helpers/visibility"


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

            &.external
                text-decoration: underline dotted
                
                &::after
                    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' fill='hsl(229deg, 53%, 53%)' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z'/%3E%3Cpath fill-rule='evenodd' d='M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z'/%3E%3C/svg%3E")
                    margin-left: 0.25rem

    .block:not(:last-child)
        margin-right: 0.5rem
    
    +until-widescreen
        #footer
            display: block
            padding: 3rem 1rem

        .block
            display: block !important
            width: 100%
            margin-bottom: 0.25rem
            margin-right: 0
</style>