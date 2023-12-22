<script setup>
class Type {
  default = "default";

}
const props = defineProps({
  type: {
    default: "default",
    type: String
  },
  wide: {
    default: "",
    type: String
  },
  value: {
    default: "",
    type: String
  }
});
</script>

<template>
  <input :class="props.type + ' ' + props.wide" type="button" :value="props.value">
</template>

<style scoped>
template {
  --bg-color: white;
  --font-color: black;
  --border-color: black;
}

input[type="button"] {
  font-size: 1.2rem;
  padding: .2em .5em;
  border-radius: .2em;
  margin: .1em;
  background-color: var(--bg-color);
  border: 2px solid var(--border-color);
  color: var(--font-color);
  transition: .3s;
  cursor: pointer;
  text-align: center;
}

input[type="button"]:active {
  transform: scale(.9);
}

/* ======= type define ======= */
input { /* default */
  --font-color: black;
  --bg-color: white;
  --border-color: black;
}

input.info {
}

input.success {
  --font-color: white;
  --bg-color: green;
  --border-color: green;
}

input.error {
  --font-color: white;
  --bg-color: red;
  --border-color: red;
}

input.worn {
  --font-color: white;
  --bg-color: #FFD300FF;
  --border-color: #FFD300FF;
}

/* ======= type define ======= */

/* ======= size define ======= */
input.wide {
  padding: .2em 2em;
}

input.min {
  max-width: min-content;
  padding: .1em;
}

/* ======= size define ======= */

</style>