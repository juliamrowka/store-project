<template>
    <img class="logo" src="../assets/book-logo.png">
    <h1>Sign Up</h1>
    <div class="register">
        <!-- Name -->
        <div class="form-group">
            <input placeholder="Enter your name" type="text" v-model="v$.name.$model">
            <!-- error message -->
            <div v-for="(error, index) of v$.name.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
            </div>
        </div>
        <!-- Email -->
        <div class="form-group">
            <input type="email" placeholder="Enter yor email" v-model="v$.email.$model" />
            <div v-for="(error, index) of v$.email.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
            </div>
        </div>
        <!-- Password and confirm -->
        <div class="form-group">
            <input type="password" v-model="v$.password.$model" placeholder="Password" />
            <div v-for="(error, index) of v$.password.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
            </div>
        </div>

        <div class="form-group">
            <input @input="checkPassword()" type="password" v-model="v$.confirmPassword.$model"
                placeholder="Confirm Password" />
            <div v-for="(error, index) of v$.confirmPassword.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
            </div>
            <div class="error-msg" v-if="errorPassword">{{ errorPassword }}</div>
        </div>
        <!-- Submit button -->
        <button :disabled="v$.$invalid" v-on:click="signUp">Sign Up</button>
        <p>Already have an account? <router-link to="/login">Login here!</router-link></p>
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
            errorPassword: '',
            isAdmin: ''
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
                    isAdmin: false

                });

                console.warn(result)
                if (result.status === 201) {
                    localStorage.setItem("user-info", JSON.stringify(result.data))
                    //redirect to home page after sign up
                    this.$router.push({ name: 'Home' }) //same name as in file routers.js
                }
            }

        },

        checkPassword() {
            if (this.password !== this.confirmPassword) {
                this.errorPassword = 'Passwords do not match';
                return false;
            }
            this.errorPassword = '';
            return true;
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
