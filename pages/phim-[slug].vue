<template>
    <div class="container mx-auto p-4">
        <div v-if="movie" class="movie-details flex flex-col lg:flex-row gap-4">
            <!-- Poster -->
            <div class="poster w-full lg:w-1/3">
                <img
                    :src="movie.poster_url || '/placeholder.jpg'"
                    :alt="movie.name || 'Movie poster'"
                    class="rounded-lg shadow-md"
                />
            </div>

            <!-- Movie Info -->
            <div class="info w-full lg:w-2/3">
                <h1 class="text-3xl font-bold mb-2">
                    {{ movie.name || 'Tên phim chưa có' }}
                </h1>
                <p class="italic text-gray-600 mb-4">
                    {{ movie.origin_name || 'Đang cập nhật' }}
                </p>
                <p class="text-gray-800">
                    {{ movie.content || 'Mô tả chưa có' }}
                </p>
                <ul class="mt-4 space-y-2">
                    <li>
                        <strong>Thể loại:</strong>
                        {{
                            movie.category?.map((c) => c.name).join(', ') ||
                            'Đang cập nhật'
                        }}
                    </li>
                    <li>
                        <strong>Quốc gia:</strong>
                        {{
                            movie.country?.map((c) => c.name).join(', ') ||
                            'Đang cập nhật'
                        }}
                    </li>
                    <li>
                        <strong>Trạng thái:</strong>
                        {{ movie.status || 'Đang cập nhật' }}
                    </li>
                    <li>
                        <strong>Năm:</strong>
                        {{ movie.year || 'Đang cập nhật' }}
                    </li>
                    <li>
                        <strong>Diễn viên:</strong>
                        {{ movie.actor?.join(', ') || 'Đang cập nhật' }}
                    </li>
                    <li>
                        <strong>Đạo diễn:</strong>
                        {{ movie.director?.join(', ') || 'Đang cập nhật' }}
                    </li>
                </ul>
            </div>
        </div>

        <!-- Episodes List -->
        <div v-if="episodes.length > 0" class="episodes mt-8">
            <h2 class="text-2xl font-bold mb-4">Danh sách tập</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div
                    v-for="episode in episodes"
                    :key="episode.slug"
                    class="episode-card bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg"
                >
                    <nuxt-link
                        :to="`/xem-phim-${movie.slug}-tap-${episode.slug}`"
                    >
                        <p class="text-lg text-red-600 text-center font-medium">
                            {{ episode.name || 'Tên tập chưa có' }}
                        </p>
                    </nuxt-link>
                </div>
            </div>
        </div>

        <!-- Fallback Message -->
        <div v-else class="text-center mt-8">
            <p class="text-gray-600">
                Thông tin phim hoặc danh sách tập đang được cập nhật.
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from '#app'
import { getMovieBySlug } from '~/utils/api'

const movie = ref(null) // Use null for initial state
const episodes = ref([]) // Initialize episodes

const fetchMovie = async (slug) => {
    try {
        const data = await getMovieBySlug(slug)
        movie.value = data.movie || {}
        episodes.value = data?.episodes[0].server_data || []
        console.log(movie)
    } catch (error) {
        console.error('Error fetching movie:', error)
        movie.value = {}
        episodes.value = []
    }
}

onMounted(() => {
    const route = useRoute()
    console.log(route.params)
    const slug = route.params.slug
    if (slug) {
        fetchMovie(slug)
    }
})
</script>

<style scoped>
.container {
    max-width: 1200px;
}
</style>
