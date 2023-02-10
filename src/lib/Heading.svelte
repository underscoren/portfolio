<script lang="ts">
    export let id: string;
</script>

<div {id} class="heading"><slot /></div>

<style lang="sass">
    @import "./css/colors"

    .heading
        background-color: $black
        color: $white
        width: 100vw
        padding: 0.5rem 0
        text-align: center
        margin: 3rem 0
        font-size: 2rem

</style>