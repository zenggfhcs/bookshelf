<template>
   <n-message-provider>
      <router-view/>
   </n-message-provider>
</template>

<script setup>
import {NMessageProvider} from "naive-ui";
import {onMounted} from "vue";

onMounted(() => {
   document.documentElement.style.fontSize = '16px';
})
</script>

<style scoped>
</style>
