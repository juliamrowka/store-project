<template>
    <div class="nav">
        <router-link to="/admin/books">Books</router-link>
        <router-link to="/admin/users">Users</router-link>
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
            this.$router.push({ name: 'AdminLogin' })
        }
    },
//    components: { router }
}
</script>
