<template>
    <Header />
    <h1>Hello {{ name }}, Welcome on Update Book Page</h1>
    <form class="add">
        <input type="text" name="title" placeholder="Enter Title" v-model="book.title" />
        <input type="text" name="author" placeholder="Enter Author" v-model="book.author" />
        <input type="number" name="price" placeholder="Enter Price" v-model="book.price" />
        <button type="button" v-on:click="updateBook">Update book</button>
    </form>
</template>

<script>
import Header from './Header.vue'
import axios from 'axios'
export default {
    name: 'Update-page',
    components: {
        Header
    },

    data() {
        return {
            book: {
                title: '',
                author: '',
                price: ''
            },
            name: '',
        }
    },

    methods: {
        async updateBook() {
            // console.warn(this.book)
            const result = await axios.put("http://localhost:3000/books/" + this.$route.params.id, {
                title: this.book.title,
                author: this.book.author,
                price: this.book.price
            });
            if (result.status === 200) {
                this.$router.push({ name: 'AdminBooks' });
            }
        }
    },

    async mounted() {
        let user = localStorage.getItem('user-info');
        if (!user) {
            this.$router.push({ name: 'AdminLogin' });
        } else {
            this.name = JSON.parse(user).name; // fetch name of user 
            const result = await axios.get('http://localhost:3000/books/' + this.$route.params.id);
            //console.warn(this.$route.params.id);
            // console.warn('result', result.data);
            this.book = result.data; //prefill data
        }
    }
}
</script>