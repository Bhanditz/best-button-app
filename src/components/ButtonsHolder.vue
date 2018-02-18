<template>
  <ul class="list-reset">
      <slot 
        name="im-the-best"
        v-for="button in buttons"
        v-bind="button">
        {{button}}
      </slot>
  </ul>
</template>

<script>
export default {
  name: "buttons-holder",
  props: ["buttons"]
};
</script>

<style>

</style>
