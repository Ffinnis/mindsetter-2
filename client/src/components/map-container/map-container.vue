<template>
  <canvas ref="canvas" width="1920" height="1080"> </canvas>
</template>

<script setup lang="ts">
import start from "./service/";
const canvas = ref();

onMounted(() => {
  start(canvas.value);
});
</script>
