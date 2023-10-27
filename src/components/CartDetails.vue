<template>
    <HeaderLogin :name="name" />
    <h1>Cart Details</h1>
    <div v-if="emptyCart">
        <h2>Your cart is empty.</h2>
        <router-link to="/">Go to the home page</router-link>
    </div>
    <div v-if="!emptyCart" class="offer">
        <div v-for="item in cartContent" :key="item.id" class="book">
            <h2>{{ item.title }}</h2>
            <div>{{ item.author }}</div>
            <div>Quantity: {{ item.cartQuantity }}<button v-on:click="removeFromCart">-</button></div>
            <div>{{ item.price }} $</div>
            <!-- <button v-if="logged" v-on:click="addToCart(item.id)" :disabled="item.quantity <= 0">Add to Cart</button>
            <button v-if="logged" v-on:click="removeFromCart(item.id)" :disabled="item.quantity <= 0">Remove from Cart</button> -->
        </div>
    </div>
    <div>
        <h3>Total price: {{ totalPrice }}</h3>
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
            cartContent: [],
            totalPrice: 0,
            cart: {
                booksId: []
            }
        }
    },

    components: {
        HeaderLogin
    },

    methods: {
        async loadData() {

        },

        async removeFromCart(id) {
            let user = localStorage.getItem('user-info');
            if (user) {
                this.userId = JSON.parse(user).id;
                let result = await axios.get(`http://localhost:3000/users?id=${this.userId}`);
                // console.log(result);
                if (result.data[0].books.length > 0) {
                    this.cart.booksId = result.data[0].books;
                    let index = this.cart.booksId.indexOf(id);
                    // console.log(index);
                    this.cart.booksId.splice(index, 1);
                    // console.log(this.cart.booksId);
                    await axios.patch("http://localhost:3000/users/" + this.userId, {
                        books: this.cart.booksId
                    });
                    this.$router.go()
                } else {

                    alert("Your cart is empty");
                    // or sth like this
                }

            }
        }
    },

    async mounted() {
        // get user name
        let user = localStorage.getItem('user-info');
        if (user) {
            this.name = JSON.parse(user).name;
            this.userId = JSON.parse(user).id;
            let result = await axios.get(`http://localhost:3000/users?id=${this.userId}`);
            let cart = result.data[0].books;
            let counts = {};
            cart.forEach(function (x) { counts[x] = (counts[x] || 0) + 1 });
            // console.log(cart.length);
            if (cart.length > 0) {
                cart = [...new Set(cart)];
                for (let i = 0; i < cart.length; i++) {
                    let resultCart = await axios.get(`http://localhost:3000/books?id=${cart[i]}`);
                    resultCart.data[0].cartQuantity = counts[resultCart.data[0].id];
                    if (resultCart.data[0].cartQuantity > 0) {
                        this.cartContent[i] = resultCart.data[0];
                    }
                    this.totalPrice += this.cartContent[i].cartQuantity * this.cartContent[i].price;
                }
            } else {
                this.emptyCart = true;
                this.$router.push({ name: 'CartDetails' });
            }
        }
    }
}
</script>