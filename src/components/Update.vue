<template>
    <AdminHeader />
    <div class="mx-auto container-sm my-3">
        <div class="col-sm-6 mx-auto">
            <div class="d-flex flex-row justify-content-between align-items-center border-bottom mb-4">
                <legend class="text-primary fs-1">Update the book</legend>
                <div class="text-end mb-2" style="width: 30% ;"><router-link to="/admin/books"
                        class="link-secondary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Go back</router-link></div>
            </div>
    
            <!-- Title -->
            <div class="mb-2 mt-3">
                <label for="InputTitle2" class="form-label">Title</label>
                <input type="text" class="form-control" id="InputTitle2" v-model="v$.book.title.$model" />
            </div>
            <!-- Title error -->
            <div v-for="(error, index) of v$.book.title.$errors" :key="index">
                <div class="text-danger text-center">{{ error.$message }}</div>
            </div>
    
            <!-- Author -->
            <div class="mb-2 mt-3">
                <label for="InputAuthor2" class="form-label">Author</label>
                <input type="text" class="form-control" id="InputAuthor2" v-model="v$.book.author.$model" />
            </div>
            <!-- Author error -->
            <div v-for="(error, index) of v$.book.author.$errors" :key="index">
                <div class="text-danger text-center">{{ error.$message }}</div>
            </div>
    
            <!-- Price -->
            <div class="mb-2 mt-3">
                <label for="InputPrice2" class="form-label">Price</label>
                <input type="number" class="form-control" id="InputPrice2" v-model="v$.book.price.$model" />
            </div>
            <!-- Price error -->
            <div v-for="(error, index) of v$.book.price.$errors" :key="index">
                <div class="text-danger text-center">{{ error.$message }}</div>
            </div>
    
            <!-- Quantity -->
            <div class="mb-2 mt-3">
                <label for="InputQuantity2" class="form-label">Quantity</label>
                <input type="number" class="form-control" id="InputQuantity2" v-model="v$.book.quantity.$model" />
            </div>
            <!-- Quantity error -->
            <div v-for="(error, index) of v$.book.quantity.$errors" :key="index">
                <div class="text-danger text-center">{{ error.$message }}</div>
            </div>
    
            <!-- URL -->
            <div class="mb-2 mt-3">
                <label for="InputURL2" class="form-label">URL of photo</label>
                <input type="url" class="form-control" id="InputURL2" v-model="v$.book.url.$model" />
            </div>
            <!-- URL error -->
            <div v-for="(error, index) of v$.book.url.$errors" :key="index">
                <div class="text-danger text-center">{{ error.$message }}</div>
            </div>        
            
            <!-- Submit Button -->
            <div class="d-grid border-top mt-3">
                <button type="submit" class="btn btn-primary mt-3" :disabled="v$.$invalid" v-on:click="updateBook">Submit</button>
            </div>
        </div>
    </div>
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
                quantity: '',
                url: ''
            }
        }
    },

    validations() {
        return {
            book: {
                title: { required },
                author: { required },
                price: { required, numeric },
                quantity: { required, integer },
                url: { required }
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
                quantity: this.book.quantity,
                url: this.book.url,
            });
            if (result.status === 200) {
                this.$router.push({ name: 'AdminBooks' });
            }
        }
    },

    async mounted() {
        let admin= localStorage.getItem('role');
        if (!admin || admin !== 'admin') {
            this.$router.push({ name: 'AdminLogin' });
        } else {
            const result = await axios.get('http://localhost:3000/books/' + this.$route.params.id);
            //console.warn(this.$route.params.id);
            // console.warn('result', result.data);
            this.book = result.data; //prefill data
        }
    }
}
</script>