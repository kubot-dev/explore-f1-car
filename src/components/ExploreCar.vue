<script setup>
import { useCatalogue, useTres, useLoader } from '@tresjs/core'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const { extend } = useCatalogue()
extend({ OrbitControls })

const { state } = useTres()
</script>

<template>
  <div class="carWrapper">
    <div class="carContent">
      <TresCanvas>
        <TresPerspectiveCamera :args="[75, 1, 0.1, 1000]" :position="[1, 1, 1]" />
        <TresOrbitControls v-if="state.renderer" :args="[state.camera, state.renderer?.domElement]" />
        <TresScene>
          <TresMesh :position="[0, 0, 0]">
            <TresBoxGeometry :args="[1, 1, 1]" />
            <TresMeshNormalMaterial color="orange" />
          </TresMesh>
        </TresScene>
      </TresCanvas>
    </div>
  </div>
</template>

<style scoped>
.carWrapper {
  height: 100vh;
  padding-top: 7.5rem;
  background-color: rgb(43, 53, 64);
  display: grid;
  place-items: center;
}

.carContent {
  width: 90%;
  height: 80%;
  border: 1px solid blue;
}
</style>
