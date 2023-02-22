import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMoviesStore = defineStore('movies', () => {
  const popularMovies = ref([])
  const topRatedMovies = ref([])
  const searchedMovies = ref([])

  return {  }
})
