<template>
  <div class="lg:p-20 p-10">
    <h1 class="text-white font-semibold text-xl mb-5">Popular Movies</h1>
    <RenderCards :data="movies" />
  </div>
</template>
<script setup>
import { onMounted, ref } from "@vue/runtime-core";
import RenderCards from "../components/RenderCard.vue";
const movies = ref([]);

const getPopular = async () => {
  const data = await fetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=1"
  );

  const res = await data.json();
  // let popular.value = first 5 movies
  movies.value = res.results;
  // console.log(popular.value);
};

onMounted(getPopular);
</script>
<style scoped></style>
