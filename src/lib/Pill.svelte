<script lang="ts">
    export let color: "red" | "blue" | "green" = "blue";
</script>

<span class={`tag is-rounded ${color}`}><slot/></span>

<style lang="sass">
    @import "./css/colors"
    @import "../../node_modules/bulma/sass/elements/tag"

    $red: #993333
    $blue: #333399
    $green: #339950

    .tag
        color: #fff !important
    
    :global(.tag.red)
        background-color: $red !important
    
    :global(.tag.blue)
        background-color: $blue !important
    
    :global(.tag.green)
        background-color: $green !important
</style>