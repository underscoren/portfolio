<script lang="ts">
    import schoolIcon from "./img/school icon.svg"
    import workIcon from "./img/work icon.svg"

    export let type: "school" | "work";
</script>

<div class="experience">
    <div class="point"></div>
    <img src={type == "school" ? schoolIcon : workIcon} alt="">
    <div class="content-container">
        <div class="title-container">
            <span class="title">
                <slot name="title"></slot>
            </span>
            <span class="date">
                <slot name="date"></slot>
            </span>
        </div>
        <div class="highlights content">
            <slot name="highlights"></slot>
        </div>
    </div>
</div>

<style lang="sass">
    @import "./css/colors"
    @import "../../node_modules/bulma/sass/utilities/mixins"

    .experience
        position: relative
        margin-bottom: 5rem
        width: 50rem

        +until-widescreen
            width: 100%

    $size: 3.25rem
    .point
        position: absolute
        top: 0
        left: 0
        transform: translate(-50%,-10%)
        width: $size
        height: $size
        border: 8px solid $dk-blue
        outline: 10px solid $cream
        background-color: $cream
        border-radius: 50%
    
    img
        width: 1.5rem
        height: 1.5rem
        position: absolute
        top: 0
        left: 0
        transform: translate(-50%, 33%)
    
    .content-container
        margin-left: 3.75rem
        font-size: 1.3rem

        +until-widescreen
            font-size: 0.95rem
            margin-left: 3rem

    .title-container
        display: flex
        justify-content: space-between
        

        +until-widescreen
            display: block
    
        .title, .date
            font-size: 1.75rem

            +until-widescreen
                display: block
                font-size: 1.125rem
        
        .title
            font-weight: bold

        +until-widescreen
            .title
                margin-bottom: 0.5rem
            
            .date
                margin-bottom: 1rem



</style>