<template>
    <AdminHeader />
    <h1>Hello {{ name }}, Welcome on Update Book Page</h1>
    <form class="add">
        <div>
            <label>Title</label>
            <input type="text" name="title" placeholder="Enter Title" v-model="v$.book.title.$model" />
            <div v-for="(error, index) of v$.book.title.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
            </div>
        </div>
        <div>
            <label>Author</label>
            <input type="text" name="author" placeholder="Enter Author" v-model="v$.book.author.$model" />
            <div v-for="(error, index) of v$.book.author.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
            </div>
        </div>
        <div>
            <label>Price</label>
            <input type="number" name="price" placeholder="Enter Price" v-model="v$.book.price.$model" />
            <div v-for="(error, index) of v$.book.price.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
            </div>
        </div>
        <div>
            <label>Quantity</label>
            <input type="number" name="quantity" placeholder="Enter Quantity" v-model="v$.book.quantity.$model" />
            <div v-for="(error, index) of v$.book.quantity.$errors" :key="index">
                <div class="error-msg">{{ error.$message }}</div>
            </div>
        </div>
        <button :disabled="v$.$invalid" v-on:click="updateBook">Update Book</button>
    </form>
</template>

<script>
import AdminHeader from './AdminHeader.vue';
import axios from 'axios';
import useVuelidate from '@vuelidate/core';
import { required, numeric, integer } from '@vuelidate/validators';
export default {
    name: 'Update-page',
    components: {
    AdminHeader
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
                quantity: ''
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
        async updateBook() {
            // console.warn(this.book)
            const result = await axios.patch("http://localhost:3000/books/" + this.$route.params.id, {
                title: this.book.title,
                author: this.book.author,
                price: this.book.price,
                quantity: this.book.quantity
            });
            if (result.status === 200) {
                this.$router.push({ name: 'AdminBooks' });
            }
        }
    },

    async mounted() {
        let user = localStorage.getItem('user-info');
        if (!user) {
            this.$router.push({ name: 'AdminLogin' });
        } else {
            this.name = JSON.parse(user).name; // fetch name of user 
            const result = await axios.get('http://localhost:3000/books/' + this.$route.params.id);
            //console.warn(this.$route.params.id);
            // console.warn('result', result.data);
            this.book = result.data; //prefill data
        }
    }
}
</script>