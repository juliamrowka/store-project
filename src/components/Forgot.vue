<template>
    <div class="container-sm my-3">
        <div class="col-sm-6 mx-auto">
            <div class="d-flex flex-row justify-content-between align-items-center border-bottom mb-4">
                <legend class="text-primary fs-1">Forgot password</legend>
                <div class="text-end mb-2" style="width: 30% ;"><router-link to="/" class="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Home page</router-link></div>
            </div>
            <!-- Email -->
            <div class="mb-2 mt-3" :class="{ error: v$.email.$errors.length }">
                <label for="exampleInputEmail1" class="form-label">Enter your email address</label>
                <input type="email" class="form-control" id="exampleInputEmail1" placeholder="name@example.com"
                    v-model="v$.email.$model">
                <!-- error message -->
                <div v-for="(error, index) of v$.email.$errors" :key="index">
                    <div class="text-danger">{{ error.$message }}</div>
                </div>
            </div>
            <!-- Submit Button -->
            <div class="d-grid border-top mt-3">
                <button type="submit" class="btn btn-primary mt-3" :disabled="v$.$invalid" v-on:click="forgot">Submit</button>
            </div>
        </div>
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