<script setup>
import ExploreCar from './components/ExploreCar.vue'
import ExploreDrivers from './components/ExploreDrivers.vue'
import ExploreTracks from './components/ExploreTracks.vue'
import Navigation from './components/Navigation.vue'
</script>

<template>
  <div class="wrapper">
    <Navigation class="siteNav"></Navigation>
    <main class="content">
      <ExploreTracks id="exploreTracks"></ExploreTracks>
      <!-- <ExploreCar id="exploreCar"></ExploreCar> -->
      <!-- <ExploreDrivers id="exploreDrivers"></ExploreDrivers> -->
    </main>
  </div>
</template>

<style scoped>
.siteNav {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: #0f111142;
}
.wrapper {
  scroll-behavior: smooth;
  overflow: auto;
  max-width: 100%;
  height: 100%;
  margin: 0 auto;
}
</style>
