<template>
  <div id="app" class="flex flex-col h-screen justify-between">
    <header class="bg-white text-dark text-2xl font-bold p-8 m-2 text-center">
      May the best button win
    </header>
    <buttons-holder 
      class="flex justify-around md:flex-row flex-col flex-1" 
      :buttons="bestButtons">
      <li 
        slot="im-the-best" 
        slot-scope="{value, key, id, isBest}"
        :class="`list-reset bg-${key}-light flex-1 flex
                flex-row justify-between items-center
                md:flex-col md:p-3 md:justify-around`">
          <h3 :class="`text-white text-left ${isBest ? 'visible' : 'invisible'} self-center
                      p-1 w-1/3
                      md:w-auto md:text-center`">
            This is the best button
          </h3>
          <button 
            :class="`bg-transparent hover:bg-white text-white font-semibold hover:text-${key}-dark py-2 px-4 border border-white hover:border-transparent rounded-full h-16 w-16 md:h-32 md:w-32 flex items-center justify-center`"
            @click="updateButtons({id, key})">
            {{value}}
          </button>
          <div :class="`self-center
                        w-1/3 p-1 
                        md:w-auto md:p-2 `">
            <div :class="`text-white text-right md:text-center ${key === old['.value'] ? 'visible' : 'invisible'}`">
              <h4>This used to be the best button</h4>
            </div>
          </div>
      </li>
    </buttons-holder>
  </div>
</template>

<script>
import "tailwindcss/dist/tailwind.css";
import { db } from "../firebase";
import HelloWorld from "./components/HelloWorld.vue";
import Layout from "./components/Layout";
import Settings from "./components/Settings";
import ButtonsHolder from "./components/ButtonsHolder";

export default {
  name: "app",
  components: {
    "buttons-holder": ButtonsHolder
  },
  firebase: {
    buttons: {
      source: db.ref("buttons"),
      cancelCallback(err) {
        console.error(err);
      }
    },
    best: { source: db.ref("best"), asObject: true },
    old: { source: db.ref("old"), asObject: true },
    paused: { source: db.ref("paused"), asObject: true }
  },
  computed: {
    maxCount() {
      return Math.max(...this.buttons.map(d => d[".value"]));
    },
    bestButtons() {
      return this.buttons.map((b, i) => ({
        key: b[".key"],
        value: +b[".value"],
        isBest: b[".key"] === this.best[".value"],
        id: i
      }));
    },
    total() {
      return this.bestButtons.reduce((acc, curr) => acc + curr.value, 0);
    }
  },
  methods: {
    updateButtons({ id, key }) {
      const newValue = this.bestButtons[id].value + 1;
      // add +1 to the button
      this.$firebaseRefs.buttons.child(key).set(newValue);
      // change the best button
      this.$firebaseRefs.best.set(key);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
