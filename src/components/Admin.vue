<template>
    <AdminHeader />
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
        console.log(typeof(admin));
        console.log(admin);
        // console.log(user.search('{"name":"admin","password":"admin"}'));
        if (admin !== 'admin') {
            // alert("To get access to the administrator panel, please log in.")
            this.$router.push({ name: 'AdminLogin'} );
        } 
    }
}
</script>