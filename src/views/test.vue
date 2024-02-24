<script setup>
import JsonViewer from 'vue-json-viewer';

const jsonData = {
   "filter": {
      "age": {"end": 10, "start": 1},
      "creationTime": {"end": "2038-01-01 00:00:00", "start": "2023-01-01 00:00:00"},
      "lastUpdatedTime": {"end": "2038-01-01 00:00:00", "start": "2023-01-01 00:00:00"},
      "page": {"end": 10, "start": 0}
   }
};
</script>

<template>
   <json-viewer :value="jsonData"></json-viewer>
</template>

<style scoped>

</style>