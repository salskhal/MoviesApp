<template>
  <div class="prime pt-12 px-8">
    <h2 class="text-white text-xl mb-5">
      Search Result for <span class="underline">{{ id }}</span>
    </h2>
    <form @submit.prevent="handleSubmit" class="mb-4">
      <input
        type="text"
        placeholder="Search for a movie"
        class="bg-slate-300 border-transparent focus:ring-2 outline-none focus:border-transparent rounded-md py-2 px-4 md:w-1/2 w-full"
        v-model="inputValue"
      />
    </form>
    <div class="flex items-center flex-wrap mb-6">
      <h3 class="text-white text-xl mr-2">Genres:</h3>
      <button
        v-for="genre in genres"
        :key="genre.id"
        class="bg-gray-800 text-white px-4 py-2 rounded-md mr-2 mb-2"
        @click="filterd(genre.id)"
      >
        {{ genre.name }}
      </button>
    </div>

    <div v-if="loader" class="flex justify-center items-center">
      <Loader />
    </div>

    <RenderCards :data="searchedMovie" title="No movie found" v-else />
  </div>
</template>
<script setup>
import { onMounted, ref } from "@vue/runtime-core";
import { useRouter, useRoute } from "vue-router";
import RenderCards from "../components/RenderCard.vue";
import Loader from "../components/Loader.vue";

const router = useRouter();

const searchedMovie = ref([]);
const loader = ref(false);
const genres = ref([]);

const inputValue = ref("");

const handleSubmit = () => {
  if (inputValue.value === "") return;
  router.push({ name: "search", params: { id: inputValue.value } });
  searchMovie(inputValue.value);
};


const searchMovie = async (value) => {
  loader.value = true;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&query=${value}&page=1&include_adult=false`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    searchedMovie.value = data.results;
    console.log(searchedMovie.value);
  } catch (error) {
    console.log(error);
  }
  loader.value = false;
};


// filter movies by genre id

const toFilter = ref([]);
const filteredMovies = searchedMovie

const filterd = (id) =>{
    // check the search result and filter if the genre id is equal to the id passed in the function while making sure the base array is intact
    toFilter.value = searchedMovie.value.filter(movie => movie.genre_ids.includes(id))
    console.log(toFilter.value)
    // assign the filtered array to the searchedMovie array
    searchedMovie.value = toFilter.value
}

// create an array of 5 genres
// const getGenres = async () => {
const getGenres = async () => {
  const response = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
  );
  const data = await response.json();
  genres.value = data.genres.slice(0, 5);
};

onMounted(() => {
  searchMovie(props.id);
  getGenres();
  
});

const props = defineProps({
  id: String,
});
</script>

<style scoped>
.prime {
  /* background: linear-gradient(270deg, #000000 -2.92%, rgba(0, 0, 0, 0) 100%); */
  background-color: #1e1e1e;
  min-height: 100vh;
}
</style>
