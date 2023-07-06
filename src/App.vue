<script setup>
  import { ref } from 'vue';
  import ExploreDrivers from './components/ExploreDrivers.vue';
  import ExploreTracks from './components/ExploreTracks.vue';
  import Navigation from './components/Navigation.vue';
  import SiteInfo from './components/SiteInfo.vue';

  const opened = ref(false);

  function openModal() {
    opened.value = !opened.value;
  }
  function closeModal() {
    opened.value = false;
  }
</script>

<template>
  <div class="wrapper">
    <Navigation class="siteNav"></Navigation>
    <SiteInfo :modalOpened="opened" @modalOpened="closeModal"></SiteInfo>
    <main class="content">
      <div id="exploreCarWrapper">
        <div class="siteInfo" @mousedown="openModal" @tap="openModal">❓ Click to see info</div>
        <div class="exploreCar">
          <div class="loading-bar"></div>
        </div>
      </div>
      <ExploreDrivers id="exploreDrivers"></ExploreDrivers>
      <ExploreTracks id="exploreTracks"></ExploreTracks>
    </main>
    <footer class="credit">built by <a target="_blank" href="https://kubot.dev/">kubot.dev</a></footer>
  </div>
</template>

<style scoped>
  .siteNav {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
  }

  .siteInfo {
    position: relative;
    margin-top: 5.5rem;
    cursor: pointer;
    color: #f1f1f1aa;
    font-size: 0.75rem;
    display: inline-block;
    border: 1px solid #f1f1f1aa;
    border-radius: 0.5rem;
    padding: 0.5rem;
  }

  .wrapper {
    background-color: var(--bg-color-main);
    scroll-behavior: smooth;
    overflow: auto;
    max-width: 100%;
    height: 100%;
    margin: 0 auto;
  }

  .credit a {
    font-family: 'Lobster', cursive;
    text-decoration: none;
    color: inherit;
    font-size: 1.5em;
  }
  .credit a:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  footer {
    height: 50px;
  }
</style>
