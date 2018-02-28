<template>
  <div id="app" class="flex flex-col h-screen justify-between">
    <header class="bg-green-dark text-white p-6">
      <h2>Let the games begin...</h2>
    </header>
    <buttons-holder 
      class="flex md:flex-row flex-col flex-1" 
      :buttons="bestButtons">
      <li 
        slot="im-the-best" slot-scope="{value, key, id, isBest}"
        :class="`list-reset flex-1 p-3 md:p-6 bg-${key}-light flex flex-row md:flex-col justify-around items-center`">
          <h3 :class="`text-white self-center ${isBest ? 'visible' : 'invisible'}`">This is the best button</h3>
          <button 
            :class="`bg-transparent hover:bg-white text-white font-semibold hover:text-${key}-dark py-2 px-4 border border-white hover:border-transparent rounded-full h-16 w-16 md:h-32 md:w-32 flex items-center justify-center`"
            @click="addCount({id, key})">
            {{value}}
          </button>
      </li>
    </buttons-holder>
    <footer class="bg-green-dark text-white p-6">
      <h2>There are {{total}} votes</h2>
      </footer>
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
    }
  },
  data() {
    return {
      messages: [
        "No wait...",
        "Actually, you know what...",
        "What I meant to say was..."
      ]
    };
  },
  computed: {
    maxCount() {
      return Math.max(...this.buttons.map(d => d[".value"]));
    },
    bestButtons() {
      return this.buttons.map((b, i) => ({
        key: b[".key"],
        value: +b[".value"],
        isBest: b[".value"] >= this.maxCount,
        id: i
      }));
    },
    total() {
      return this.bestButtons.reduce((acc, curr) => acc + curr.value, 0);
    },
    currentMessage() {
      return this.messages[this.total % this.messages.length];
    }
  },
  methods: {
    addCount({ id, key }) {
      const value = +this.bestButtons[id].value + 1;
      console.log(value);
      this.$firebaseRefs.buttons.child(key).set(value);
      // this.$firebaseRefs.buttons.child(key);
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
