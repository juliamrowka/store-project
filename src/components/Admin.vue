<template>
<h1>Admin Page</h1>
</template>

<script>
export default {
    name: 'Admin-page',

    methods: {

    },

    mounted() {
        let admin = localStorage.getItem('is-admin');
        console.log(typeof(admin));
        console.log(admin);
        // console.log(user.search('{"name":"admin","password":"admin"}'));
        if (admin !== 'true') {
            // alert("To get access to the administrator panel, please log in.")
            this.$router.push({ name: 'AdminLogin'} );
        } 
    }
}
</script>