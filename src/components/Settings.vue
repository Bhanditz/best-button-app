<template>
  <div>
      <slot :header="header" :footer="footer" :styles="styles"></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      header: "Oh wait...",
      footer: "There is no best button",
      styles: {
        header: "bg-pink-light text-white p-6",
        content: "flex flex-row flex-1"
      }
    };
  }
};
</script>

<style>

</style>
