<template>
    <div v-if="name === ''">
        <Header />
    </div>
    <div v-if="name !== ''">
        <HeaderLogin :name="name" />
    </div>
    <div class="container-sm mb-5">
        <div class="row row-cols-1 row-cols-md-auto g-4 justify-content-center">
            <div class="col" v-for="item in books" :key="item.id">
                <div class="card text-bg-light m-3 h-100" style="min-width: 14rem; max-width: 14rem;">
                    <div class="m-2"><img :src="item.url" class="card-img-top" style="max-height: 18rem;" alt="..."></div>
                    <div class="card-body border-top mx-2">
                        <h5 class="card-title">{{ item.title }}</h5>
                        <div class="card-subtitle mb-2 text-body-secondary">{{ item.author }}</div>
                        <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> -->
                        <div class="card-text"><small class="text-body-secondary">Quantity: {{ item.quantity }}</small></div>
                    </div>
                    <div class="card-footer d-md-flex justify-content-end align-items-center">
                        <div class="flex-fill fs-4">{{ item.price }} $</div>
                        <button class="btn btn-primary rounded" v-if="logged" v-on:click="addToCart(item.id)"
                            :disabled="item.quantity <= 0">Add to Cart</button>
    
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from './Header.vue';
import HeaderLogin from './HeaderLogin.vue';
import axios from 'axios';
export default {
    name: 'Home-page',
    data() {
        return {
            name: '',
            userId: '',
            logged: '',
            books: [],
            cart: {
                booksId: []
            }
        }
    },
    components: {
        Header,
        HeaderLogin
    },

    methods: {

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
    },

    async mounted() {
        let user = localStorage.getItem('user-info');
        if (user) {
            this.name = JSON.parse(user).name;
            this.logged = true;
        }
        let result = await axios.get("http://localhost:3000/books?published=true");
        this.books = result.data;
    }
}
</script>