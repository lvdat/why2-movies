<template>
    <div>
        <h1>Phim Mới Cập Nhật</h1>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MovieCard
                v-for="movie in movies"
                :key="movie._id"
                :movie="movie"
            />
        </div>
    </div>
</template>

<script setup>
import { getNewMovies } from '~/utils/api'
import MovieCard from '~/components/MovieCard.vue'

const { items: movies } = await getNewMovies(1)
</script>
