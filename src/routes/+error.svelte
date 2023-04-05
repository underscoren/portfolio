<script lang="ts">
    import { page } from "$app/stores";
</script>

<section class="section is-medium" id="main">
    <div class="container content">
        <h1>Oops! Something went wrong.</h1>
        <p class="is-large">
            <code>{$page.status}</code> Error: {$page.error?.message}
        </p>
        <p>Maybe try refreshing or going back to the <a href="/">homepage</a></p>
    </div>
</section>

<style lang="sass">
    #main
        margin-top: 5rem
        display: flex
        justify-content: center
    
    h1
        font-size: 4rem
    
    .is-large
        font-size: 2rem
</style>
