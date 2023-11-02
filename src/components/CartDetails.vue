<template>
    <HeaderLogin :name="name" />
    <div v-if="empty" class="mx-auto" style="max-width: 50%;">

        <div class="d-flex flex-column m-3">
            <h1 class="text-body-priamry fs-3">Your cart is empty</h1>
            <router-link to="/">Go to the home page</router-link>
        </div>

    </div>

    <div v-if="!empty" class="mx-auto" style="max-width: 50%;">
        <div class="d-flex flex-row justify-content-between align-items-center py-2">
            <div class="d-flex flex-column">
                <h1 class="text-body-priamry fs-3">Cart Details</h1>
                <button type="button" class="btn btn-outline-danger" v-on:click="emptyCart()">Empty the cart</button>
            </div>
            <div class="text-end text-body-secondary fs-2">Total price: <span class="fw-semibold">{{ totalPrice }} $</span>
            </div>
        </div>
        <div v-for="item in cartContent" :key="item.id" class="list-group">
            <div class="list-group-item list-group-item-action d-flex flex-row mb-3">
                <div class="d-flex flex-column" style="width: 10%;">
                    <img :src=item.url alt="" class="img-fluid p-8 rounded">
                </div>
                <div class="d-flex flex-column px-3" style="width: 70%;">
                    <h4 class="mb-1">{{ item.title }}</h4>
                    <p class="mb-1">{{ item.author }}</p>
                    <h5 class="mb-1 text-body-secondary">{{ item.price }} $</h5>
                </div>
                <div class="d-flex flex-column" style="width: 20%;">
                    <div class="mx-auto" style="width: fit-content;">
                        <div class="btn-group p-3" role="group" aria-label="Basic outlined example" style="width: 15%;">
                            <button type="button" class="btn btn-outline-primary"
                                v-on:click="removeFromCart(item.id)">-</button>
                            <button type="button" class="btn btn-outline-primary">{{ item.cartQuantity }}</button>
                            <button type="button" class="btn btn-outline-primary" v-on:click="addToCart(item.id)">+</button>
                        </div>
                    </div>
                    <h4 class="mb-1 text-body-primary mx-auto">{{ item.partialPrice }} $</h4>
                </div>
            </div>
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
            empty: false,
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
        // async loadData() {

        // },

        async removeFromCart(id) {
            let user = localStorage.getItem('user-info');
            if (user) {
                this.userId = JSON.parse(user).id;
                let result = await axios.get(`http://localhost:3000/users?id=${this.userId}`);
                console.log(result);
                if (result.data[0].books.length > 0) {
                    this.cart.booksId = result.data[0].books;
                    let index = this.cart.booksId.indexOf(id);
                    console.log(index);
                    this.cart.booksId.splice(index, 1);
                    console.log(this.cart.booksId);
                    await axios.patch("http://localhost:3000/users/" + this.userId, {
                        books: this.cart.booksId
                    });
                    this.$router.go();
                } else {
                    alert("Your cart is empty");
                    // or sth like this
                }

            }
        },

        async addToCart(id) {

            let user = localStorage.getItem('user-info');
            if (user) {
                this.userId = JSON.parse(user).id;
                let result = await axios.get(`http://localhost:3000/users?id=${this.userId}`);
                if (result.data[0].books) {
                    this.cart.booksId = result.data[0].books;
                } else {
                    this.cart.booksId = [];
                }
                this.cart.booksId.push(id);
                await axios.patch("http://localhost:3000/users/" + this.userId, {
                    books: this.cart.booksId
                });
                this.$router.go();
            }
        },

        async emptyCart() {
            let user = localStorage.getItem('user-info');
            if (user) {
                this.userId = JSON.parse(user).id;
                this.cart.booksId = [];
                let result = await axios.patch("http://localhost:3000/users/" + this.userId, {
                    books: this.cart.booksId
                });
                console.log(result);
                this.$router.go();
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
                    // console.log(resultCart);
                    resultCart.data[0].cartQuantity = counts[resultCart.data[0].id];
                    if (resultCart.data[0].cartQuantity > 0) {
                        this.cartContent[i] = resultCart.data[0];
                    }
                    this.totalPrice += this.cartContent[i].cartQuantity * this.cartContent[i].price;
                    resultCart.data[0].partialPrice = this.cartContent[i].cartQuantity * this.cartContent[i].price;
                    let partialPrice = resultCart.data[0].partialPrice;
                    resultCart.data[0].partialPrice = Number.parseFloat(partialPrice.toFixed(2))
                }
                let price = this.totalPrice;
                this.totalPrice = Number.parseFloat(price.toFixed(2));
            } else {
                this.empty = true;
                // this.$router.push({ name: 'CartDetails' });
            }
        }
    }
}
</script>