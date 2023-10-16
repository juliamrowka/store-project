<template>
    <div class="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/add">Add Book</router-link>
        <!--<router-link to="/update">Update Book</router-link>-->
        <a v-on:click="logout" href="#">Log out</a>
    </div>
</template>

<script>
//import router from '@/routers'

export default {
    name: 'Header-page',
    methods: {
        logout() {
            localStorage.clear()
            this.$router.push({ name: 'Login' })
        }
    },
//    components: { router }
}
</script>
