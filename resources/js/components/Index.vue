<template>
    <div>
        <router-link :to="{name:'fruit.index'}"> List </router-link>
        <router-link v-if="!accessToken" :to="{name:'user.login'}"> Login </router-link>
        <router-link v-if="!accessToken" :to="{name:'user.registration'}"> Registration </router-link>
        <router-link v-if="accessToken" :to="{name:'user.personal'}"> Personal </router-link>
        <a v-if="accessToken" href="#" @click.prevent="logout">Logout</a>
        <router-view></router-view>
    </div>
</template>

<script>
import api from "@/api.js";
    export default {
        name: "Index",
        data(){
            return{
                accessToken: null
            }
        },
        //подтягивает токен при загрузке приложения
        mounted() {
            this.getAccessToken()
        },
        //подтягивает токен при изменении и перезагрузке приложения
        updated() {
            this.getAccessToken()
        },
        methods:{
            getAccessToken(){
                this.accessToken = localStorage.getItem('access_token');
            },
            logout(){
                const token = localStorage.getItem('access_token');
                api.post('/api/auth/logout', {},{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                    .then( res => {
                        localStorage.removeItem('access_token');
                        this.$router.push({name: 'user.login'})
                    })
            }
        }

    }
</script>
