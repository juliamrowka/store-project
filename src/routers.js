import Home from './components/Home.vue'
import SignUp from './components/SignUp.vue'
import Login from './components/Login.vue'
import Add from './components/Add.vue'
import Update from './components/Update.vue'
import Forgot from './components/Forgot.vue'
import Admin from './components/Admin.vue'
import AdminLogin from './components/AdminLogin.vue'
import AdminBooks from './components/AdminBooks.vue'
import AdminUsers from './components/AdminUsers.vue'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        name: 'Home',
        component: Home,
        path: '/'
    },

    {
        name: 'SignUp',
        component: SignUp,
        path: '/sign-up'
    },

    {
        name: 'Login',
        component: Login,
        path: '/login' 
    },

    {
        name: 'Add',
        component: Add,
        path: '/add'
    },

    {
        name: 'Update',
        component: Update,
        path: '/update/:id'
    },

    {
        name: 'Forgot',
        component: Forgot,
        path: '/forgot'
    },

    {
        name: 'Admin',
        component: Admin,
        path: '/admin'
    },

    {
        name: 'AdminLogin',
        component: AdminLogin,
        path: '/admin/login'
    },

    {
        name: 'AdminBooks',
        component: AdminBooks,
        path: '/admin/books'
    },

    {
        name: 'AdminUsers',
        component: AdminUsers,
        path: '/admin/users'
    }
];

const router = createRouter(
    {
        history: createWebHistory(),
        routes
    }
)

export default router