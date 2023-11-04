<template>
    <AdminHeader />
    <div class="container table-responsive">
        <div class="d-grid my-4">
            <button v-on:click="addNewBook()" class="btn btn-outline-primary">Add new book</button>
        </div>
        <table class="table table-hover border-0 align-middle border-secondary-subtle">
            <thead>
                <tr>
                    <th scope="col">ID number</th>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="item in books" :key="item.id">
                    <td class="text-start">{{ item.id }}</td>
                    <td>{{ item.title }}</td>
                    <td>{{ item.author }}</td>
                    <td>{{ item.price }} $</td>
                    <td>
                        <span v-if="item.quantity <= 10" class="text-danger">{{ item.quantity }}</span>
                        <span v-if="item.quantity <= 50 && item.quantity > 10" class="text-warning">{{ item.quantity
                        }}</span>
                        <span v-if="item.quantity > 50">{{ item.quantity }}</span>
                    </td>
                    <td>
                        <div class="btn-group">
                            <button v-on:click="update(item.id)" class="btn btn-outline-primary btn-sm">Update</button>
                            <button v-if="!item.published" v-on:click="publishBook(item.id)"
                                class="btn btn-outline-success btn-sm">Publish</button>
                            <button v-if="item.published" v-on:click="unpublishBook(item.id)"
                                class="btn btn-outline-secondary btn-sm">Unpublish</button>
                            <button v-on:click="deleteBook(item.id)" class="btn btn-outline-danger btn-sm">Delete</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
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
        },

        update(id) {
            this.$router.push('/admin/books/update/' + id);
        },

        addNewBook() {
            this.$router.push({ name: 'Add' });
        }
    },

    async mounted() {
        this.loadData();
    }
}
</script>