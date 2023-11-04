<template>
    <div class="mx-auto container-sm my-3" style="max-width: 40%;">
        <div class="d-flex flex-row justify-content-between align-items-center border-bottom mb-4">
            <legend class="text-primary fs-1">Admin Panel</legend>
            <div class="text-end mb-2" style="width: 30% ;"><router-link to="/"
                    class="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Go to
                    the Bookstore</router-link></div>
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
        <div class="text-danger text-center" v-if="!this.correctPassword">Incorrect password or email</div>
        <!-- Submit Button -->
        <div class="d-grid border-top mt-3">
            <button type="submit" class="btn btn-primary mt-3" :disabled="v$.$invalid" v-on:click="login">Submit</button>
        </div>
    </div>
</template>
    
<script>
import axios from 'axios';
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
export default {
    name: 'Admin-page',

    setup() {
        return { v$: useVuelidate() };
    },

    data() {
        return {
            email: '',
            password: '',
            correctPassword: true,
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
                    this.correctPassword = true;
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