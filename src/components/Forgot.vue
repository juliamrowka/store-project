<template>
    <img class="logo" src="../assets/book-logo.png">
    <h1>Fotgot Password</h1>
    <div class="forgot">
        <!-- Email -->
        <div class="form-group" :class="{ error: v$.email.$errors.length }">
            <input placeholder="Enter your email" type="email" v-model="v$.email.$model">
            <!-- error message -->
            <div v-for="(error, index) of v$.email.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
            </div>
        </div>
        <!-- Submit Button -->
        <button v-on:click="forgot">Submit</button>
    </div>
</template>

<script>
// import axios from 'axios';
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
export default {
    name: 'Forgot-page',

    setup() {
        return { v$: useVuelidate() }
    },

    data() {
        return {
            email: ''
        }
    },

    validations() {
        return {
            email: {
                required, email
            }
        }
    },

    methods : {
        async forgot() {

        }
    }
}
</script>