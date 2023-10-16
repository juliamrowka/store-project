<template>
    <img class="logo" src="../assets/book-logo.png">
    <h1>Login</h1>
    <div @submit.prevent="onSubmit" class="login">
        <!-- Email -->
        <div class="form-group" :class="{ error: v$.email.$errors.length }">
            <input placeholder="Enter your email" type="email" v-model="v$.email.$model">
            <!-- error message -->
            <div v-for="(error, index) of v$.email.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
            </div>
        </div>

        <!-- Password -->
        <div class="form-group" :class="{ error: v$.password.$errors.length }">
            <input placeholder="Enter your password" type="password" v-model="v$.password.$model">
            <!-- error message -->
            <div v-for="(error, index) of v$.password.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
            </div>
            <div v-if="!this.correctness">Incorrect password or email.</div>
        </div>

        <!-- Submit Button -->
        <button :disabled="v$.$invalid" v-on:click="login">Login</button>

        <!-- Sign Up Page -->
        <p>Don't have an account yet?<br><router-link to="/sign-up">Create one here</router-link></p>
    </div>
</template>

<script>
import axios from 'axios'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
export default {
    name: 'Login-page',

    setup() {
        return { v$: useVuelidate() }
    },

    data() {
        return {
            email: '',
            password: '',
            correctness: 'true'
        }
    },

    validations() {
        return {
            email: {
                required, email
            },
            password: {
                required,
                min: minLength(6)
            }
        }
    },

    methods: {
        async login() {
            let result = await axios.get(
                `http://localhost:3000/users?email=${this.email}&password=${this.password}`
            );
            console.warn(result);

            if (result.status == 200 && result.data.length > 0) {
                this.correctness = true;
                localStorage.setItem("user-info", JSON.stringify(result.data[0])); //result data in array
                //redirect to home page after sign up
                this.$router.push({ name: 'Home' }); //same name as in file routers.js
            } else {
                this.correctness = false;
                //alert("Incorect password or email");
            }
        }
    },

    mounted() {
        let user = localStorage.getItem('user-info');
        // SignUp page only available only when user is not log in
        if (user) {
            this.$router.push({ name: 'Home' });
            localStorage.clear();
        }
    }
}
</script>