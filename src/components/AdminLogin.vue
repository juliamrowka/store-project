<template>
    <h1>Admin Login Page</h1>
    <div class="admin">
        <!-- Email -->
        <div class="form-group">
            <input placeholder="Enter your name" type="text" v-model="v$.name.$model">
            <div v-for="(error, index) of v$.name.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
            </div>
        </div>
        <!-- Password -->
        <div class="form-group">
            <input placeholder="Enter your password" type="password" v-model="v$.password.$model">
            <div v-for="(error, index) of v$.password.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
            </div>
            <div class="error-msg" v-if="!this.correctPassword">Incorrect password or name.</div>
        </div>
        <!-- Submit Button -->
        <button v-on:click="login">Login</button>
        <!-- Sign Up Page -->
    </div>
</template>
    
<script>
import axios from 'axios';
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
export default {
    name: 'Admin-page',

    setup() {
        return { v$: useVuelidate() }
    },

    data() {
        return {
            name: '',
            password: '',
            correctPassword: 'true',
        }
    },

    validations() {
        return {
            name: { required },
            password: { required }
        }
    },

    methods: {
        async login() {
            const result = await axios.get(`http://localhost:3000/admin?name=${this.name}&password=${this.password}`);
            console.log(result);
            // console.log(typeof(result.data));
            // console.log((result.data[0].isAdmin));
            if (result.status === 200 && result.data.length > 0) {
                console.log(result.status === 200 && result.data.length > 0);
                if (result.data[0].isAdmin === true) {
                    console.log(result.data[0].isAdmin === true);
                    this.correct = true;
                    localStorage.setItem("user-info", JSON.stringify(result.data[0]));
                    localStorage.setItem("is-admin", result.data[0].isAdmin);
                    this.$router.push({ name: 'Admin' });
                } else {
                    this.correctPassword = false;
                }
            } else {
                this.correctPassword = false;
            }

            // if (result.status === 200 && result.data[0].isAdmin === true) {
            //     this.correct = true;
            //     localStorage.setItem("user-info", JSON.stringify(result.data[0]));
            //     localStorage.setItem("is-admin", result.data[0].isAdmin);
            //     this.$router.push({ name: 'Admin' });
            // } else {
            //     this.correct = false;
            // }
        }
    },

    mounted() {
        let admin = localStorage.getItem('is-admin');
        if (admin === 'true') {
            this.$router.push({ name: 'Admin' });
        }
    }
}

</script>