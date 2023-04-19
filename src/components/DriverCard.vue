<script setup>
import { useMouseInElement } from '@vueuse/core'
import { computed, ref, useCssModule } from 'vue'

useCssModule('teamColors')

const props = defineProps({
  drivers: Object,
  required: true,
})

const target = ref(null)
const { elementX, elementY, isOutside, elementHeight, elementWidth } = useMouseInElement(target)

const cardTransform = computed(() => {
  const MAX_ROTATION = 6

  const rX = (MAX_ROTATION / 2 - (elementY.value / elementHeight.value) * MAX_ROTATION).toFixed(2)
  const rY = ((elementX.value / elementWidth.value) * MAX_ROTATION - MAX_ROTATION / 2).toFixed(2)

  return isOutside.value
    ? `perspective(${elementWidth.value}px) rotateX(0deg) rotateY(0deg) `
    : `perspective(${elementWidth.value}px) rotateX(${rX}deg) rotateY(${rY}deg) scale(1.05) `
})
</script>

<template>
  <div ref="target" :style="{ transform: cardTransform }" class="cardWrapper">
    <div class="driverWrapper">
      <img class="driverFlag" :src="drivers.driverFlag" alt="" />
      <img class="driver" :src="drivers.driverImg" alt="" />
    </div>
    <div class="driverName">
      <span>{{ drivers.driverName }}</span>
    </div>
    <div class="driverStats">
      <div class="driverTeam">
        <span class="team">Team:</span>
        <div class="teamName">
          <div class="teamTag"></div>
          <span>{{ drivers.team }}</span>
        </div>
      </div>
      <div class="driverWins">
        <span class="wins">Wins:</span>
        <span class="winsCount">{{ drivers.wins }}</span>
      </div>
      <div class="driverPodiums">
        <span class="podiums">Podiums:</span>
        <span class="podiumsCount">{{ drivers.podiums }}</span>
      </div>
      <div class="driverPoles">
        <span class="poles">Poles:</span>
        <span class="polesCount">{{ drivers.poles }}</span>
      </div>
      <div class="driverPoints">
        <span class="points">Points:</span>
        <span class="pointsCount">{{ drivers.points }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cardWrapper {
  width: 246px;
  height: 395px;

  display: flex;
  flex-flow: column;
  gap: 0.5rem;

  border-radius: 1rem;
  padding: 1rem;

  background-color: var(--bg-color-secondary);
  box-shadow: 0px 0px 0.5rem 0.5rem rgb(0, 0, 0, 0.25);

  transition: box-shadow 150ms ease-in-out;
}

.cardWrapper:hover {
  box-shadow: 0px 0px 0.5rem 0.5rem v-bind('drivers.teamColor');
}
.driverWrapper {
  position: relative;
}
.driverFlag {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  width: 214px;
  height: 180px;
  object-fit: cover;

  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.driver {
  position: relative;
  margin: 0 auto;
  z-index: 1;
  width: 181px;
  height: 206px;
  object-fit: cover;
}

.driverName {
  font-weight: bold;
  font-size: 1rem;
}

.driverStats {
  display: flex;
  flex-direction: column;

  font-size: 14px;
  font-weight: 400;

  padding-inline: 1rem;
}

.driverStats > * {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.teamName {
  display: flex;
  gap: 0.5rem;
}

.teamTag {
  width: 5px;
  height: 21px;
  background-color: v-bind('drivers.teamColor');
}

img {
  width: 100%;
}
</style>
