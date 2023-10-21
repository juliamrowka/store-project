<template>
    <div class="nav">
        <router-link to="/">Books</router-link>
        <router-link to="/sign-up">Sign Up</router-link>
        <router-link to="/login">Login</router-link>
        <!--<router-link to="/update">Update Book</router-link>-->
        <!-- <a v-on:click="logout" href="#">Log out</a> -->
    </div>
</template>

<script>
//import router from '@/routers'

export default {
    name: 'Header-page',

    // data() {
    //     return {
    //         name: '',
    //     }
    // },

    methods: {
        // logout() {
        //     localStorage.clear()
        //     // this.$router.push({ name: 'Login' })
        //     // add refresh page
        // },
    },

    //    components: { router }
}
</script>
