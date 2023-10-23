<template>
    <div class="nav">
        <router-link to="/">Books</router-link>
        <a v-on:click="logout" href="#">Log out</a>
        <router-link to="/cart">Shopping Cart</router-link>
        <a href="#">Hello {{ name }}!</a>
    </div>
</template>

<script>

export default {
    name: 'Header-page',
    props: {
        name: String
    },

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
