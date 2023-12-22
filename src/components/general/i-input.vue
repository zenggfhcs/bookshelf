<script setup>

</script>

<template>
   <input type="text" name="" id="">
</template>

<style scoped>
* {
   --border-color: white;
   --bg-color: grey;
   --color: black;
}

input[type="text"] {
   width: 10em;
   font-size: 1.2rem;
   padding: .3em;
   border-radius: .3em;
   border: 0;
   margin: calc(.1em + 2px);
   outline: 2px solid var(--border-color);
   color: var(--color);
   background-color: var(--bg-color);
   //caret-color: blueviolet;
}

input[type="text"]:focus {
   border: 0;
   --border-color: grey;
   --bg-color: white;
   --color: black;
}
</style>