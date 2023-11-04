<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Bookstore</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link">Books</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/cart" class="nav-link">Shopping Cart</router-link>
                    </li>
                    <li class="nav-item">
                        <a v-on:click="logout" href="#" class="nav-link">Log out</a>
                    </li>
                </ul>
                <span class="navbar-text">
                    Hello {{ name }}!
                </span>
            </div>
        </div>
    </nav>
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
            
            // console.log(this.$router.currentRoute._value.name);
            // console.log(typeof(this.$router.currentRoute._value.name));
            // console.log(this.$router.currentRoute._value.name === 'Home');

            if (this.$router.currentRoute._value.name === 'Home') {
                this.$router.go();
            } else {
                this.$router.push({ name: 'Home' })
            }
        },
    }
}
</script>
