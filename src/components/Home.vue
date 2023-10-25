<template>
    <div v-if="name === ''">
        <Header />
    </div>
    <div v-if="name !== ''">
        <HeaderLogin :name="name" />
    </div>
    <h1 v-if="name !== ''">Hello {{ name }}, Welcome on Home Page</h1>
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
            <button v-if="logged" v-on:click="addToCart(item.id)" :disabled="item.quantity <= 0">Add to Cart</button>
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
            logged: '',
            cart: {
                id: '',
                userId: '',
                booksId: []
            }
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
            console.log(result);
            let user = localStorage.getItem('user-info');
            if (user) {
                this.name = JSON.parse(user).name;
                this.logged = true;
                // user id in cart = id of user who is loged in
                this.cart.userId = JSON.parse(user).id;
                console.log(this.userId);
                console.log(typeof (this.userId));
            }
            // Home page only available when user is log in
            // if (!user) {
            //     this.$router.push({ name: 'SignUp' });
            // } else {
            //     this.name = JSON.parse(user).name;
            // }
        },

        async addToCart(id) {
            //show content of cart depending on which user is loged in
            let resultUser = await axios.get(`http://localhost:3000/cart?userId=${this.cart.userId}`);
            console.log(resultUser);
            this.cart.id = resultUser.data[0].id;
            this.cart.booksId = resultUser.data[0].booksId;
            //push selected book to the cart
            this.cart.booksId.push(id);
            let result = await axios.patch("http://localhost:3000/cart/" + this.cart.id, {
                booksId: this.cart.booksId
            });
            // console.log(this.books.id);
            console.log(this.userId);
            console.log(result);
            
        }
    },

    async mounted() {
        this.loadData();
    }
}
</script>