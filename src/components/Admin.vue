<template>
<h1>Admin Page</h1>
</template>

<script>
export default {
    name: 'Admin-page',

    methods: {

    },

    mounted() {
        let user = localStorage.getItem('is-admin');
        console.log(typeof(user));
        console.log(user);
        // console.log(user.search('{"name":"admin","password":"admin"}'));
        if (!user) {
            // alert("To get access to the administrator panel, please log in.")
            this.$router.push({ name: 'AdminLogin'} );
        } 
    }
}
</script>