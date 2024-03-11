<template>
   <n-modal-provider>
      <n-dialog-provider>
         <n-message-provider>
            <router-view/>
         </n-message-provider>
      </n-dialog-provider>
   </n-modal-provider>
</template>

<script setup>
import {NDialogProvider, NMessageProvider, NModalProvider} from "naive-ui";
import {onBeforeMount} from "vue";

onBeforeMount(() => {
   document.documentElement.style.fontSize = '16px';
})
</script>

<style scoped>
</style>
