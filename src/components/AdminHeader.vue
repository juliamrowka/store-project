<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark py-3">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Bookstore Admin Panel</a>
            <button class="navbar-toggler mb-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item m-2">
                        <router-link to="/admin" active-class="active" class="nav-link px-2">Home</router-link>
                    </li>
                    <li class="nav-item m-2">
                        <router-link to="/admin/books" active-class="active" class="nav-link px-2">Books</router-link>
                    </li>
                    <li class="nav-item m-2">
                        <router-link to="/admin/users" active-class="active" class="nav-link px-2">Users</router-link>
                    </li>
                    <li class="nav-item m-2">
                        <div v-on:click="logout" class="nav-link px-2">Log out</div>
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
