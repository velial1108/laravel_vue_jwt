/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import './bootstrap';
import { createApp } from 'vue';
import router from "@/router.js";
const app = createApp({});

import Index from './components/Index.vue';
app.component('index', Index);
app.use(router);
app.mount('#app');

