<template>
  <div id="app" class="flex flex-col h-screen justify-between">
    <header class="bg-pink-light text-white p-6">
      <h2>{{currentMessage}}</h2>
    </header>
    <buttons-holder 
      class="flex md:flex-row flex-col flex-1" 
      :buttons="bestButtons">
      <li 
        slot="im-the-best" slot-scope="{count, name, id, isBest}"
        :class="`list-reset flex-1 p-3 md:p-6 bg-${name}-light flex flex-row md:flex-col justify-around items-center`">
          <h3 :class="`text-white self-center ${isBest ? 'visible' : 'invisible'}`">This is the best button</h3>
          <button 
            :class="`bg-transparent hover:bg-white text-white font-semibold hover:text-${name}-dark py-2 px-4 border border-white hover:border-transparent rounded-full h-16 w-16 md:h-32 md:w-32 flex items-center justify-center`"
            @click="addCount(id)">
            {{count}}
          </button>
      </li>
    </buttons-holder>
    <footer class="bg-pink-light text-white p-6">
      <h2>There are {{total}} votes</h2>
      </footer>
  </div>
</template>

<script>
import "tailwindcss/dist/tailwind.css";
import HelloWorld from "./components/HelloWorld.vue";
import Layout from "./components/Layout";
import Settings from "./components/Settings";
import ButtonsHolder from "./components/ButtonsHolder";

export default {
  name: "app",
  components: {
    "buttons-holder": ButtonsHolder
  },
  data() {
    return {
      bestIndex: 0,
      buttons: [
        { count: 0, name: "blue" },
        { count: 0, name: "red" },
        { count: 0, name: "purple" },
        { count: 0, name: "orange" }
      ],
      messages: [
        "No wait...",
        "Actually, you know what...",
        "What I meant to say was..."
      ]
    };
  },
  computed: {
    bestButtons() {
      return this.buttons.map((b, i) => ({
        ...b,
        isBest: i === this.bestIndex,
        id: i
      }));
    },
    total() {
      return this.buttons.reduce((acc, curr) => acc + curr.count, 0);
    },
    currentMessage() {
      return this.messages[this.total % this.messages.length];
    }
  },
  methods: {
    addCount(id) {
      this.buttons[id].count++;
      this.bestIndex = id;
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
