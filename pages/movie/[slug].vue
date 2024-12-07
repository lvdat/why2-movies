<template>
    <div>
      <h1>{{ movie.name }}</h1>
      <img :src="movie.poster_url" alt="Poster" />
      <p>{{ movie.origin_name }}</p>
      <p>Năm: {{ movie.year }}</p>
    </div>
  </template>
  
  <script setup>
  import { getMovieBySlug } from '~/utils/api'
  
  const route = useRoute()
  const { slug } = route.params
  const movie = await getMovieBySlug(slug)
  </script>
  