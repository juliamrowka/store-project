<template>
    <Header />
    <h1>Hello {{ name }}, Welcome on Add Book Page</h1>
    <form class="add">
        <div>
            <input type="text" name="title" placeholder="Enter Title" v-model="v$.book.title.$model" />
            <div v-for="(error, index) of v$.book.title.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
            </div>
        </div>
        <div>
            <input type="text" name="author" placeholder="Enter Author" v-model="v$.book.author.$model" />
            <div v-for="(error, index) of v$.book.author.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
            </div>
        </div>
        <div>
            <input type="number" name="price" placeholder="Enter Price" v-model="v$.book.price.$model" />
            <div v-for="(error, index) of v$.book.price.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
            </div>
        </div>
        <div>
            <input type="number" name="quantity" placeholder="Enter Quantity" v-model="v$.book.quantity.$model" />
            <div v-for="(error, index) of v$.book.quantity.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
            </div>
        </div>
        <button :disabled="v$.$invalid" v-on:click="addBook">Add new book</button>
    </form>
</template>

<script>
import Header from './Header.vue';
import axios from 'axios';
import useVuelidate from '@vuelidate/core';
import { required, numeric, integer } from '@vuelidate/validators';
export default {
    name: 'Add-page',
    components: {
        Header
    },

    setup() {
        return { v$: useVuelidate() };
    },

    data() {
        return {
            book: {
                title: '',
                author: '',
                price: '',
                quantity: '',
                published: ''
            },
            name: '',

        }
    },

    validations() {
        return {
            book: {
                title: { required },
                author: { required },
                price: { required, numeric },
                quantity: { required, integer }
            }
        }
    },

    methods: {
        async addBook() {
            // console.warn(this.book);
            const result = await axios.post("http://localhost:3000/books", {
                title: this.book.title,
                author: this.book.author,
                price: this.book.price,
                quantity: this.book.quantity,
                published: false
            });
            if (result.status === 201) {
                this.$router.push({ name: 'AdminBooks' });
            }
            // console.warn("result", result);
        }
    },

    mounted() {
        let user = localStorage.getItem('user-info');
        // Home page only available when user is log in
        if (!user) {
            this.$router.push({ name: 'AdminLogin' });
        } else {
            this.name = JSON.parse(user).name; // fetch name of user 
        }
    }
}
</script>