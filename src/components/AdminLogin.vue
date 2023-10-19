<template>
    <h1>Admin Login Page</h1>
    <div class="admin">
        <!-- Email -->
        <div class="form-group" :class="{ error: v$.email.$errors.length }">
            <input placeholder="Enter your email" type="text" v-model="v$.email.$model">
            <div v-for="(error, index) of v$.email.$errors" :key="index">
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
import { required, email } from '@vuelidate/validators'
export default {
    name: 'Admin-page',

    setup() {
        return { v$: useVuelidate() }
    },

    data() {
        return {
            email: '',
            password: '',
            correctPassword: 'true',
        }
    },

    validations() {
        return {
            email: { required, email },
            password: { required }
        }
    },

    methods: {
        async login() {
            const result = await axios.get(`http://localhost:3000/users?email=${this.email}&password=${this.password}`);
            console.log(result);
            // console.log(typeof(result.data));
            // console.log((result.data[0].isAdmin));
            if (result.status === 200 && result.data.length > 0) {
                console.log(result.status === 200 && result.data.length > 0);
                if (result.data[0].role === "admin") {
                    console.log(result.data[0].role === "admin");
                    this.correct = true;
                    localStorage.setItem("user-info", JSON.stringify(result.data[0]));
                    localStorage.setItem("role", result.data[0].role);
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
        let admin = localStorage.getItem('role');
        if (admin === 'admin') {
            this.$router.push({ name: 'Admin' });
        }
    }
}

</script>