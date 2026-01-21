// resources/js/router.js
import {createRouter, createWebHistory} from 'vue-router'

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
    //Если человек ввел что то не связанное с роутом то перекидываем его на нужную нам страницу
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('./components/User/Personal.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
// beforeEach нужен чтобы выполнять действие после запуска страницы в нашем случае to показывает на какую мы пришли страницу
// from откуда и next позволяет выполнить код текущий страницы а не остановить его
router.beforeEach((to, from, next) => {
    const accessToken = localStorage.getItem('access_token')
    //получаем токен и локал storage проверяем и отправляем если что логиниться

    if (!accessToken) {
        if (to.name === 'user.login' || to.name === 'user.registration') {
            return next()
        } else {
            return next({
                name: 'user.login'
            })
        }
    }
    //если залогинен и лезет на строницу логин отправляем обратно
    if (to.name === 'user.login' || to.name === 'user.registration' && accessToken) {
        return next({
            name: 'user.personal'
        })
    }
    next() // Обязательно вызовите next(), иначе навигация остановится!
})
export default router
