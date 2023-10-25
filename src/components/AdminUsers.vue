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
                <button v-if="!item.blocked" v-on:click="blockUser(item.id)">Block</button>
                <button v-if="item.blocked" v-on:click="unblockUser(item.id)">Unblock</button>
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
            users: [],
            cart: {
                userId: '',
                id: ''
            }
        };
    },

    components: { AdminHeader },

    methods: {
        async deleteUser(id) {
            // console.log(id);
            // let result = await axios.delete("http://localhost:3000/users/" + id);
            // console.warn(result);
            // if (result.status === 200) {
            //     let resultUser = await axios.get(`http://localhost:3000/cart?userId=${id}`);
            //     console.log(resultUser);
            //     this.cart.id = resultUser.data.id;
            //     console.log(this.cart.id);
            //     await axios.delete("http://localhost:3000/cart/" + this.cart.id);
            //     this.loadData();
            // }

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
            let user = localStorage.getItem('user-info');
            if (role !== 'admin') {
                this.$router.push({ name: 'AdminLogin' });
            }
            else {
                this.name = JSON.parse(user).name;
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