<template>
    <Header />
    <h1>Hello {{ name }}, Welcome on Home Page</h1>
    <table border="1">
        <tr>
            <th>ID number</th>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>Actions</th>
        </tr>
        <tr v-for="item in books" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.author }}</td>
            <td>{{ item.price }}</td>
            <td>
                <router-link :to="'/update/' + item.id">Update</router-link>
                <img v-on:click="deleteBook(item.id)" src="../assets/delete.png" class="icon" alt="" title="Delete">
            </td>
        </tr>
    </table>
</template>

<script>
import Header from './Header.vue';
import axios from 'axios';
export default {
    name: 'Home-page',
    data() {
        return {
            name: '',
            books: []
        }
    },
    components: {
        Header
    },

    methods: {
        async deleteBook(id) {
            let result = await axios.delete("http://localhost:3000/books/" + id);
            console.warn(result);
            if (result.status === 200) {
                this.loadData();
            }
        },

        async loadData() {
            let user = localStorage.getItem('user-info');

            // Home page only available when user is log in
            if (!user) {
                this.$router.push({ name: 'SignUp' });
            } else {
                this.name = JSON.parse(user).name;
            }
            let result = await axios.get("http://localhost:3000/books");
            //console.warn(result);
            this.books = result.data;
        }
    },

    async mounted() {
        this.loadData();
    }
}
</script>