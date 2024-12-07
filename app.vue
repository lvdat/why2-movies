<script setup>
const { loggedIn, user, fetch, clear } = useUserSession()
const credentials = reactive({
    email: '',
    password: ''
})
async function login() {
    $fetch('/api/login', {
        method: 'POST',
        body: credentials
    })
        .then(fetch)
        .catch(() => alert('Bad credentials'))
}
</script>

<template>
    <div v-if="loggedIn">
        <h1>Welcome {{ user.name }}</h1>
        <button @click="clear">Logout</button>
    </div>
    <form @submit.prevent="login" v-else>
        <input v-model="credentials.email" type="email" placeholder="Email" />
        <input
            v-model="credentials.password"
            type="password"
            placeholder="Password"
        />
        <button type="submit">Login</button>
    </form>
</template>
