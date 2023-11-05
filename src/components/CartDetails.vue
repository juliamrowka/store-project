<template>
    <HeaderLogin :name="name" />
    <div class="container-sm">
        <div v-if="empty" class="mx-auto my-4" style="max-width: 50%;">
            <div class="d-flex flex-column">
                <h1 class="text-body-priamry fs-3 mx-auto">Your cart is empty</h1>
                <router-link to="/" class="mx-auto link-opacity-50-hover">Go to the home page</router-link>
            </div>
        </div>

        <div v-if="!empty" class="container mx-auto my-4">

            <!-- <div class="d-flex flex-row justify-content-between align-items-center border-bottom py-1 mb-3">
                <div class="d-flex flex-row justify-content-between align-items-center">
                    <div class="text-body-priamry fs-2">Cart Details</div>
                    <button type="button" class="btn btn-outline-danger btn-lg m-2 p-1 pb-0 border-0" title="Empty the cart"
                        v-on:click="emptyCart()"><i class="fi fi-rr-trash"></i></button>
                </div>
                <div class="text-end text-body-secondary fs-3">Total price: <span class="fw-semibold">{{ totalPrice }}
                        $</span>
                </div>
            </div> -->

            <div class="row border-bottom py-1 m-0 mb-3">
                <div class="col-sm d-flex align-items-center justify-content-center justify-content-lg-start">
                    <div class="text-body-priamry fs-2">Shopping Cart</div>
                    <button type="button" class="btn btn-outline-danger m-1 p-1 pb-0 border-0" title="Empty the cart"
                        v-on:click="emptyCart()"><i class="fi fi-rr-trash"></i></button>
                </div>
                <div class="col-sm d-flex align-items-end justify-content-center justify-content-lg-end text-body-secondary fs-3"><div>Total price:&nbsp;</div><div class="fw-semibold">{{ totalPrice }}&nbsp;$</div>
                </div>
            </div>

            <div v-for="item in cartContent" :key="item.id" class="container-sm list-group p-0">
                <div class="list-group-item list-group-item-action mb-3">
                    <div class="row py-2">
                        <div class="col-sm-2">
                            <img :src=item.url alt="" class="img-fluid rounded">
                        </div>
                        <div class="col-sm-8 mb-3">
                            <h2 class="m-1">{{ item.title }}</h2>
                            <p class="fs-5 m-1">{{ item.author }}</p>
                            <h5 class="m-1 text-body-secondary">{{ item.price }} $</h5>
                        </div>
                        <div class="col-sm-2 text-center mt-1">
                            <div class="btn-group" role="group">
                                <button type="button" class="btn btn-outline-primary"
                                    v-on:click="removeFromCart(item.id)">-</button>
                                <button type="button" class="btn btn-outline-primary">{{ item.cartQuantity }}</button>
                                <button type="button" class="btn btn-outline-primary"
                                    v-on:click="addToCart(item.id)">+</button>
                            </div>
                            <h3 class="m-2 text-body-primary">{{ item.partialPrice }} $</h3>
                        </div>
                    </div>
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
            empty: true,
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
            if (!cart) {
                this.empty = true;
            } else if (cart.length <= 0) {
                this.empty = true;
            } else {
                this.empty = false;
                let counts = {};
                cart.forEach(function (x) { counts[x] = (counts[x] || 0) + 1 });
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
                    resultCart.data[0].partialPrice = Number.parseFloat(partialPrice.toFixed(2));
                }
                let price = this.totalPrice;
                this.totalPrice = Number.parseFloat(price.toFixed(2));
            }
        } else {
            alert('To show your cart please log in first')
            this.$router.push({ name: 'Login' });
        }
    }
}
</script>