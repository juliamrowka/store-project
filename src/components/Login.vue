<template>
    <div class="mx-auto container-sm my-3" style="max-width: 40%;">
        <div class="d-flex flex-row justify-content-between align-items-end border-bottom mb-4">
            <legend class="text-primary fs-1">Login</legend>
            <div class="text-end mb-2" style="width: 30% ;"><router-link to="/"
                    class="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Go to
                    the home page</router-link></div>
        </div>
        <!-- Email -->
        <div class="mb-2 mt-3" :class="{ error: v$.email.$errors.length }">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" placeholder="name@example.com"
                v-model="v$.email.$model">
        </div>
        <!-- Email error message -->
        <div v-for="(error, index) of v$.email.$errors" :key="index">
            <div class="text-danger text-center">{{ error.$message }}</div>
        </div>
        <!-- Password -->
        <div class="mb-2 mt-3" :class="{ error: v$.password.$errors.length }">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" v-model="v$.password.$model"
                v-on:keyup.enter="login">
        </div>
        <!-- Password error message -->
        <div v-for="(error, index) of v$.password.$errors" :key="index">
            <div class="text-danger text-center">{{ error.$message }}</div>
        </div>
        <div class="text-danger" v-if="!this.correctPassword">Incorrect password or email</div>
        <div class="text-danger" v-if="this.blocked">You are blocked, please contact support</div>
        <!-- Submit Button -->
        <div class="d-flex flex-row justify-content-between align-items-center border-top mt-3">
            <button type="submit" class="btn btn-primary" :disabled="v$.$invalid" v-on:click="login">Submit</button>
            <div class="py-2 d-flex flex-column text-end">
                <div class="mb-1"><router-link to="/forgot"
                        class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Forgot
                        password?</router-link></div>
                <div>
                    Don't have an account yet? <router-link to="/sign-up"
                        class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Create
                        one here</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
export default {
    name: 'Login-page',

    setup() {
        return { v$: useVuelidate() }
    },

    data() {
        return {
            email: '',
            password: '',
            correctPassword: true,
            blocked: false
        }
    },

    validations() {
        return {
            email: {
                required, email
            },
            password: {
                required
            }
        }
    },

    methods: {
        async login() {
            let result = await axios.get(
                `http://localhost:3000/users?email=${this.email}&password=${this.password}`
            );
            // console.warn(result);

            if (result.status == 200 && result.data.length > 0) {
                this.correctPassword = true;
                if (result.data[0].blocked === false) {
                    localStorage.setItem("user-info", JSON.stringify(result.data[0])); //result data in array
                    //redirect to home page after sign up
                    this.$router.push({ name: 'Home' }); //same name as in file routers.js
                } else {
                    this.blocked = true;
                }
            } else {
                this.correctPassword = false;
                //alert("Incorect password or email");
            }
        }
    },

    mounted() {
        let user = localStorage.getItem('user-info');
        // SignUp page only available only when user is not log in
        if (user) {
            this.$router.push({ name: 'Home' });
            // localStorage.clear();
        }
    }
}
</script>