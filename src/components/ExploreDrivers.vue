<script setup>
  import { ref, reactive, computed } from 'vue'
  import DriverCard from './DriverCard.vue'

  import atFlag from '/src/assets/flags/at.png'
  import auFlag from '/src/assets/flags/au.png'
  import beFlag from '/src/assets/flags/be.png'
  import bhFlag from '/src/assets/flags/bh.png'
  import brFlag from '/src/assets/flags/br.png'
  import caFlag from '/src/assets/flags/ca.png'
  import cnFlag from '/src/assets/flags/cn.png'
  import deFlag from '/src/assets/flags/de.png'
  import dkFlag from '/src/assets/flags/dk.png'
  import esFlag from '/src/assets/flags/es.png'
  import fiFlag from '/src/assets/flags/fi.png'
  import frFlag from '/src/assets/flags/fr.png'
  import gbFlag from '/src/assets/flags/gb.png'
  import huFlag from '/src/assets/flags/hu.png'
  import itFlag from '/src/assets/flags/it.png'
  import jpFlag from '/src/assets/flags/jp.png'
  import mcFlag from '/src/assets/flags/mc.png'
  import mxFlag from '/src/assets/flags/mx.png'
  import nlFlag from '/src/assets/flags/nl.png'
  import noFlag from '/src/assets/flags/no.png'
  import qaFlag from '/src/assets/flags/qa.png'
  import thFlag from '/src/assets/flags/th.png'
  import usFlag from '/src/assets/flags/us.png'

  const flags = {
    at: atFlag,
    au: auFlag,
    be: beFlag,
    bh: bhFlag,
    br: brFlag,
    ca: caFlag,
    cn: cnFlag,
    de: deFlag,
    dk: dkFlag,
    es: esFlag,
    fi: fiFlag,
    fr: frFlag,
    gb: gbFlag,
    hu: huFlag,
    it: itFlag,
    jp: jpFlag,
    mc: mcFlag,
    mx: mxFlag,
    nl: nlFlag,
    no: noFlag,
    qa: qaFlag,
    th: thFlag,
    us: usFlag,
  }

  import alexAlbon from '/src/assets/drivers/alexAlbon.png'
  import carlosSainz from '/src/assets/drivers/carlosSainz.png'
  import charlesLeclerc from '/src/assets/drivers/charlesLeclerc.png'
  import estebanOcon from '/src/assets/drivers/estebanOcon.png'
  import fernandoAlonso from '/src/assets/drivers/fernandoAlonso.png'
  import georgeRussell from '/src/assets/drivers/georgeRussell.png'
  import kevinMagnussen from '/src/assets/drivers/kevinMagnussen.png'
  import kuanJuZhou from '/src/assets/drivers/kuanJuZhou.png'
  import lanceStroll from '/src/assets/drivers/lanceStroll.png'
  import landoNorris from '/src/assets/drivers/landoNorris.png'
  import lewisHamilton from '/src/assets/drivers/lewisHamilton.png'
  import loganSargeant from '/src/assets/drivers/loganSargeant.png'
  import maxVerstappen from '/src/assets/drivers/maxVerstappen.png'
  import nicoHulkenberg from '/src/assets/drivers/nicoHulkenberg.png'
  import nyckDeVries from '/src/assets/drivers/nyckDeVries.png'
  import oscarPiastri from '/src/assets/drivers/oscarPiastri.png'
  import pierreGasly from '/src/assets/drivers/pierreGasly.png'
  import sergioPerez from '/src/assets/drivers/sergioPerez.png'
  import valtteriBottas from '/src/assets/drivers/valtteriBottas.png'
  import yukiTsunoda from '/src/assets/drivers/yukiTsunoda.png'

  const driverImages = {
    alexAlbon,
    carlosSainz,
    charlesLeclerc,
    estebanOcon,
    fernandoAlonso,
    georgeRussell,
    kevinMagnussen,
    kuanJuZhou,
    lanceStroll,
    landoNorris,
    lewisHamilton,
    loganSargeant,
    maxVerstappen,
    nicoHulkenberg,
    nyckDeVries,
    oscarPiastri,
    pierreGasly,
    sergioPerez,
    valtteriBottas,
    yukiTsunoda,
  }

  const drivers = ref([
    {
      id: 0,
      driverName: 'Max Verstappen',
      team: 'Red Bull',
      wins: 37,
      podiums: 80,
      poles: 22,
      points: 2080.5,
      driverFlag: flags.nl,
      driverImg: driverImages.maxVerstappen,
      teamColor: '#3671C6',
    },
    {
      id: 1,
      driverName: 'Sergio Perez',
      team: 'Red Bull',
      wins: 5,
      podiums: 28,
      poles: 2,
      points: 1255,
      driverFlag: flags.mx,
      driverImg: driverImages.sergioPerez,
      teamColor: '#3671C6',
    },
    {
      id: 2,
      driverName: 'Charles Leclerc',
      team: 'Ferrari',
      wins: 5,
      podiums: 24,
      poles: 18,
      points: 874,
      driverFlag: flags.mc,
      driverImg: driverImages.charlesLeclerc,
      teamColor: '#F91536',
    },
    {
      id: 3,
      driverName: 'Carlos Sainz',
      team: 'Ferrari',
      wins: 1,
      podiums: 15,
      poles: 3,
      points: 802.5,
      driverFlag: flags.es,
      driverImg: driverImages.carlosSainz,
      teamColor: '#F91536',
    },
    {
      id: 4,
      driverName: 'Lewis Hamilton',
      team: 'Mercedes',
      wins: 103,
      podiums: 192,
      poles: 103,
      points: 4443.5,
      driverFlag: flags.gb,
      driverImg: driverImages.lewisHamilton,
      teamColor: '#6CD3BF',
    },
    {
      id: 5,
      driverName: 'George Russell',
      team: 'Mercedes',
      wins: 1,
      podiums: 9,
      poles: 1,
      points: 312,
      driverFlag: flags.gb,
      driverImg: driverImages.georgeRussell,
      teamColor: '#6CD3BF',
    },
    {
      id: 6,
      driverName: 'Esteban Ocon',
      team: 'Alpine',
      wins: 1,
      podiums: 2,
      poles: '-',
      points: 368,
      driverFlag: flags.fr,
      driverImg: driverImages.estebanOcon,
      teamColor: '#2293D1',
    },
    {
      id: 7,
      driverName: 'Pierre Gasly',
      team: 'Alpine',
      wins: 1,
      podiums: 3,
      poles: '-',
      points: 336,
      driverFlag: flags.fr,
      driverImg: driverImages.pierreGasly,
      teamColor: '#2293D1',
    },
    {
      id: 8,
      driverName: 'Lando Norris',
      team: 'McLaren',
      wins: '-',
      podiums: 6,
      poles: 1,
      points: 436,
      driverFlag: flags.gb,
      driverImg: driverImages.landoNorris,
      teamColor: '#F58020',
    },
    {
      id: 9,
      driverName: 'Oscar Piastri',
      team: 'McLaren',
      wins: '-',
      podiums: '-',
      poles: '-',
      points: 4,
      driverFlag: flags.au,
      driverImg: driverImages.oscarPiastri,
      teamColor: '#F58020',
    },
    {
      id: 10,
      driverName: 'Valtteri Bottas',
      team: 'Alfa Romeo',
      wins: 10,
      podiums: 67,
      poles: 20,
      points: 1791,
      driverFlag: flags.fi,
      driverImg: driverImages.valtteriBottas,
      teamColor: '#C92D4B',
    },
    {
      id: 11,
      driverName: 'Guanyu Zhou',
      team: 'Alfa Romeo',
      wins: '-',
      podiums: '-',
      poles: '-',
      points: 8,
      driverFlag: flags.cn,
      driverImg: driverImages.kuanJuZhou,
      teamColor: '#C92D4B',
    },
    {
      id: 12,
      driverName: 'Fernando Alonso',
      team: 'Aston Martin',
      wins: 32,
      podiums: 101,
      poles: 22,
      points: 2106,
      driverFlag: flags.es,
      driverImg: driverImages.fernandoAlonso,
      teamColor: '#358C75',
    },
    {
      id: 13,
      driverName: 'Lance Stroll',
      team: 'Aston Martin',
      wins: '-',
      podiums: 3,
      poles: 1,
      points: 214,
      driverFlag: flags.ca,
      driverImg: driverImages.lanceStroll,
      teamColor: '#358C75',
    },
    {
      id: 14,
      driverName: 'Kevin Magnussen',
      team: 'Haas',
      wins: '-',
      podiums: 1,
      poles: 1,
      points: 184,
      driverFlag: flags.dk,
      driverImg: driverImages.kevinMagnussen,
      teamColor: '#B6BABD',
    },
    {
      id: 15,
      driverName: 'Nico Hulkenberg',
      team: 'Haas',
      wins: '-',
      podiums: '-',
      poles: 1,
      points: 527,
      driverFlag: flags.de,
      driverImg: driverImages.nicoHulkenberg,
      teamColor: '#B6BABD',
    },
    {
      id: 16,
      driverName: 'Yuki Tsunoda',
      team: 'Alpha Tauri',
      wins: '-',
      podiums: '-',
      poles: '-',
      points: 45,
      driverFlag: flags.jp,
      driverImg: driverImages.yukiTsunoda,
      teamColor: '#5E8FAA',
    },
    {
      id: 17,
      driverName: 'Nyck de Vries',
      team: 'Alpha Tauri',
      wins: '-',
      podiums: '-',
      poles: '-',
      points: 2,
      driverFlag: flags.nl,
      driverImg: driverImages.nyckDeVries,
      teamColor: '#5E8FAA',
    },
    {
      id: 18,
      driverName: 'Alex Albon',
      team: 'Williams',
      wins: '-',
      podiums: 2,
      poles: '-',
      points: 202,
      driverFlag: flags.th,
      driverImg: driverImages.alexAlbon,
      teamColor: '#37BEDD',
    },
    {
      id: 19,
      driverName: 'Logan Sargeant',
      team: 'Williams',
      wins: '-',
      podiums: '-',
      poles: '-',
      points: '-',
      driverFlag: flags.us,
      driverImg: driverImages.loganSargeant,
      teamColor: '#37BEDD',
    },
  ])

  const pages = reactive({
    displayedItems: [],
    visibleCount: 8,
    currentPage: 1,
  })

  const pageCount = computed(() => {
    return Math.ceil(drivers.value.length / pages.visibleCount)
  })

  const showPage = (page) => {
    const startIndex = (page - 1) * pages.visibleCount
    const endIndex = startIndex + pages.visibleCount
    pages.displayedItems = drivers.value.slice(startIndex, endIndex)
    pages.currentPage = page
  }

  showPage(1)
</script>

<template>
  <div class="driversWrapper">
    <div class="drivers">
      <DriverCard v-for="driver in pages.displayedItems" :key="driver.id" :drivers="driver"></DriverCard>
    </div>
    <div class="pagination">
      <button class="page" v-for="page in pageCount" :key="page" @click.prevent="showPage(page)">
        <svg
          class="pageHelmet"
          :class="{ selected: page === pages.currentPage }"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 335.841 335.841"
          xml:space="preserve"
        >
          <g>
            <path
              d="M331.947,226.808l-1.932-5.573c-1.31-3.778-2.823-7.482-4.532-11.097L306.735,170.5l-25.861-54.679
  		c-1.656-3.501-3.447-6.939-5.387-10.291c-0.69-1.193-1.312-2.233-1.653-2.718c-25.83-36.785-75.364-58.221-137.009-59.039
  		c-0.608-0.009-1.205-0.013-1.811-0.013c-73.817,0-134.382,59.207-135.009,131.982c-0.364,42.22,19.624,82.54,53.467,107.858
  		c7.311,5.469,16.443,8.48,25.715,8.48h223.812c13.745,0,26.062-9.207,29.952-22.39C337.12,255.559,336.773,240.731,331.947,226.808
  		z M314.197,215.295h-19.735l-43.618-87.761h21.892c0.018,0.042,0.041,0.093,0.058,0.133l0.084,0.201L314.197,215.295z
  		 M173.498,127.877l39.437,79.33c-7.852-3.842-15.105-8.985-21.465-15.35c-15.112-15.111-23.436-35.203-23.436-56.573
  		C168.034,131.804,170.338,128.854,173.498,127.877z M230.509,213.356l-42.664-85.821h22.982l43.628,87.761h-6.411
  		C242.069,215.295,236.202,214.622,230.509,213.356z M268.972,215.295l-43.628-87.761h10.983l43.618,87.761H268.972z
  		 M320.481,266.012c-2.271,7.695-9.46,13.069-17.483,13.069H79.187c-6.483,0-12.85-2.092-17.928-5.891
  		c-30.543-22.85-48.583-59.237-48.254-97.337C13.57,110.186,68.303,56.76,135.014,56.76c0.548,0,1.088,0.004,1.638,0.011
  		c59.62,0.791,106.684,21.727,129.163,57.449c0.053,0.096,0.116,0.209,0.174,0.314h-90.214c-11.436,0-20.74,9.309-20.74,20.75
  		c0,24.843,9.675,48.199,27.242,65.765c17.559,17.57,40.916,27.246,65.768,27.246h70.66l0.96,2.771
  		C323.597,242.411,323.88,254.495,320.481,266.012z"
            />
            <path
              d="M128.605,135.536c-11.854,0-21.499,9.645-21.499,21.499s9.645,21.499,21.499,21.499c11.855,0,21.5-9.645,21.5-21.499
  		S140.46,135.536,128.605,135.536z M128.605,165.534c-4.687,0-8.499-3.813-8.499-8.499s3.813-8.499,8.499-8.499s8.5,3.813,8.5,8.499
  		S133.292,165.534,128.605,165.534z"
            />
          </g>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
  .driversWrapper {
    padding-top: 7.5rem;
    height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
  }

  .drivers {
    width: fit-content;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    gap: 2rem;
    margin: 0 auto;
  }

  .pagination {
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
    justify-content: center;
  }

  .pageHelmet {
    width: 28px;
    fill: var(--font-color-light-200);
    cursor: pointer;
  }

  .selected {
    fill: var(--accent-color-400);
  }

  .pageHelmet:hover,
  .pageHelmet:active {
    fill: var(--accent-color-400);
  }
</style>
