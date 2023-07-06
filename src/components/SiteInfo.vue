<script setup>
  import { defineProps } from 'vue'

  const props = defineProps({
    modalOpened: Boolean,
  })

  const emit = defineEmits({
    event: 'modalOpened',
  })
</script>
<template>
  <div class="infoModal" :class="{ open: props.modalOpened }" @click="$emit('modalOpened')">
    <div>
      <h4>What is the site about?</h4>
      <p>
        <span>Explore f1 car</span> is a personal project which was created with a goal to learn about Javascript library
        <a target="_blank" href="https://threejs.org/">Three.js</a> with the intention to provide experience and to be able to explore f1
        car on a 3d model.
      </p>
      <p>There are 2 more sections to explore f1:</p>
      <ul>
        <li>1. Explore current drivers.</li>
        <li>2. Explore Tracks.</li>
      </ul>
      <p>
        In Explore Drivers you can get to know current drivers in the 2023 season. There are couple of stats which are alltime stats to
        current date. The stats are up to date from external API using axios.
      </p>
    </div>
    <div>
      <h4>How to use?</h4>
      <p>
        You can explore 3d model of f1 car with navigating by holding mouse click and orbiting around the car. By clicking on a highlighted
        part you get a little tech info about the part.
      </p>
      <p>In the Explore drivers you get to know all of the current drivers.</p>
      <p>In the Explore tracks you get to know a few of racetracks with stats and a bunch of fun facts about the tracks.</p>
      <p><strong>Note:</strong> I understand that this might be useless. But i learned a lot during building this small project ✌️</p>
    </div>
  </div>
</template>
<style scoped>
  .infoModal {
    position: absolute;
    top: 50%;
    left: 10%;
    right: 10%;
    transform: translateY(-50%);
    background-color: #1f1f1ff1;
    opacity: 0;
    z-index: -1;
    transition: opacity 250ms ease-in-out, z-index 250ms ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 1rem;
    margin: 0 auto;
  }

  .open {
    z-index: 11;
    opacity: 1;
  }
</style>
