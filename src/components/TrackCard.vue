<script setup>
  import { provide } from 'vue'
  import TrackFact from './TrackFact.vue'

  const props = defineProps({
    track: Object,
    required: true,
  })

  const trackFacts = props.track.trackFacts

  provide('trackFacts', trackFacts)
</script>

<template>
  <div class="trackWrapper">
    <div class="contentWrapper">
      <h2 class="trackName">{{ track.trackName }}</h2>
      <div class="trackLayout">
        <img class="trackFlag" :src="track.trackFlag" />
        <img class="track" :src="track.track" alt="" />
      </div>
      <div class="trackInfo">
        <div class="trackStats">
          <div class="leftColumn">
            <div class="statWrapper">
              <div class="statName">Circuit length:</div>
              <div class="stat">{{ track.circuitLength }}</div>
            </div>
            <div class="statWrapper">
              <div class="statName">Number of Laps:</div>
              <div class="stat">{{ track.numberOfLaps }}</div>
            </div>
          </div>
          <div class="rightColumn">
            <div class="statWrapper">
              <div class="statName">Race distance:</div>
              <div class="stat">{{ track.raceDistance }}</div>
            </div>
            <div class="statWrapper">
              <div class="statName">First GP:</div>
              <div class="stat">{{ track.firstGP }}</div>
            </div>
          </div>
        </div>
        <div class="trackFacts">
          <TrackFact></TrackFact>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .trackWrapper {
    width: 469px;
    background-color: var(--bg-color-secondary);
    border-radius: 1rem;
  }

  .contentWrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-inline: 1.5rem;
    padding-block: 1rem;
  }

  .trackName {
    font-size: 2.25rem;
    line-height: 55px;
  }

  .trackLayout {
    position: relative;
  }

  .trackFlag {
    width: 140px;
    border-radius: 0.5rem;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
  }

  .track {
    width: 100%;
    position: relative;
    z-index: 2;
  }

  .trackInfo {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-size: 1rem;
  }

  .trackStats {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .statWrapper {
    display: flex;
    flex-direction: row;
    gap: 0.25rem;
  }

  .statName {
    font-weight: 600;
  }
</style>
