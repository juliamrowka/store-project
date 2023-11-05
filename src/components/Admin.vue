<template>
    <AdminHeader />
    <div class="container w-75 mt-4 p-3">
        <div class="fs-2 border-bottom">Welcome on the Administration Panel of the Bookstore</div>
        <div class="d-flex flex-wrap my-4 gap-4 justify-content-between">
            <div class="card text-bg-primary mb-3" style="width: 25rem;">
                <div class="card-body">
                    <div class="d-flex flex-row justify-content-between align-items-end">
                        <h2 class="card-title">Published books</h2>
                        <h1 class="card-title text-light text-opacity-50">{{ this.publishedBooks }}</h1>
                    </div>
                    <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, nemo. Lorem ipsum
                        dolor sit amet. Lorem ipsum dolor sit amet.</p>
                    <router-link to="/admin/books" active-class="active" class="btn btn-outline-light">See
                        details</router-link>
                </div>
            </div>
            <div class="card text-bg-success mb-3" style="width: 25rem;">
                <div class="card-body">
                    <div class="d-flex flex-row justify-content-between align-items-end">
                        <h2 class="card-title">Registered users</h2>
                        <h1 class="card-title text-light text-opacity-50">{{ this.registredUsers }}</h1>
                    </div>
                    <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat voluptate
                        cupiditate est illum blanditiis accusantium quam quo iure a fugiat.</p>
                    <router-link to="/admin/users" active-class="active" class="btn btn-outline-light">See
                        details</router-link>
                </div>
            </div>
            <div class="card text-bg-danger mb-3" style="width: 25rem;">
                <div class="card-body">
                    <div class="d-flex flex-row justify-content-between align-items-end">
                        <h2 class="card-title">Blocked users</h2>
                        <h1 class="card-title text-light text-opacity-50">{{ this.blockedUsers }}</h1>
                    </div>
                    <p class="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis cupiditate a
                        aliquam, officia numquam minus.</p>
                    <router-link to="/admin/users" active-class="active" class="btn btn-outline-light">See
                        details</router-link>
                </div>
            </div>
            <div class="card text-bg-secondary mb-3" style="width: 25rem;">
                <div class="card-body">
                    <div class="d-flex flex-row justify-content-between align-items-end">
                        <h2 class="card-title">Bookstore</h2>
                        <h1 class="card-title text-light text-opacity-50"><i class="fi fi-rr-angle-small-right"></i></h1>
                    </div>
                    <p class="card-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis cupiditate a
                        aliquam, officia numquam minus. Lorem, ipsum dolor.</p>
                    <router-link to="/admin/users" active-class="active" class="btn btn-outline-light">Go to the Bookstore</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AdminHeader from './AdminHeader.vue';
import axios from 'axios';
export default {
    name: 'Admin-page',

    components: {
        AdminHeader
    },

    data() {
        return {
            publishedBooks: '',
            registredUsers: '',
            blockedUsers: ''
        }
    },

    methods: {

    },

    async mounted() {
        let admin = localStorage.getItem('role');
        if (!admin || admin !== 'admin') {
            this.$router.push({ name: 'AdminLogin' });
        } else {
            const resultBooks = await axios.get("http://localhost:3000/books?published=true");
            this.publishedBooks = resultBooks.data.length;
            const resultUsers = await axios.get("http://localhost:3000/users?role=customer");
            this.registredUsers = resultUsers.data.length;
            const resultBlocked = await axios.get("http://localhost:3000/users?blocked=true");
            this.blockedUsers = resultBlocked.data.length;
        }
    }
}
</script>