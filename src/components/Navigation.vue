<script setup>
  import { ref } from 'vue';

  const showHamburgerMenu = ref(false);
  const screenWidth = ref(0);
  const menuOpened = ref(false);

  window.addEventListener('resize', () => {
    screenWidth.value = window.innerWidth;
    if (screenWidth.value <= 600) {
      showHamburgerMenu.value = true;
    } else {
      showHamburgerMenu.value = false;
    }
  });

  function toggleOpen() {
    menuOpened.value = !menuOpened.value;
  }

  function toggleOpenMenu(e) {
    const menuParent = e.target.closest('ul');
    const clickedItem = e.target.closest('li');
    const children = menuParent.childNodes;
    children.forEach((child) => {
      child.classList.remove('open');
    });
    clickedItem.classList.add('open');
  }
</script>
<template>
  <nav v-if="!showHamburgerMenu" class="topNavigation">
    <ul class="navList">
      <li @click="toggleOpenMenu" class="navItem"><a href="#exploreCarWrapper">Explore Car</a></li>
      <li @click="toggleOpenMenu" class="navItem"><a href="#exploreDrivers">Explore Drivers</a></li>
      <li @click="toggleOpenMenu" class="navItem"><a href="#exploreTracks">Explore Tracks</a></li>
    </ul>
  </nav>
  <nav v-else>
    <span @click="toggleOpen" class="icon">{{ menuOpened ? '▽' : '◁' }}</span>
    <ul class="hamburgerMenu" :class="{ open: menuOpened }">
      <li class="navItem"><a href="#exploreDrivers">Explore Drivers</a></li>
      <li class="navItem"><a href="#exploreCarWrapper">Explore Car</a></li>
      <li class="navItem"><a href="#exploreTracks">Explore Tracks</a></li>
    </ul>
  </nav>
</template>
<style scoped>
  .icon {
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
    z-index: 10;
  }
  .topNavigation {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background-color: #0f111142;
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

  .navItem.open {
    border: 1px solid #f10000;
  }

  .navItem:hover {
    border: 1px solid #f10000;
  }

  .navItem a {
    color: var(--font-color-light-200);
  }

  .hamburgerMenu {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-top: 1rem;
    transform: translateY(-100%);
    transition: transform 250ms ease-in-out;
  }

  .hamburgerMenu.open {
    transform: translateY(0);
    background-color: #0f111142;
  }
</style>
