import axios from 'axios';

import atFlag from '/src/assets/flags/at.png';
import auFlag from '/src/assets/flags/au.png';
import beFlag from '/src/assets/flags/be.png';
import bhFlag from '/src/assets/flags/bh.png';
import brFlag from '/src/assets/flags/br.png';
import caFlag from '/src/assets/flags/ca.png';
import cnFlag from '/src/assets/flags/cn.png';
import deFlag from '/src/assets/flags/de.png';
import dkFlag from '/src/assets/flags/dk.png';
import esFlag from '/src/assets/flags/es.png';
import fiFlag from '/src/assets/flags/fi.png';
import frFlag from '/src/assets/flags/fr.png';
import gbFlag from '/src/assets/flags/gb.png';
import huFlag from '/src/assets/flags/hu.png';
import itFlag from '/src/assets/flags/it.png';
import jpFlag from '/src/assets/flags/jp.png';
import mcFlag from '/src/assets/flags/mc.png';
import mxFlag from '/src/assets/flags/mx.png';
import nlFlag from '/src/assets/flags/nl.png';
import noFlag from '/src/assets/flags/no.png';
import qaFlag from '/src/assets/flags/qa.png';
import thFlag from '/src/assets/flags/th.png';
import usFlag from '/src/assets/flags/us.png';

import alexAlbon from '/src/assets/drivers/alexAlbon.png';
import carlosSainz from '/src/assets/drivers/carlosSainz.png';
import charlesLeclerc from '/src/assets/drivers/charlesLeclerc.png';
import estebanOcon from '/src/assets/drivers/estebanOcon.png';
import fernandoAlonso from '/src/assets/drivers/fernandoAlonso.png';
import georgeRussell from '/src/assets/drivers/georgeRussell.png';
import kevinMagnussen from '/src/assets/drivers/kevinMagnussen.png';
import kuanJuZhou from '/src/assets/drivers/kuanJuZhou.png';
import lanceStroll from '/src/assets/drivers/lanceStroll.png';
import landoNorris from '/src/assets/drivers/landoNorris.png';
import lewisHamilton from '/src/assets/drivers/lewisHamilton.png';
import loganSargeant from '/src/assets/drivers/loganSargeant.png';
import maxVerstappen from '/src/assets/drivers/maxVerstappen.png';
import nicoHulkenberg from '/src/assets/drivers/nicoHulkenberg.png';
import nyckDeVries from '/src/assets/drivers/nyckDeVries.png';
import oscarPiastri from '/src/assets/drivers/oscarPiastri.png';
import pierreGasly from '/src/assets/drivers/pierreGasly.png';
import sergioPerez from '/src/assets/drivers/sergioPerez.png';
import valtteriBottas from '/src/assets/drivers/valtteriBottas.png';
import yukiTsunoda from '/src/assets/drivers/yukiTsunoda.png';

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
};

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
};

const baseEndpoint = 'http://ergast.com/api/f1';
const driversEndpoint = `current/driverStandings.json`;

async function getStandingsDataAxios() {
  try {
    const standingsData = await axios.get(`${baseEndpoint}/${driversEndpoint}`);
    const standings = standingsData.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    const clearedStandings = standings.map((driver) => {
      return { driverLastName: driver.Driver.familyName, driverPoints: driver.points, driverWins: driver.wins };
    });
    return clearedStandings;
  } catch (handleError) {}
}

const currentStandings = await getStandingsDataAxios();

function filterDriverData(driverName, property) {
  const foundDriver = currentStandings.find((driver) => {
    if (driver.driverLastName !== driverName) {
      return;
    } else {
      return driver;
    }
  });
  return foundDriver[property];
}

function handleError(err) {
  console.log(err);
}

export const drivers = [
  {
    id: 0,
    driverName: 'Max Verstappen',
    driverLastName: 'Verstappen',
    team: 'Red Bull',
    wins: filterDriverData('Verstappen', 'driverWins'),
    podiums: 80,
    poles: 22,
    points: filterDriverData('Verstappen', 'driverPoints'),
    driverFlag: flags.nl,
    driverImg: driverImages.maxVerstappen,
    teamColor: '#3671C6aa',
  },
  {
    id: 1,
    driverName: 'Sergio Perez',
    team: 'Red Bull',
    wins: filterDriverData('Pérez', 'driverWins'),
    podiums: 28,
    poles: 2,
    points: filterDriverData('Pérez', 'driverPoints'),
    driverFlag: flags.mx,
    driverImg: driverImages.sergioPerez,
    teamColor: '#3671C6aa',
  },
  {
    id: 2,
    driverName: 'Charles Leclerc',
    team: 'Ferrari',
    wins: filterDriverData('Leclerc', 'driverWins'),
    podiums: 24,
    poles: 18,
    points: filterDriverData('Leclerc', 'driverPoints'),
    driverFlag: flags.mc,
    driverImg: driverImages.charlesLeclerc,
    teamColor: '#F91536aa',
  },
  {
    id: 3,
    driverName: 'Carlos Sainz',
    team: 'Ferrari',
    wins: filterDriverData('Sainz', 'driverWins'),
    podiums: 15,
    poles: 3,
    points: filterDriverData('Sainz', 'driverPoints'),
    driverFlag: flags.es,
    driverImg: driverImages.carlosSainz,
    teamColor: '#F91536aa',
  },
  {
    id: 4,
    driverName: 'Lewis Hamilton',
    team: 'Mercedes',
    wins: filterDriverData('Hamilton', 'driverWins'),
    podiums: 192,
    poles: 103,
    points: filterDriverData('Hamilton', 'driverPoints'),
    driverFlag: flags.gb,
    driverImg: driverImages.lewisHamilton,
    teamColor: '#6CD3BFaa',
  },
  {
    id: 5,
    driverName: 'George Russell',
    team: 'Mercedes',
    wins: filterDriverData('Russell', 'driverWins'),
    podiums: 9,
    poles: 1,
    points: filterDriverData('Russell', 'driverPoints'),
    driverFlag: flags.gb,
    driverImg: driverImages.georgeRussell,
    teamColor: '#6CD3BFaa',
  },
  {
    id: 6,
    driverName: 'Esteban Ocon',
    team: 'Alpine',
    wins: filterDriverData('Ocon', 'driverWins'),
    podiums: 2,
    poles: '-',
    points: filterDriverData('Ocon', 'driverPoints'),
    driverFlag: flags.fr,
    driverImg: driverImages.estebanOcon,
    teamColor: '#2293D1aa',
  },
  {
    id: 7,
    driverName: 'Pierre Gasly',
    team: 'Alpine',
    wins: filterDriverData('Gasly', 'driverWins'),
    podiums: 3,
    poles: '-',
    points: filterDriverData('Gasly', 'driverPoints'),
    driverFlag: flags.fr,
    driverImg: driverImages.pierreGasly,
    teamColor: '#2293D1aa',
  },
  {
    id: 8,
    driverName: 'Lando Norris',
    team: 'McLaren',
    wins: filterDriverData('Norris', 'driverWins'),
    podiums: 6,
    poles: 1,
    points: filterDriverData('Norris', 'driverPoints'),
    driverFlag: flags.gb,
    driverImg: driverImages.landoNorris,
    teamColor: '#F58020aa',
  },
  {
    id: 9,
    driverName: 'Oscar Piastri',
    team: 'McLaren',
    wins: filterDriverData('Piastri', 'driverWins'),
    podiums: '-',
    poles: '-',
    points: filterDriverData('Piastri', 'driverPoints'),
    driverFlag: flags.au,
    driverImg: driverImages.oscarPiastri,
    teamColor: '#F58020aa',
  },
  {
    id: 10,
    driverName: 'Valtteri Bottas',
    team: 'Alfa Romeo',
    wins: filterDriverData('Bottas', 'driverWins'),
    podiums: 67,
    poles: 20,
    points: filterDriverData('Bottas', 'driverPoints'),
    driverFlag: flags.fi,
    driverImg: driverImages.valtteriBottas,
    teamColor: '#C92D4Baa',
  },
  {
    id: 11,
    driverName: 'Guanyu Zhou',
    team: 'Alfa Romeo',
    wins: filterDriverData('Zhou', 'driverWins'),
    podiums: '-',
    poles: '-',
    points: filterDriverData('Zhou', 'driverPoints'),
    driverFlag: flags.cn,
    driverImg: driverImages.kuanJuZhou,
    teamColor: '#C92D4Baa',
  },
  {
    id: 12,
    driverName: 'Fernando Alonso',
    team: 'Aston Martin',
    wins: filterDriverData('Alonso', 'driverWins'),
    podiums: 101,
    poles: 22,
    points: filterDriverData('Alonso', 'driverPoints'),
    driverFlag: flags.es,
    driverImg: driverImages.fernandoAlonso,
    teamColor: '#358C75aa',
  },
  {
    id: 13,
    driverName: 'Lance Stroll',
    team: 'Aston Martin',
    wins: filterDriverData('Stroll', 'driverWins'),
    podiums: 3,
    poles: 1,
    points: filterDriverData('Stroll', 'driverPoints'),
    driverFlag: flags.ca,
    driverImg: driverImages.lanceStroll,
    teamColor: '#358C75aa',
  },
  {
    id: 14,
    driverName: 'Kevin Magnussen',
    team: 'Haas',
    wins: filterDriverData('Magnussen', 'driverWins'),
    podiums: 1,
    poles: 1,
    points: filterDriverData('Magnussen', 'driverPoints'),
    driverFlag: flags.dk,
    driverImg: driverImages.kevinMagnussen,
    teamColor: '#B6BABDaa',
  },
  {
    id: 15,
    driverName: 'Nico Hulkenberg',
    team: 'Haas',
    wins: filterDriverData('Hülkenberg', 'driverWins'),
    podiums: '-',
    poles: 1,
    points: filterDriverData('Hülkenberg', 'driverPoints'),
    driverFlag: flags.de,
    driverImg: driverImages.nicoHulkenberg,
    teamColor: '#B6BABDaa',
  },
  {
    id: 16,
    driverName: 'Yuki Tsunoda',
    team: 'Alpha Tauri',
    wins: filterDriverData('Tsunoda', 'driverWins'),
    podiums: '-',
    poles: '-',
    points: filterDriverData('Tsunoda', 'driverPoints'),
    driverFlag: flags.jp,
    driverImg: driverImages.yukiTsunoda,
    teamColor: '#5E8FAAaa',
  },
  {
    id: 17,
    driverName: 'Nyck de Vries',
    team: 'Alpha Tauri',
    wins: filterDriverData('de Vries', 'driverWins'),
    podiums: '-',
    poles: '-',
    points: filterDriverData('de Vries', 'driverPoints'),
    driverFlag: flags.nl,
    driverImg: driverImages.nyckDeVries,
    teamColor: '#5E8FAAaa',
  },
  {
    id: 18,
    driverName: 'Alex Albon',
    team: 'Williams',
    wins: filterDriverData('Albon', 'driverWins'),
    podiums: 2,
    poles: '-',
    points: filterDriverData('Albon', 'driverPoints'),
    driverFlag: flags.th,
    driverImg: driverImages.alexAlbon,
    teamColor: '#37BEDDaa',
  },
  {
    id: 19,
    driverName: 'Logan Sargeant',
    team: 'Williams',
    wins: filterDriverData('Sargeant', 'driverWins'),
    podiums: '-',
    poles: '-',
    points: filterDriverData('Sargeant', 'driverPoints'),
    driverFlag: flags.us,
    driverImg: driverImages.loganSargeant,
    teamColor: '#37BEDDaa',
  },
];
