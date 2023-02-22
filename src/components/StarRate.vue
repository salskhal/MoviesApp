<template>
    <div class="flex">
      <button
        v-for="star in 5"
        :key="star"
        :class="{
          'text-gray-400': star > Math.round(rate / 2),
          'text-yellow-400': star <= Math.round(rate / 2),
        }"
        class="text-3xl focus:outline-none"
      >
        &#9733;
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref } from "@vue/reactivity";
  import { onMounted } from "@vue/runtime-core";
  
  defineProps({
    rate: Number,
  });
  </script>
  
  <style></style>
  