<template>
    <AdminHeader />
    <h1>Hello {{ name }}, Welcome on Books Page</h1>
    <router-link to="/admin/books/add">Add New Book</router-link>
    <table class="books-table">
        <tr>
            <th>ID number</th>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
        </tr>
        <tr v-for="item in books" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.author }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.quantity }}</td>
            <td>
                <router-link :to="'/admin/books/update/' + item.id">Update</router-link>
                <button v-if="!item.published" v-on:click="publishBook(item.id)">Publish</button>
                <button v-if="item.published" v-on:click="unpublishBook(item.id)">Unpublish</button>
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
            // console.warn(result);
            if (result.status === 200) {
                this.loadData();
            }
        },

        async publishBook(id) {
            const result = await axios.patch("http://localhost:3000/books/" + id, {
                published: true,
            });
            if (result.status === 200) {
                this.loadData();
            }
            console.log(result);
        },

        async unpublishBook(id) {
            const result = await axios.patch("http://localhost:3000/books/" + id, {
                published: false,
            });
            if (result.status === 200) {
                this.loadData();
            }
            console.log(result);
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