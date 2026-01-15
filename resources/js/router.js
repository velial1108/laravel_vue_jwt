// resources/js/router.js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/fruits',
        name: 'fruit.index',
        component: () => import('./components/Fruit/Index.vue') // ← Заглавная I!
    },
    {
        path: '/user/login',
        name: 'user.login',
        component: () => import('./components/User/Login.vue') // ← Заглавная I!
    },
    {
        path: '/user/registration',
        name: 'user.registration',
        component: () => import('./components/User/Registration.vue') // ← Заглавная I!
    },
    {
        path: '/user/personal',
        name: 'user.personal',
        component: () => import('./components/User/Personal.vue') // ← Заглавная I!
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
