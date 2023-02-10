<script lang="ts">
    export let type: "mini" | "" = "";
</script>

<div class="project block" class:mini={type=="mini"}>
    <div class="img-container" class:mini={type=="mini"}>
        <slot name="image">
            <div class="img-placeholder"></div>
        </slot>
    </div>
    <div class="text-container">
        <div class="title-container">
            <span class="project-title">
                <slot name="title">Title</slot>
            </span>
            <span class="pills-container">
                <slot name="pills"></slot>
            </span>
        </div>
        <div class="project-description content">
            <slot name="description">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt a totam facere earum amet expedita omnis quas excepturi accusamus aspernatur explicabo ducimus, qui in at, ipsa quisquam officia assumenda impedit?</slot>
        </div>
        {#if type != "mini"}
        <div class="project-highlights content">
            <slot name="highlights">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore, perferendis impedit excepturi explicabo dicta exercitationem quia pariatur magni tenetur fugiat dolorem delectus nobis deserunt fuga, sed commodi tempora esse ea!</slot>
        </div>
        {/if}
    </div>
    
</div>

<style lang="sass">
    @import "../../node_modules/bulma/sass/utilities/mixins"

    .project
        width: 100%

        .img-container
            width: 100%
            aspect-ratio: 1
            margin-bottom: 2rem

            &.mini
                aspect-ratio: 3/2
        
        .title-container
            width: 100%
            display: flex
            align-items: center
            justify-content: space-between
            margin-bottom: 1rem

            .project-title
                font-size: 1.5rem

            .pills-container
                display: flex
                align-items: center
        
        .project-description
            width: 100%
            margin-bottom: 0.5rem

    +until-fullhd
        .title-container
            display: block !important

            .project-title, .pills-container
                display: block
                width: 100%

    
    .img-placeholder
        width: 100%
        height: 100%
        background-color: #d9d9d9
</style>