<template>
    <div class="container-sm my-3">
        <div class="col-sm-6 mx-auto">
            <div class="d-flex flex-row justify-content-between align-items-center border-bottom mb-4">
                <legend class="text-primary fs-1">Sign Up</legend>
                <div class="text-end mb-2" style="width: 30% ;"><router-link to="/" class="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Home page</router-link></div>
            </div>
            <!-- Name -->
            <div class="mb-2 mt-3">
                <label for="exampleInputName1" class="form-label">Name</label>
                <input type="email" class="form-control" id="exampleInputName1" placeholder="" v-model="v$.name.$model">
            </div>
            <!-- Name error message -->
            <div v-for="(error, index) of v$.name.$errors" :key="index">
                    <div class="text-danger text-center">{{ error.$message }}</div>
                </div>
            <!-- Email -->
            <div class="mb-2 mt-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" placeholder="name@example.com"
                    v-model="v$.email.$model">
            </div>
            <!-- Email error message -->
            <div class="" v-for="(error, index) of v$.email.$errors" :key="index">
                    <div class="text-danger text-center">{{ error.$message }}</div>
                </div>
            <!-- Password -->
            <div class="mb-2 mt-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" v-model="v$.password.$model"
                    v-on:keyup.enter="login">
            </div>
            <!-- Password error message -->
            <div v-for="(error, index) of v$.password.$errors" :key="index">
                    <div class="text-danger text-center">{{ error.$message }}</div>
                </div>
            <!-- Confirm Password -->
            <div class="mb-2 mt-3">
                <label for="exampleInputPassword2" class="form-label">Confirm password</label>
                <input type="password" class="form-control" id="exampleInputPassword2" v-model="v$.confirmPassword.$model"
                    v-on:keyup.enter="signUp" v-on:input="checkPassword()">
            </div>
            <!-- Confirm Password error message -->
            <div v-for="(error, index) of v$.confirmPassword.$errors" :key="index">
                    <div class="text-danger text-center">{{ error.$message }}</div>
                </div>
            <div class="text-danger text-center" v-if="errorPassword">Password do not match</div>
            <!-- Submit Button -->
            <div class="d-flex flex-row justify-content-between align-items-center border-top mt-3">
                <div class="d-flex w-25">
                    <button type="submit" class="btn btn-primary flex-fill" :disabled="v$.$invalid" v-on:click="login">Submit</button>
                </div>
                <div class="py-2 d-flex flex-column text-end">
                    <div>Already have an account?</div>
                    <router-link to="/login" class="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Login here!</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'

export function validName(name) {
    let validNamePattern = new RegExp("^[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$");
    if (validNamePattern.test(name)) {
        return true;
    }
    return false;
}

export default {
    name: 'SignUp',

    setup() {
        return { v$: useVuelidate() }
    },

    data() {
        return {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            errorPassword: false,
            role: '',
            blocked: ''
        }
    },

    validations() {
        return {
            name: {
                required, name_validation: {
                    $validator: validName,
                    $message: 'Invalid Name. Valid name only contain letters, dashes (-) and spaces.'
                }
            },
            email: { required, email },
            password: { required, min: minLength(6) },
            confirmPassword: { required }

        }
    },

    methods: {
        async signUp() {
            if (this.password === this.confirmPassword) {
                let result = await axios.post("http://localhost:3000/users", {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    role: "customer",
                    blocked: false
                });

                console.log(result);
                if (result.status === 201) {
                    localStorage.setItem("user-info", JSON.stringify(result.data));
                    //redirect to home page after sign up
                    this.$router.push({ name: 'Home' }); //same name as in file routers.js
                }
            }

        },

        checkPassword() {
            if (this.password !== this.confirmPassword) {
                this.errorPassword = true;
            } else{
                this.errorPassword = false;
            }
        }
    },

    mounted() {
        let user = localStorage.getItem('user-info')
        // SignUp page only available only when user is not log in
        if (user) {
            this.$router.push({ name: 'Home' })
        }
    }
}
</script>
