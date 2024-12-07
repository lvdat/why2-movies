export const getNewMovies = async (page = 1) => {
    const config = useRuntimeConfig()
    const apiBase = config.public.apiBase
    return await $fetch(`${apiBase}/danh-sach/phim-moi-cap-nhat?page=${page}`)
}

export const w = async (slug: string | string[]) => {
    const config = useRuntimeConfig()
    const apiBase = config.public.apiBase
    return await $fetch(`${apiBase}/phim/${slug}`)
}

export const searchMovies = async (keyword: string, limit = 10) => {
    const apiBase = useRuntimeConfig().public.apiBase
    const response = await $fetch(`${apiBase}/v1/api/tim-kiem`, {
        params: { keyword, limit }
    })
    return response?.data?.items || []
}

export const getCategoryMovies = async (category: string) => {
    const config = useRuntimeConfig()
    const apiBase = config.public.apiBase
    return await $fetch(`${apiBase}/v1/api/danh-sach/${category}`)
}
