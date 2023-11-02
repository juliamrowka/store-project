<template>
    <nav class="navbar navbar-expand-lg  navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Bookstore</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link active" aria-current="page">Books</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/sign-up" class="nav-link">Sign Up</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/login" class="nav-link">Log In</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
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
