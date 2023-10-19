<template>
    <AdminHeader />
    <h1>Hello {{ name }}, Welcome on Users Page</h1>
    <table class="users-table">
        <tr>
            <th>ID number</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
        </tr>
        <tr v-for="item in users" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>
                <button v-on:click="blockUser">Block</button>
                <img v-on:click="deleteUser(item.id)" src="../assets/delete.png" class="icon" alt="" title="Delete">
            </td>
        </tr>
    </table>
</template>

<script>
import axios from 'axios';
import AdminHeader from './AdminHeader.vue';
export default {
    name: 'AdminUsers',

    data() {
        return {
            name: '',
            users: []
        };
    },

    components: { AdminHeader },

    methods: {
        async deleteUser(id) {
            let result = await axios.delete("http://localhost:3000/users/" + id);
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
                let result = await axios.get("http://localhost:3000/users");
                this.users = result.data;
            }
        }
    },

    async mounted() {
        this.loadData();
    }

}

</script>