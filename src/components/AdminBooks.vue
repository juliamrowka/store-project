<template>
    <AdminHeader />
    <h1>Books</h1>
    <router-link to="/add">Add New Book</router-link>
    <table>
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
            books: []
        };
    },
    async mounted() {
        let result = await axios.get("http://localhost:3000/books");
        this.books = result.data;
    },
    components: { AdminHeader }
}
</script>