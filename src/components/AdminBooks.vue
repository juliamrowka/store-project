<template>
    <AdminHeader />
    <div class="container-sm my-4">
        <div class="d-grid mb-4">
            <button v-on:click="addNewBook()" class="btn btn-outline-primary">Add new book</button>
        </div>
       <div class="table-responsive">
            <table class="table table table-hover border-0 align-middle border-secondary-subtle">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Author</th>
                        <th scope="col">Price</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    <tr v-for="item in books" :key="item.id">
                        <td class="text-start fw-semibold">{{ item.id }}</td>
                        <td>{{ item.title }}</td>
                        <td>{{ item.author }}</td>
                        <td>{{ item.price }}</td>
                        <td>
                            <span v-if="item.quantity <= 10" class="text-danger">{{ item.quantity }}</span>
                            <span v-if="item.quantity <= 50 && item.quantity > 10" class="text-warning">{{ item.quantity
                            }}</span>
                            <span v-if="item.quantity > 50">{{ item.quantity }}</span>
                        </td>
                        <td>
                            <div class="d-flex gap-2 justify-content-md-between">
                                <button v-on:click="update(item.id)" class="btn btn-outline-primary btn-sm flex-fill">Update</button>
                                <button v-if="!item.published" v-on:click="publishBook(item.id)"
                                    class="btn btn-success btn-sm flex-fill">Publish</button>
                                <button v-if="item.published" v-on:click="unpublishBook(item.id)"
                                    class="btn btn-outline-secondary btn-sm flex-fill">Unpublish</button>
                                <button v-on:click="deleteBook(item.id)" class="btn btn-outline-danger btn-sm flex-fill">Delete</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
       </div>
    </div>
</template>

<script>
import axios from 'axios';
import AdminHeader from './AdminHeader.vue';
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