<template>
    <div v-if="name===''"><Header /></div>
    <div v-if="name!==''"><HeaderLogin :name="name"/></div>
    <h1 v-if="name!==''">Hello {{ name }}, Welcome on Home Page</h1>
    <!-- <table class="books-table">
        <tr>
            <th>ID number</th>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
        </tr>
        <tr v-for="item in books" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.author }}</td>
            <td>{{ item.price }}</td>
        </tr>
    </table> -->

    <div class="offer">
        <div v-for="item in books" :key="item.id" class="book">
            <h2>{{ item.title }}</h2>
            <div>{{ item.author }}</div>
            <div>{{ item.price }} $</div>
            <button v-on:click="addToCart">Add to Cart</button>
        </div>

    </div>
</template>

<script>
import Header from './Header.vue';
import HeaderLogin from './HeaderLogin.vue';
import axios from 'axios';
export default {
    name: 'Home-page',
    data() {
        return {
            name: '',
            books: [],

        }
    },
    components: {
    Header,
    HeaderLogin
},

    methods: {
        
        async loadData() {
            let result = await axios.get("http://localhost:3000/books?published=true");
            this.books = result.data;
            let user = localStorage.getItem('user-info');
            if (user) {
                this.name = JSON.parse(user).name;
            }

            // Home page only available when user is log in
            // if (!user) {
            //     this.$router.push({ name: 'SignUp' });
            // } else {
            //     this.name = JSON.parse(user).name;
            // }
        }
    },

    async mounted() {
        this.loadData();
    }
}
</script>