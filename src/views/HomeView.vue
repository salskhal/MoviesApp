<script setup>
import { onMounted, ref } from "@vue/runtime-core";
import { useRouter, useRoute } from 'vue-router'

const router = useRouter();

const inputValue = ref("");

const handleSubmit = () => {
  if (inputValue.value === "") return;
  router.push({ name: "search", params: { id: inputValue.value } });
};
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen text-center gap-8">
    <div>
      <h1 class="text-white font-medium text-3xl mb-3">Welcome to MovFlix</h1>
      <p class="text-gray-500">Here you can find the most popular movies available</p>
    </div>
    <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="Search for a movie" class="bg-slate-300 border-transparent focus:ring-2 outline-none focus:border-transparent rounded-md py-2 px-4 block w-full" v-model="inputValue"/>
      <button class="p-10 text-white border bg-none" >Search</button>
    </form>
  </div>
</template>
