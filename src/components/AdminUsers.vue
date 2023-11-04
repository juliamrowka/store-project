<template>
    <AdminHeader />

    <div class="container table-responsive">
        <!-- <div class="d-grid my-4">
            <button v-on:click="addNewBook()" class="btn btn-outline-primary">Add new book</button>
        </div> -->
        <table class="table table-hover border-0 align-middle border-secondary-subtle">
            <thead>
                <tr>
                    <th scope="col">ID number</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                <tr v-for="item in users" :key="item.id">
                    <td class="text-start">{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.role }}</td>
                    <td>
                        <div class="btn-group w-50">
                            <button v-if="!item.blocked" v-on:click="blockUser(item.id)"
                                class="btn btn-outline-success btn-sm">Block</button>
                            <button v-if="item.blocked" v-on:click="unblockUser(item.id)"
                                class="btn btn-outline-secondary btn-sm">Unblock</button>
                            <button v-on:click="deleteUser(item.id)" class="btn btn-outline-danger btn-sm">Delete</button>
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
export default {
    name: 'AdminUsers',

    data() {
        return {
            users: [],
            // cart: {
            //     userId: '',
            //     id: ''
            // }
        };
    },

    components: { AdminHeader },

    methods: {
        async deleteUser(id) {

            let result = await axios.delete("http://localhost:3000/users/" + id);
            // console.warn(result);
            if (result.status === 200) {
                this.loadData();
            }
        },

        async blockUser(id) {
            const result = await axios.patch("http://localhost:3000/users/" + id, {
                blocked: true,
            });
            if (result.status === 200) {
                this.loadData();
            }
            // console.log(result);
        },

        async unblockUser(id) {
            const result = await axios.patch("http://localhost:3000/users/" + id, {
                blocked: false,
            });
            if (result.status === 200) {
                this.loadData();
            }
            // console.log(result);
        },

        async loadData() {
            let role = localStorage.getItem('role');
            if (role !== 'admin') {
                this.$router.push({ name: 'AdminLogin' });
            }
            else {
                let result = await axios.get("http://localhost:3000/users");
                this.users = result.data;
                this.blocked = result.data[0].blocked;
                // console.log(result.data)
            }
        }
    },

    async mounted() {
        this.loadData();
    }
}

</script>