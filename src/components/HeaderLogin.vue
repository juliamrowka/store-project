<template>
    <div class="nav">
        <router-link to="/">Books</router-link>
        <a v-on:click="logout" href="#">Log out</a>
        <a href="#">Hello {{ name }}!</a>
        <!-- <router-link to="/cart">Shopping Cart</router-link> -->
    </div>
</template>

<script>

export default {
    name: 'Header-page',
    props: {
        name: String
    },

    methods: {
        logout() {
            localStorage.clear()
            // add refresh page
            this.$router.push({ name: 'Login' })
        },
    }
}
</script>
