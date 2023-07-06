<script type="module">
  import silverStoneTrack from '/src/assets/tracks/trackSilverstone.svg';
  import gbFlag from '/src/assets/flags/gb.png';

  import albertParkTrack from '/src/assets/tracks/trackAlbertPark.svg';
  import auFlag from '/src/assets/flags/au.png';

  import monzaTrack from '/src/assets/tracks/RaceCircuitAutodromaDiMonza.svg';
  import itFlag from '/src/assets/flags/it.png';
  // script setup interfere with swiper library

  import { ref } from 'vue';
  import TrackCard from './TrackCard.vue';

  import { register } from 'swiper/element/bundle';

  register();

  import 'swiper/css/bundle';

  export default {
    components: { TrackCard },
    setup() {
      const tracks = ref([
        {
          id: 0,
          trackName: 'Silverstone',
          track: silverStoneTrack,
          trackFlag: gbFlag,
          circuitLength: 5.891,
          numberOfLaps: 52,
          raceDistance: 306.198,
          firstGP: 1950,
          trackFacts: [
            {
              id: 0,
              factTitle: 'Silverstone Was Originally An Air Force Base',
              fact: 'Before it was a racing circuit, Silverstone originally had a very different purpose. It was first built as a base for the countrys Royal Air Force, and was opened in 1943 during the Second World War. After the war, there was no need for the base, as other, nearby bases already had the capacity to hold the troops and aircraft that the RAF had retained. So, the base was redeveloped as a racing circuit, although parts of the three original runways can still be seen today, as they were incorporated into the tracks design.',
            },
            {
              id: 1,
              factTitle: "The Silverstone Hare Is The Track's Unofficial Mascot",
              fact: "When it's not being used as a racetrack, Silverstone is reportedly a very popular venue with the local British wildlife, and the venue's in-house museum even features a whole section dedicated to the animals living there. The most high-profile resident is the Silverstone hare, which has become an unofficial mascot of the track thanks to its long-standing appearances, both on and off the racetrack. Unfortunately, occasionally hares venture onto the track while races are happening, leading to incidents, like Reg Parnell's high-profile collision with one at the 1950 British Grand Prix.",
            },
            {
              id: 2,
              factTitle: 'It Hosted The First F1 Race Ever',
              fact: "Silverstone's title as the Birthplace of Formula 1 is no exaggeration, as the first-ever F1 race was held there in 1950. The inaugural British Grand Prix was attended by over 120,000 fans, from across the UK and Europe. This initial event is also the only time that British royalty has attended an F1 event, as His Royal Highness King George VI attended with his wife, Queen Elizabeth, and his daughter Princess Margaret.",
            },
          ],
        },
        {
          id: 1,
          trackName: 'Albert Park',
          track: albertParkTrack,
          trackFlag: auFlag,
          circuitLength: 5.278,
          numberOfLaps: 58,
          raceDistance: 306.124,
          firstGP: 1996,
          trackFacts: [
            {
              id: 0,
              factTitle: 'An afternoon of mayhem',
              fact: 'The 2008 Australian Grand Prix was a chaotic one, with just seven drivers reaching the end of the race. A multitude of incidents saw five drivers end their races on the first lap, while Felipe Massa and David Coulthard had a sizeable coming together at Turn 1 before the race had reached half-distance. The largest crash of the afternoon was for Timo Glock as he ran wide and broke his suspension, sending his Toyota car airborne. Rubens Barrichello was disqualified from the race having left the pit-lane when the red light was showing. The incident occurred after the Brazilian had a bad pit-stop, in which he left his pit-box with the fuel-hose still attached. Despite all of the incidents around him, Lewis Hamilton stayed calm to take victory, while Nico Rosberg secured his first podium finish.',
            },
            {
              id: 1,
              factTitle: 'Circuit Style',
              fact: 'Like Monaco and Montreal, for example, the Melbourne track is a street circuit. For most of the year, the roads used for the race are open to regular traffic. Unlike Monaco, though, the Melbourne Grand Prix Circuit does have substantial run-off areas at most turns, akin to the Circuit Gilles-Villeneuve in Montreal. Both the Melbourne and Montreal tracks are located in urban parks and both are considered high-speed circuits (whereas Monaco is the slowest circuit on the calendar). Of course, Melbourne also has a number of slow chicanes, testing the brakes of the F1 cars. Although cars may not end up in the barriers as often as at Monaco, the potential for high temperatures, the abrasive track surface and early-season reliability issues often lead to more retirements than usual. Out of the last five seasons, only 2013 saw more than 14 cars take the chequered flag.',
            },
            {
              id: 2,
              factTitle: 'The track can split a car in half',
              fact: 'The stop/start nature of the circuit can often cause first lap mayhem. This was no more evident than at the first Australian Grand Prix to be held at the Albert Park Circuit in 1996. In the braking zone for the slow turn three, Martin Brundle was launched over the McLaren of David Coulthard. The Brit barrel rolled into the gravel, causing the car to break in two. The race was eventually restarted (with Brundle running back to the pits to compete in the spare car) and was won by Damon Hill.',
            },
            {
              id: 3,
              factTitle: "Blink and you'll miss it",
              fact: 'The 1991 Australian Grand Prix holds the record for being the shortest ever Formula 1 race. Held at its previous home in Adelaide, it was stopped after 16 laps due to torrential rain. Results were taken from lap 14, with Ayrton Senna winning for McLaren. The official race time was just 24 minutes.',
            },
          ],
        },
        {
          id: 2,
          trackName: 'Monza',
          track: monzaTrack,
          trackFlag: itFlag,
          circuitLength: 5.793,
          numberOfLaps: 53,
          raceDistance: 306.72,
          firstGP: 1950,
          trackFacts: [
            {
              id: 0,
              factTitle: 'The closest ever finish',
              fact: 'The closest finish to a Formula 1 race came at Monza in 1971, with Peter Gethin crossing the line just 0.01s ahead of Ronnie Peterson. The race was the fastest ever F1 Grand Prix until the 2003 Italian Grand Prix, and all of the top five finishers were covered by just over six tenths of a second! In the last running of the race at Monza to not feature the two chicanes, slipstreaming was highly effective, with no less than 25 changes of the lead between eight drivers. It was Gethin’s only Formula 1 win.',
            },
            {
              id: 1,
              factTitle: 'It is Set Within Royal Surroundings',
              fact: "The track is set in Monza Park, part of the Royal Villa of Monza, which was commissioned by Napoleon's stepson Eugène de Beauharnais, during the French occupation of northern Italy and was completed in 1808. The park is 688 hectares and the largest walled park in Europe.",
            },
            {
              id: 2,
              factTitle: 'The Circuit of Death',
              fact: 'Because of the extremely high speeds, Monza can also be a dangerous circuit. Alberto Ascari, Wolfgang von Trips, Jochen Rindt and Ronnie Peterson were all killed following accidents at Monza, along with many grand prix drivers during the interwar years (Ascari was testing a Ferrari sportscar when he was killed, not an F1 car). Although thankfully no drivers have been killed at Monza since 1978, a marshal was killed at the 2000 race when he was struck by a loose wheel following a first-lap accident.',
            },
          ],
        },
      ]);
      return {
        tracks,
      };
    },
  };
</script>

<template>
  <div class="tracksWrapper">
    <swiper-container
      :navigation="true"
      :keyboard="true"
      :direction="horizontal"
      :mousewheel="true"
      :mousewheel-force-to-axis="true"
      centered-slides="true"
      :slides-per-view="1"
      effect="coverflow"
      coverflow-effect-rotate="5"
      coverflow-effect-scale="0.9"
      coverflow-effect-depth="50"
      :breakpoints="{
        600: {
          slidesPerView: 2,
        },
        900: {
          slidesPerView: 3,
        },
      }"
    >
      <swiper-slide v-for="track in tracks" :key="track.id">
        <TrackCard :track="track"></TrackCard>
      </swiper-slide>
    </swiper-container>
  </div>
</template>

<style scoped>
  .tracksWrapper {
    display: flex;
    justify-content: center;
    align-items: center;

    height: calc(100dvh - 50px);
    padding-inline: 0.75rem;
  }

  swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
