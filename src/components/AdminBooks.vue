<template>
    <AdminHeader />
    <h1>Hello {{ name }}, Welcome on Books Page</h1>
    <router-link to="/add">Add New Book</router-link>
    <table class="books-table">
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
import axios from 'axios';
import AdminHeader from './AdminHeader.vue';
// import router from '@/routers';
export default {
    name: 'AdminBooks',

    data() {
        return {
            name: '',
            books: []
        };
    },

    components: { AdminHeader },

    methods: {
        async deleteBook(id) {
            let result = await axios.delete("http://localhost:3000/books/" + id);
            console.warn(result);
            if (result.status === 200) {
                this.loadData();
            }
        },

        async loadData() {
            let role = localStorage.getItem('role');
            let user = localStorage.getItem('user-info');
            if (role !== 'admin') {
                this.$router.push({ name: 'AdminLogin' });
            }
            else {
                this.name = JSON.parse(user).name;
                let result = await axios.get("http://localhost:3000/books");
                //console.warn(result);
                this.books = result.data;
            }
        }
    },

    async mounted() {
        this.loadData();
    }
}
</script>