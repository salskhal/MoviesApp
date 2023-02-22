<template>
    <div class="flex flex-col gap-10 lg:flex-row lg:h-screen p-12 image relative">
         <div class="lg:w-2/5  h-full rounded-lg overflow-hidden">
           <img class="h-full w-full r" :src="imagePath + movieDets.poster_path" alt="Movie Poster" />
           <div
             class="p-5 bg-[#49494a] text-white absolute top-20 left-[20px] flex flex-col justify-center items-center rounded-lg gap-3"
           >
             <h3 class="font-semibold text-2xl">
               {{ dates[2] }}
             </h3>
             <div class="w-[20px] h-[2px] bg-white"></div>
             <h3>
               <!-- {{ months[movieDets.release_date.split("-")[1] - 1]  }} -->
               {{ months[dates[1] - 1] }}
               {{ dates[0] }}
             </h3>
           </div>
         </div>
         <div class="lg:w-3/5  h-full flex gap-4 flex-col mt-8 md:mt-0">
           <h1 class="uppercase text-4xl font-semibold text-white">
             {{ movieDets.title }}
           </h1>
           <div class="flex  text-[#868686]">
             <p v-for="genre in movieDets.genres" :key="genre.id" class="t text-sm">
               {{ genre.name }}
             </p>
           </div>
           <div class="text-white">
             <h2 class="text-xl font-semibold">Casts</h2>
             <div class="flex gap-2">
               <p v-for="cast in casts" :key="cast">
                 {{ cast }}
               </p>
             </div>
           </div>
           <div class="flex items-center gap-2">
             <StarRate :rate="Number(detsFromIMDB.imdbRating)" />
             <p class="text-white">{{ detsFromIMDB.imdbRating }}</p>
           </div>
           <div class="text-white mt-4">
             <h2 class="text-2xl font-bold">Movie OverView</h2>
             <p>{{ movieDets.overview }}</p>
           </div>
         </div>
       </div>
   </template>
   
   <script setup>
   import { ref } from "@vue/reactivity";
   import { computed, onMounted } from "@vue/runtime-core";
   import StarRate from "../components/StarRate.vue";
   
   const loading = ref(false);
   const movieDets = ref({});
   const detsFromIMDB = ref({});
   const casts = ref([]);
   const dates = ref([]);
   
   const imagePath = ref("https://image.tmdb.org/t/p/w500");
   
   const props = defineProps({
     id: String,
   });
   
   // store items split by comma in an array
   const splitByComma = (str) => {
     return str.split(",");
   };
   
   const splitByDash = (str) => {
     return str.split("-");
   };
   
   const months = [
     "Jan",
     "Feb",
     "Mar",
     "Apr",
     "May",
     "Jun",
     "Jul",
     "Aug",
     "Sep",
     "Oct",
     "Nov",
     "Dec",
   ];
   
   const getMovieDetail = async () => {
     loading.value = true;
   
     const getTMDB = async () => {
       const data = await fetch(
         `https://api.themoviedb.org/3/movie/${props.id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
       );
       const res = await data.json();
       movieDets.value = res;
       console.log(res.imdb_id);
     };
   
     const getIMDB = async () => {
       const data = await fetch(
         `https://www.omdbapi.com/?i=${movieDets.value.imdb_id}&apikey=93c97367`
       );
       const res = await data.json();
       detsFromIMDB.value = res;
       console.log(res);
     };
   
     await getTMDB();
     await getIMDB();
   
     casts.value = splitByComma(detsFromIMDB.value.Actors);
     dates.value = splitByDash(movieDets.value.release_date);
   
     loading.value = false;
   };
   
   onMounted(() => {
     getMovieDetail();
   });
   // getMovieDetail();
   
   // https://api.themoviedb.org/3/movie/505642?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US
   </script>
   
   <style scoped>
   
   .image {
     background: linear-gradient(270deg, #000000 -2.92%, rgba(0, 0, 0, 0) 100%);
     background-color: #1e1e1e;
   }
   
   img{
       width: 100%;
   }
   
   </style>
   