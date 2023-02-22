<script setup></script>
<template>
  <nav class=" flex justify-between items-center p-5 text-white border-b border-slate-600">
    <div class="uppercase">
      <router-link to="/" class="text-xl font-bold">Movflix</router-link>
    </div>
    <div>
      <router-link to="/popular" class="mr-5 hover:test-gray-600">Popular</router-link>
      <router-link to="/top-rated" class="mr-5 hover:test-gray-600">Top Rated</router-link>
    </div>
  </nav>
</template>

<style scoped></style>
