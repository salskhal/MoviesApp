<template>
  <div>
    <div
      v-if="data.length > 0"
      class="grid lg:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-3"
    >
      <router-link
        :to="{ name: 'Detailed', params: { id: post.id } }"
        v-for="post in data"
        :key="post.id"
        class="rounded-xl group relative shadow-card hover:shadow-cardhover card cursor-pointer"
        :id="post.id"
      >
        <img
          :src="imagePath + post.poster_path"
          :alt="post.title"
          class="w-full h-auto object-cover rounded-xl"
        />
        <div
          class="group-hover:flex flex-col hidden absolute bottom-0 left-0 right-0 bg-[#10131f] m-2 p-4 rounded-md"
        >
          <p
            class="text-white text-base md:text-xl font-medium overflow-y-auto"
          >
            {{ post.title }}
          </p>
          <div class="mt-5 flex justify-between items-center gap-2">
            <div class="flex items-center gap-2">
              <p class="text-white text-xs md:text-sm">
                {{
                  post.overview.length > 20
                    ? post.overview.substring(0, 50) + "....."
                    : post.overview
                }}
              </p>
            </div>
          </div>
        </div>
      </router-link>
    </div>
    <h2 v-else class="mt-5 font-bold text-[#6469ff] text-xl uppercase">
      {{ title }}
    </h2>
  </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";


defineProps({
  title: String,
  data: Array,
});

const imagePath = ref("https://image.tmdb.org/t/p/w500");
</script>

<style></style>
