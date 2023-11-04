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
        if (!admin || admin !== 'admin') {
            this.$router.push({ name: 'AdminLogin' });
        }
    }
}
</script>