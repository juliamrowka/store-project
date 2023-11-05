<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Bookstore</a>
            <button class="navbar-toggler mb-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item m-2">
                        <router-link to="/" active-class="active" class="nav-link px-2">Books</router-link>
                    </li>
                    <li class="nav-item m-2">
                        <router-link to="/cart" active-class="active" class="nav-link position-relative px-2">Shopping Cart
                            <span v-if="this.cartQuantity > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                <div>{{ this.cartQuantity }}</div>
                                <span class="visually-hidden">books in carts</span>
                            </span>
                        </router-link>
                    </li>
                    <li class="nav-item m-2">
                        <div v-on:click="logout" class="nav-link px-2">Log out</div>
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
import axios from 'axios';
export default {
    name: 'Header-page',

    data() {
        return {
            userId: '',
            cartQuantity: ''
        }
    },

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
    },

    async mounted() {
        let user = localStorage.getItem('user-info');
        if (user) {
            this.userId = JSON.parse(user).id;
            let result = await axios.get(`http://localhost:3000/users?id=${this.userId}`);
            if (result.data[0].books) {
                this.cartQuantity = result.data[0].books.length;
            } else {
                this.cartQuantity = 0;
            }
            
            // console.log(this.cartQuantity);
        }
    }
}
</script>
