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
            <button v-if="logged" v-on:click="removeFromCart(item.id)" :disabled="item.quantity <= 0">Remove from Cart</button>
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
            userId: '',
            logged: '',
            books: [],
            cart: {
                // id: '',
                // userId: '',
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
            // console.log(result);
            // console.log(this.books);
            let user = localStorage.getItem('user-info');
            if (user) {
                this.name = JSON.parse(user).name;
                this.logged = true;
            }
        },

        async addToCart(id) {

            let user = localStorage.getItem('user-info');
            if (user) {
                this.userId = JSON.parse(user).id;
                let result = await axios.get(`http://localhost:3000/users?id=${this.userId}`);
                if (result.data[0].books) {
                    this.cart.booksId = result.data[0].books;
                } else {
                    this.cart.booksId = [];
                }
                this.cart.booksId.push(id);
                await axios.patch("http://localhost:3000/users/" + this.userId, {
                    books: this.cart.booksId
                });
            }
        },

        async removeFromCart(id) {
            let user = localStorage.getItem('user-info');
            if (user) {
                this.userId = JSON.parse(user).id;
                let result = await axios.get(`http://localhost:3000/users?id=${this.userId}`);
                // console.log(result);
                if (result.data[0].books) {
                    this.cart.booksId = result.data[0].books;
                    let index = this.cart.booksId.indexOf(id);
                    // console.log(index);
                    this.cart.booksId.splice(index, 1);
                    // console.log(this.cart.booksId);
                    await axios.patch("http://localhost:3000/users/" + this.userId, {
                        books: this.cart.booksId
                    });
                } else {
                    alert("Your cart is empty");
                    // or sth like this
                }
            }
        }
    },

    async mounted() {
        this.loadData();
    }
}
</script>