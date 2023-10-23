<template>
    <Header />
    <h1>Hello {{ name }}, Welcome on Add Book Page</h1>
    <form class="add">
        <input type="text" name="title" placeholder="Enter Title" v-model="book.title" />
        <input type="text" name="author" placeholder="Enter Author" v-model="book.author" />
        <input type="number" name="price" placeholder="Enter Price" v-model="book.price" />
        <input type="number" name="quantity" placeholder="Enter Quantity" v-model="book.quantity" />
        <button type="button" v-on:click="addBook">Add new book</button>
    </form>
</template>

<script>
import Header from './Header.vue';
import axios from 'axios';
export default {
    name: 'Add-page',
    components: {
        Header
    },

    data() {
        return {
            book: {
                title: '',
                author: '',
                price: '',
                quantity: '',
                published: ''
            },
            name:'',

        }
    },

    methods: {
        async addBook() {
            // console.warn(this.book);
            const result = await axios.post("http://localhost:3000/books", {
                title: this.book.title,
                author: this.book.author,
                price: this.book.price,
                quantity: this.book.quantity,
                published: false
            });
            if (result.status === 201) {
                this.$router.push({ name: 'AdminBooks' });
            }
            // console.warn("result", result);
        }
    },

    mounted() {
        let user = localStorage.getItem('user-info');
        // Home page only available when user is log in
        if (!user) {
            this.$router.push({ name: 'AdminLogin' });
        } else {
            this.name = JSON.parse(user).name; // fetch name of user 
        }
    }
}
</script>