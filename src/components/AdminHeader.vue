<template>
    <nav class="navbar navbar-expand-lg  navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Bookstore Admin Panel</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item mx-2">
                        <router-link to="/admin" active-class="active" class="nav-link">Home</router-link>
                    </li>
                    <li class="nav-item mx-2">
                        <router-link to="/admin/books" active-class="active" class="nav-link">Books</router-link>
                    </li>
                    <li class="nav-item mx-2">
                        <router-link to="/admin/users" active-class="active" class="nav-link">Users</router-link>
                    </li>
                    <li class="nav-item mx-2">
                        <a v-on:click="logout" href="#" class="nav-link">Log out</a>
                    </li>
                </ul>
                <span class="navbar-text">
                    Hello Admin!
                </span>
            </div>
        </div>
    </nav>
</template>

<script>

export default {
    name: 'AdminHeader',
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push({ name: 'AdminLogin' });
        }
    },
}
</script>
