<script setup></script>
<template>
  <nav class="topNavigation">
    <ul class="navList">
      <li class="navItem"><a href="#exploreDrivers">Explore Drivers</a></li>
      <li class="navItem"><a href="#exploreCarWrapper">Explore Car</a></li>
      <li class="navItem"><a href="#exploreTracks">Explore Tracks</a></li>
    </ul>
  </nav>
</template>
<style scoped>
  .topNavigation {
    height: 7.5rem;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  .navList {
    max-width: 750px;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex-grow: 1;
    gap: 1rem;
  }
  .navItem {
    font-size: 1.5rem;
    font-weight: bold;
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: 2px solid transparent;
    transition: border 250ms ease-in-out;
  }

  .navItem:hover {
    border: 2px solid #f10000;
  }

  .navItem a {
    color: var(--font-color-light-200);
  }
</style>
