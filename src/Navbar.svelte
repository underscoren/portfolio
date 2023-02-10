<script lang="ts">
    export const prerender = true;
</script>

<nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">Marius Steffens</a>
    </div>
  
    <div class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" href="#game-dev">Game Dev</a>
        <a class="navbar-item" href="#web-dev">Web Dev</a>
        <a class="navbar-item" href="#experience">Experience</a>
      </div>
  
      <div class="navbar-end">
        <a class="navbar-item" href="#footer">Contact</a>
        <a class="navbar-item" href="/Steffens, Marius CV [Programmer].pdf">CV</a>
      </div>
    </div>
  </nav>

<style lang="sass">
    @charset "utf-8"

    @import "./lib/css/colors"
    $navbar-background-color: $dk-blue
    $navbar-item-color: $white

    @import "../node_modules/bulma/sass/utilities/_all"
    @import "../node_modules/bulma/sass/components/navbar"


    .navbar-start
        margin-left: 3rem
    
    .navbar-end
        margin-right: 3rem

</style>