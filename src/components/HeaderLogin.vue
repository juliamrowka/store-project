<template>
    <div class="nav">
        <router-link to="/">Books</router-link>
        <a v-on:click="logout" href="#">Log out</a>
    </div>
</template>

<script>

export default {
    name: 'Header-page',

    // data() {
    //     return {
    //         name: '',
    //     }
    // },

    methods: {
        logout() {
            localStorage.clear()
            // this.$router.push({ name: 'Login' })
            // add refresh page
            this.$router.push({ name: 'Login' })
        },
    }
}
</script>
