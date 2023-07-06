<script setup>
  import { computed, inject, ref } from 'vue'

  const facts = inject('trackFacts')
  const currentFactIndex = ref(0)

  const currentFact = computed(() => facts[currentFactIndex.value])

  const prevFact = () => {
    currentFactIndex.value = (currentFactIndex.value - 1 + facts.length) % facts.length
  }

  const nextFact = () => {
    currentFactIndex.value = (currentFactIndex.value + 1) % facts.length
  }
</script>
<template>
  <div class="factsWrapper">
    <div class="factHeader">
      <h3 class="factTitle">{{ currentFact.factTitle }}</h3>
      <div class="factNav">
        <svg @click="prevFact" class="arrow" width="7.6939387" height="14" viewBox="0 -4.5 0.19234847 0.35">
          <path
            d="m 0.18581999,-4.4948972 v 0 c -0.00674,-0.0068 -0.0186141,-0.0068 -0.0253537,0 l -0.14987553,0.1446187 c -0.01412104,0.01364 -0.01412104,0.035819 0,0.049478 l 0.1509667,0.1456873 c 0.007061,0.00674 0.0182932,0.00684 0.0253537,1.733e-4 0.007061,-0.0068 0.007381,-0.018004 1.6047e-4,-0.024936 l -0.1381294,-0.1333026 c -0.0070605,-0.00684 -0.0070605,-0.017908 0,-0.024776 L 0.18598045,-4.470211 c 0.007061,-0.00684 0.007061,-0.017908 0,-0.024744"
          />
        </svg>
        <svg @click="nextFact" class="arrow" width="7.6939383" height="13.999948" viewBox="0 -4.5 0.19234846 0.34999869">
          <path
            d="m 0.00652849,-4.4949 v 0 c 0.00674,-0.0068 0.0186141,-0.0068 0.0253537,0 l 0.14987553,0.1446187 c 0.014121,0.01364 0.014121,0.035819 0,0.049478 l -0.1509667,0.1456873 c -0.007061,0.00674 -0.0182932,0.00684 -0.0253537,1.733e-4 -0.007061,-0.0068 -0.007381,-0.018004 -1.6047e-4,-0.024936 l 0.1381294,-0.1333026 c 0.00706,-0.00684 0.00706,-0.017908 0,-0.024776 L 0.00636803,-4.4702138 c -0.007060992,-0.00684 -0.007060992,-0.017908 0,-0.024744"
          />
        </svg>
      </div>
    </div>
    <div class="fact">{{ currentFact.fact }}</div>
  </div>
</template>
<style scoped>
  .factsWrapper {
    display: flex;
    gap: 0.5rem;
    flex-direction: column;
    text-align: left;
  }

  .factHeader {
    display: flex;
    flex-direction: row;
    gap: 0.75rem;
    align-items: center;
  }
  .factNav {
    display: flex;
    gap: 0.5rem;
  }

  .fact {
    max-height: 210px;
    overflow-y: scroll;
  }

  .arrow {
    fill: var(--font-color-light-200);
    cursor: pointer;
  }
</style>
