<template>
    <HeaderLogin :name="name" />
    <h1>Cart Details</h1>
    <div v-if="emptyCart">
        <h2>Your cart is empty.</h2>
        <router-link to="/">Go to the home page</router-link>
    </div>
    <div class="offer">
        <div v-for="item in cartContent" :key="item.id" class="book">
            <h2>{{ item.title }}</h2>
            <div>{{ item.author }}</div>
            <div>Quantity: {{ item.cartQuantity }}</div>
            <div>{{ item.price }} $</div>
            <!-- <button v-if="logged" v-on:click="addToCart(item.id)" :disabled="item.quantity <= 0">Add to Cart</button>
            <button v-if="logged" v-on:click="removeFromCart(item.id)" :disabled="item.quantity <= 0">Remove from Cart</button> -->
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import HeaderLogin from './HeaderLogin.vue';
export default {
    name: 'CartDetails',
    data() {
        return {
            name: '',
            userId: '',
            emptyCart: false,
            cartContent: []
        }
    },

    components: {
        HeaderLogin
    },

    methods: {
        async loadData() {
            // get user name
            let user = localStorage.getItem('user-info');
            if (user) {
                this.name = JSON.parse(user).name;
                this.userId = JSON.parse(user).id;
                let result = await axios.get(`http://localhost:3000/users?id=${this.userId}`);
                let cart = result.data[0].books;
                // console.log(cart);
                if (cart) {
                    const counts = {};
                    cart.forEach(function (x) { counts[x] = (counts[x] || 0) + 1 });
                    // console.log(counts[3]);
                    // console.log(counts);
                    // console.log(typeof(counts));
                    cart = [...new Set(cart)];
                    // console.log(cart);
                    // console.log(typeof(cart));
                    // console.log(cart.length);
                    for (let i = 0; i < cart.length; i++) {
                        // console.log(cart[i]);
                        let resultCart = await axios.get(`http://localhost:3000/books?id=${cart[i]}`);
                        // console.log(resultCart);
                        // console.log(typeof(resultCart));
                        resultCart.data[0].cartQuantity = counts[resultCart.data[0].id];
                        this.cartContent[i] = resultCart.data[0];
                        // console.log(this.cartContent[i]);
                    }
                } else {
                    this.emptyCart = true;
                }
                // console.log(result);
                // console.log(this.cartContent);
            }
        }
    },

    mounted() {
        this.loadData();
    }
}
</script>