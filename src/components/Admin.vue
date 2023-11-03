<template>
    <AdminHeader/>
    <h1>Admin Page</h1>
</template>

<script>
import AdminHeader from './AdminHeader.vue'
export default {
    name: 'Admin-page',

    components: {
        AdminHeader
    },

    methods: {

    },

    mounted() {
        let admin = localStorage.getItem('role');
        // let user = localStorage.getItem('user-info');
        // this.name = JSON.parse(user).name;
        // console.log(typeof (admin));
        // console.log(admin);
        // console.log(user.search('{"name":"admin","password":"admin"}'));
        if (!admin || admin !== 'admin') {
            this.$router.push({ name: 'AdminLogin' });
        }
    }
}
</script>